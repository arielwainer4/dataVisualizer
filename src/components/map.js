import * as d3 from 'd3';

const MyD3Map = (props) => {
  var maptype = 'topojson';
  var width = 960,
  height = 600;


  var projection = d3.geoAlbersUsa()
  .scale(1280)
  .translate([width / 2, height / 2]);


  var path = d3.geoPath()
  .projection(projection);


  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);


  queue()
  .defer(d3.json, "us-states.geojson")
  .defer(d3.json, "us-states.topojson")
  .await(ready);


  function ready(error, us_geojson,us_topojson) {

  // GEOJSON
  if (maptype === 'geojson') {
  var us = us_geojson;


  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", path)
      // the three commented lines below are a longer version of the line above
      /*
      .attr("d", function(d) {
        return path(d);
      })
      */
      .classed('make-it-red', function(d) {
        if (d.properties.name === "Mississippi" || d.properties.name === "Oregon") {
          return true;
        }
        else {
          return false;
        }
      })
  }

  // TOPOJSON
  else if (maptype === 'topojson') {
  var us = us_topojson;

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);

  }


  }
}

export default MyD3Map
