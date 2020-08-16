import * as d3 from 'd3';

export function template (allData, svgWidth, svgHeight, margin) {
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom

  let svg = d3.select('svg')
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleTime()
  .rangeRound([0, width]);

let y = d3.scaleLinear()
  .rangeRound([height, 0])

  x.domain(d3.extent(allData, function(d) {return Date.parse(d.date)}))
  y.domain(d3.extent(allData, function(d) {return d.value}))

  g.append("g")
    .call(d3.axisBottom(x))
    .attr("transform", "translate(0," + height + ")")

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "white")
    .attr("transform",`rotate(-90) translate(-${height/2}, -${margin.left / 1.2})`)
    .attr("y", 0)
    .attr("dy", "0em")
    .attr("text-anchor", "end")
    .text("Variable")
}

export function drawLine (allData, svgWidth, svgHeight, margin, variable) {
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom

  d3.select("svg").remove();
      d3.select(".svg-div").append("svg")

      let svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

      let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let x = d3.scaleTime()
        .rangeRound([0, width]);

      let y = d3.scaleLinear()
        .rangeRound([height, 0])

      let line = d3.line()
        .x(function(d) {return x(Date.parse(d.date))})
        .y(function(d) {return y(d.value)})

        x.domain(d3.extent(allData, function(d) {return Date.parse(d.date)}))
        y.domain(d3.extent(allData, function(d) {return d.value}))

        g.append("g")
        .call(d3.axisBottom(x))
        .attr("transform", "translate(0," + height + ")")

        g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "black")
        .attr("transform",`rotate(-90) translate(-${height/2}, -${margin.left / 1.2})`)
        .attr("y", 0)
        .attr("dy", "0em")
        .attr("text-anchor", "end")
        .text(`${variable[0]}`)

        g.append("path")
        .datum(allData)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line)

}
