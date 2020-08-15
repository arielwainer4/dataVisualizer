import React, { useRef, useState, useEffect } from 'react';
import { template, reDraw } from '../helper-functions'
import {VariableSelect, RegionSelect} from './index'

// let sampleDate = new Date()

const MyD3Component = (props) => {
  const [allData, setAllData] = useState(['""']);
  const [dateData, setDateData] = useState(['""']);
  const [valueData, setValueData] = useState([`""`]);
  const [variable, selectVariable] = useState([""]);
  const d3Container = useRef(null);

  useEffect(fetchData, [])
  useEffect(updateData, variable)
  useEffect(drawChart, valueData)

  function fetchData () {
    fetch(props.api)
    .then((response) => {return response.json()})
    .then((data) => {
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

  function drawChart() {
    let allData = JSON.parse(valueData)
    let svgWidth = 600
    let svgHeight = 500
    let margin = {top: 20, right: 20, bottom: 30, left: 100}

    if(allData.length < 1) {
      template(allData, svgWidth, svgHeight, margin)
    }
    else if(allData.length > 1) {
      reDraw(allData, svgWidth, svgHeight, margin, variable)
      }
    }

  function variableSelector (event) {
    selectVariable([event.target.value])
  }
  return (
    <div>
      Region:
      <RegionSelect />
      Variable:
      <VariableSelect variableSelector={variableSelector} />

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
