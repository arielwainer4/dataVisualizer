import React, { useRef, useState, useEffect } from 'react';
import { template, drawLine } from './line-graph'
import { drawBar } from './bar-graph'

import {VariableSelect, RegionSelect, GraphTypeSelect} from './index'
import {Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody} from '@material-ui/core'

// let sampleDate = new Date()

const MyD3Component = (props) => {

  const [allData, setAllData] = useState(['""']);
  const [dateData, setDateData] = useState(['""']);
  const [valueData, setValueData] = useState([`""`]);
  const [variable, selectVariable] = useState([""]);
  const [region, selectRegion] = useState([""]);
  const [graphType, selectGraphType] = useState([""]);
  const d3Container = useRef(null);

  const api = `https://api.covidtracking.com/v1/${region}/daily.json`

  useEffect(updateData, dateData)
  useEffect(drawChart, valueData)

  function fetchData () {
    fetch(api)
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
      setDateData([JSON.stringify(arr)])
      if(allData[0].length > 2) {
        updateData()
      }
    })
    .catch((err) => {console.log(err)})
    }

  function updateData() {
    let all = JSON.parse(allData[0])
    if(variable[0] !== "") {
      let complete = [];
      let dates = JSON.parse(dateData[0])
      dates.forEach((date, idx) => {
        date.value = all[idx][variable]
        complete.push(date)
      })
      setValueData([JSON.stringify(complete)])
    }
  }

  function drawChart() {
    let allData = JSON.parse(valueData)
    let svgWidth = 600
    let svgHeight = 300
    let margin = {top: 20, right: 20, bottom: 30, left: 100}

    if(allData.length < 1) {
      template(allData, svgWidth, svgHeight, margin)
    }
    else if(allData.length > 1 && graphType[0] === 'Line') {
      drawLine(allData, svgWidth, svgHeight, margin, variable)
      }
      else if(allData.length > 1 && graphType[0] === 'Bar') {
        drawBar(allData, svgWidth, svgHeight, margin, variable)
        }
    }

  function variableSelector (event) {
    selectVariable([event.target.value])
    setValueData([`""`])
  }

  function regionSelector (event) {
    selectRegion([event.target.value])
    setValueData([`""`])
  }

  function graphTypeSelector (event) {
    selectGraphType([event.target.value])
    setValueData([`""`])
  }

  return (
    <div style={{ margin: 40 }}>
    <TableContainer component={Paper} elevation={10}>
      <Table aria-label="spanning table">
        <TableHead >
          <TableRow>
            <TableCell align="center">
              Region:
              <RegionSelect regionSelector={regionSelector}/>
            </TableCell>
            <TableCell align="center">
              Variable:
              <VariableSelect variableSelector={variableSelector} />
            </TableCell>
            <TableCell align="center">
              Graph Type:
              <GraphTypeSelect graphTypeSelector={graphTypeSelector} />
            </TableCell>
            <TableCell align="center">
              <Button variant="contained" color="primary" onClick={() => fetchData()}>Load Graph</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} align="center">
              <div className="svg-div">
                <svg
                  className="d3-component"
                  width={400}
                  height={200}
                  ref={d3Container}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
 </div>
  );
}

export default MyD3Component
