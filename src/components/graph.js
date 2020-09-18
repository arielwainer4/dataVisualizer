import React, { useRef, useState, useEffect } from 'react';
import { template } from './graph-template'
import { drawLine } from './line-graph'
import { drawBar } from './bar-graph'
import { GraphCreator} from './index'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody} from '@material-ui/core'

// let sampleDate = new Date()

const MyD3Component = (props) => {

  const [allData, setAllData] = useState(['""']);
  const [dateData, setDateData] = useState(['""']);
  const [valueData, setValueData] = useState([`""`]);
  const [variable, selectVariable] = useState([""]);
  const [region, selectRegion] = useState([""]);
  const [graphType, selectGraphType] = useState([""]);
  const d3Container = useRef(null);

  const api = `https://api.covidtracking.com/v1/states/daily.json`

  // useEffect(updateData, dateData)
  useEffect(drawChart, allData)

  function fetchData () {
    fetch(api)
    .then((response) => {return response.json()})
    .then((data) => {
      if(region[0] !== 'us') {
        data = data.filter(stat => stat.state.toLowerCase() === region[0])
        .reduce((accum, stat) => {
          let filteredByVariable = {date: stat.date}
          filteredByVariable[variable] = stat[variable]
          accum.push(filteredByVariable)
          return accum
        }, [])
      } else {
        data = Object.values(data.reduce((accum, stat) => {
          let dateKey = stat.date
          if(!accum[dateKey]) {
            accum[dateKey] = {date: stat.date}
            accum[dateKey][variable] = stat[variable]
          } else {
            accum[dateKey][variable] = accum[dateKey][variable]+stat[variable]
          }
          return accum
        }, {}))
      }

      data.map(instance => {

        let year = instance.date.toString().slice(0,4)
        let month = instance.date.toString().slice(4,6)
        let day = instance.date.toString().slice(6,8)
        instance.date = new Date(year, month-1, day)
      })

      setAllData([JSON.stringify(data)])
      // setDateData([JSON.stringify(arr)])

      // if(allData[0].length > 1) {
      //   updateData()
      // }
    })
    .catch((err) => {console.log(err)})
    }

  // function updateData() {
  //   let all = JSON.parse(allData[0])
  //   if(variable[0] !== "") {
  //     let complete = [];
  //     let dates = JSON.parse(dateData[0])
  //     dates.forEach((date, idx) => {
  //       if(all[idx][variable] === null) {
  //         date.value = 0
  //       } else {
  //         date.value = all[idx][variable]
  //       }
  //       complete.push(date)
  //     })
  //     setValueData([JSON.stringify(complete)])
  //   }
  // }

  function drawChart() {
    let graphData = JSON.parse(allData)
    let svgWidth = 600
    let svgHeight = 300
    let margin = {top: 20, right: 20, bottom: 30, left: 100}

    if(graphData.length < 1) {
      template(graphData, svgWidth, svgHeight, margin)
    }
    else if(graphData.length > 1 && graphType[0] === 'Line') {
      drawLine(graphData, svgWidth, svgHeight, margin, variable)
      }
      else if(graphData.length > 1 && graphType[0] === 'Bar') {
        drawBar(graphData, svgWidth, svgHeight, margin, variable)
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
    <Paper elevation={10} style={{width: '100%'}}>
    <TableContainer  style={{justifyContent: 'center', alignContent:'center'}}>
      <Table >
        <TableHead >
          <GraphCreator regionSelector={regionSelector} variableSelector={variableSelector} graphTypeSelector={graphTypeSelector} fetchData={fetchData} />
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} align="center">
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
    </Paper>
 </div>
  );
}

export default MyD3Component
