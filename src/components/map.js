import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson-client";
// var covidJSON = require('./us-covid.json');
// var topoJSON = require('./us-topo.json');
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
  let svgHeight = 300
  let margin = {top: 20, right: 20, bottom: 30, left: 100}
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom


    d3.select("svg").remove();

    d3.select(".svg-div").append("svg")

    let svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);


    let map = svg.append("g")
      .attr("class", "map")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("stroke", "white")
      .attr("stroke-width", 1)


    function drawMap () {
      let world = JSON.parse(mapData[0])
      let data = JSON.parse(covidData[0])

      if(world && data.length > 2) {

        // projection
        let projection = d3.geoMercator()
          .scale(300)
          .translate([width, height])

        let path = d3.geoPath().projection(projection)

        let color = d3.scaleThreshold()
          .domain([0, 50])
          .range(['red', 'white'])

        let features = topojson.feature(world, world.objects.states).features
        let casesByStateName = {}

        data.forEach(function (d) {
          casesByStateName[stateHash[d.state]] = {
            positive: d.positive,
          }
        })
        console.log("pos", casesByStateName)
        features.forEach(function (d) {
          d.details = casesByStateName[d.properties.name]
        })

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
            return d.details ? color(d.details.total) : undefined;
          })
      }
    }


  return (
    <div className="svg-div" style={{margin: 40}}>
      <svg
        className="d3-component"
        width={400}
        height={200}
        ref={d3Container}
      />
    </div>
  );
}

export default Map2
