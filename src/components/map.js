import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson-client";
import { Typography, Paper, TableContainer } from '@material-ui/core';
var stateHash = require('./state-hash.json');

const Map2 = (props) => {
  const [covidData, setCovidData] = useState(['""'])
  const [mapData, setMapData] = useState(['""'])
  const d3Container = useRef(null);

  useEffect(fetchData, [])
  useEffect(drawMap, mapData)

  function fetchData () {
    let covid = require('./us-covid.json')
    let map = require('./us-topo.json')
    setCovidData([JSON.stringify(covid)])
    setMapData([JSON.stringify(map)])
  }


  let svgWidth = 600
  let svgHeight = 450
  let margin = {top: 20, right: 20, bottom: 30, left: 100}
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom


    d3.select("svg").remove();

    d3.select(".svg-div").append("svg")



    let svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("cursor", "move")

    svg.attr("viewBox", "50 10" + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin")


    let map = svg.append("g")
      .attr("class", "map")
      .attr("transform", "translate( -170 , -170)")
      .attr("stroke", "grey")
      .attr("stroke-width", 1.3)


    function drawMap () {
      let world = JSON.parse(mapData[0])
      let data = JSON.parse(covidData[0])

      if(world && data.length > 2) {

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


  return (
    <div  style={{margin: 40}}>
      <TableContainer component={Paper} elevation={10} >
      <div className="svg-div" >
        <Typography style={{ margin: "2rem 0rem 0rem" }} >This heatmap is a snapshot of the total Covid-19 positive test distribution across the US.</Typography>
        <svg
          className="d3-component"
          width={400}
          height={200}
          ref={d3Container}
        />
      </div>
      </TableContainer>
    </div>
  );
}

export default Map2
