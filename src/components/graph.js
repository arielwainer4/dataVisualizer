import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

// let sampleDate = new Date()

const MyD3Component = (props) => {
  const [initialData, setInitialData] = useState(['"ariel"']);
  const [allData, setAllData] = useState(['"brooke"']);
  const [dateData, setDateData] = useState(['"wainer"']);
  const [valueData, setValueData] = useState([`""`]);
  const [variables, setVariables] = useState(null);
  const [variable, selectVariable] = useState([""]);
  const d3Container = useRef(null);

  useEffect(fetchData, [])
  useEffect(parseVariables, initialData)
  useEffect(updateData, variable)
  useEffect(drawChart, valueData)

  function fetchData () {
    fetch(props.api)
    .then((response) => {return response.json()})
    .then((data) => {
      setInitialData([JSON.stringify(data)])
      setAllData([JSON.stringify(data)])
      let arr = []
      data.forEach(instance => {
        let year = instance.date.toString().slice(0,4)
        let month = instance.date.toString().slice(4,6)
        let day = instance.date.toString().slice(6,8)
        arr.push({
          date: new Date(year, month, day),
        })
      })
      setDateData(arr)
    })
    .catch((err) => {console.log(err)})
    }

  function updateData() {
    let all = JSON.parse(allData[0])
    if(variable[0] !== "") {
      let complete = [];
      dateData.forEach((date, idx) => {
        date.value = all[idx][variable]
        complete.push(date)
      })
      setValueData([JSON.stringify(complete)])
    }
  }

  function parseVariables() {
    let parser = JSON.parse(initialData[0])
    if(initialData && parser.length > 1) {
      let arr = []
      let entry = parser[0]
      for(let variable in entry) {
        arr.push(variable)
      }
      setVariables(arr)
    }
  }

  function drawChart() {
    let allData = JSON.parse(valueData)
    let svgWidth = 600, svgHeight = 500;
    let margin = {top: 20, right: 20, bottom: 30, left: 100}
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


    if(allData.length > 1) {
      console.log('var', variable)
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
          .attr("fill", "white")
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
    }

  function variableSelector (event) {
    selectVariable([event.target.value])
  }

  return (
    <div>
      Select what value you'd like to map from your data:
      <select onChange={variableSelector}>
        {variables
        ? variables.map((variable, idx) => {
        return <option value={variable} key={idx}>{variable}</option> })
        : "null"}
      </select>

      <div className="svg-div">
        <svg
          className="d3-component"
          width={400}
          height={200}
          ref={d3Container}
        />
      </div>
    </div>
  );
}

export default MyD3Component
