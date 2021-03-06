import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson-client";
import { Typography, Paper, Container } from '@material-ui/core';
var stateHash = require('./state-hash.json');

const Map2 = (props) => {
  const [covidData, setCovidData] = useState(['""'])
  const [mapData, setMapData] = useState(['""'])
  const d3Container = useRef(null);

  useEffect(fetchData, [])
  useEffect(drawMap, covidData)

  function fetchData () {
    fetch('https://api.covidtracking.com/v1/states/current.json')
    .then((response) => {return response.json()})
    .then((data) => {
      setCovidData([JSON.stringify(data)])
    })
    let map = require('./us-topo.json')
    setMapData([JSON.stringify(map)])
  }

  function drawMap () {
    let svgWidth = 600
    let svgHeight = 450
    let margin = {top: 20, right: 20, bottom: 30, left: 100}
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom

    let svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("cursor", "move")

    let zoom = d3.zoom()
      .on("zoom", function () {
          let transform = d3.zoomTransform(this);
          map.attr("transform", transform);
      });

    svg.call(zoom)

    let map = svg.append("g")
      .attr("class", "map")
      .attr("transform", "translate( -170 , -170)")
      .attr("stroke", "grey")
      .attr("stroke-width", 1.1)

      let world = JSON.parse(mapData[0])
      let data = JSON.parse(covidData[0])

      if(data.length > 2) {

        // projection
        let projection = d3.geoAlbersUsa()
          .scale(800)
          .translate([width, height])

        let path = d3.geoPath().projection(projection)


        let features = topojson.feature(world, world.objects.states).features
        let casesByStateName = {}

        data.forEach(function (d) {
          casesByStateName[stateHash[d.state]] = {
            positive: d.positive,
          }
        })

        features.forEach(function (d) {
          d.details = casesByStateName[d.properties.name]
        })

        const casesArray = Object.entries(casesByStateName)

        let caseRange = casesArray.reduce((accum, state) => {
            accum.push(state[1].positive)
            return accum
        }, []).sort((a,b) => a-b)

        let color = d3.scaleThreshold()
          .domain(caseRange)
          .range(['#7bd095', '#80d196', '#85d296', '#8ad397', '#90d598', '#95d699', '#9ad79a', '#9fd89b', '#a4d99b', '#aadb9c', '#afdc9d', '#b4dd9e', '#b9de9f', '#bedfa0', '#c4e1a0', '#c9e2a1', '#cee3a2', '#d3e4a3', '#d8e5a4', '#dde6a4', '#e3e8a5', '#e8e9a6', '#edeaa7', '#f2eba8', '#f7eca9', '#faeba8', '#fae8a7', '#fbe4a5', '#fbe1a4', '#fbdda2', '#fbdaa1', '#fbd69f', '#fcd39e', '#fccf9c', '#fccc9b', '#fcc899', '#fcc598', '#fdc196', '#fdbe95', '#fdba93', '#fdb792', '#fdb390', '#feb08f', '#feac8d', '#fea98c', '#fea58a', '#fea289', '#ff9e87', '#ff9b86', '#ff9784'])

        map.append("g")
          .selectAll("path")
          .data(features)
          .enter().append("path")
          .attr("name", function (d) {
            return d.properties.name
          })
          .attr("id", function (d) {
            return d.id
          })
          .attr("d", path)
          .style("fill", function (d) {
            return d.details ? color(d.details.positive) : undefined;
          })
          .on('mouseover', function (d) {
            d3.select(this)
              .style("stroke", "white")
              .style("stroke-width", 3)
              .style("cursor", "pointer")

            d3.select(".state")
              .text(d.properties.name)
              .style("stroke", "black")

            d3.select(".cases")
              .text(d.details.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            d3.select('.details')
              .style('visibility', 'visible')
          })
          .on('mouseout', function (d) {
            d3.select(this)
              .style('stroke', null)
              .style('stroke-width', 0.25)

            d3.select('.details')
            .style('visibility', 'hidden')
          })
      }
    }

  let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 1)

  return (
    <div  style={{margin: 40}}>
      <Container component={Paper} elevation={10} style={{padding: "20px 20px"}}>
      <div className="svg-div" >
        <Typography style={{ margin: "2rem 2rem 0rem" }} >This heatmap is a snapshot of the current total Covid-19 positive test distribution across the US as of {dateObj.toDateString().slice(3)}. Hover over a state to see it's total case count.</Typography>
        <svg
          className="d3-component"
          ref={d3Container}
        />
      </div>
        <div className="details" style={{margin: "0px 50px"}}>
          <h2 className="state"> </h2>
          <p className="cases" style={{margin: "0px 50px"}}></p>
        </div>
      </Container>
    </div>
  );
}

export default Map2
