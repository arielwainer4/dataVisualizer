import * as d3 from 'd3';

export function drawBar (allData, svgWidth, svgHeight, margin, variable) {
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom

  d3.select("svg").remove();
  d3.select(".svg-div").append("svg")

  let svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    let x = d3.scaleTime().rangeRound([0, width], .09);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(allData, function(d) {return Date.parse(d.date)}))
    y.domain(d3.extent(allData, function(d) {return d.value}))

    // Add the X Axis
    g.append("g")
        .call(d3.axisBottom(x))
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("x", 0)
        .attr("dx", "0em")

    // Add the Y Axis
    g.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "y axis")
        .attr("y", 0)
        .attr("dy", "0em")

    // Draw the bars
    g.selectAll(".bar")
        .data(allData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("y", function (d) {return y(d.value) })
        .attr("x", function (d) {return x(Date.parse(d.date)) })
        .attr("width", function (d) {
          let size = width/allData.length
          return `${size}px`})
        .attr("height", function (d) { return height - y(d.value); });
  }
