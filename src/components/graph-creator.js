import React from 'react';
import {VariableSelect, RegionSelect, GraphTypeSelect} from './index'
import {Button, TableRow, TableCell } from '@material-ui/core'

// let sampleDate = new Date()

const graphCreator = (props) => {
  return (

      <TableRow style={{margin: 30}}>
        <TableCell align="center">
          DataSet 1:
        </TableCell>
        <TableCell align="center">
          Region:
          <RegionSelect regionSelector={props.regionSelector}/>
        </TableCell>
        <TableCell align="center">
          Variable:
          <VariableSelect variableSelector={props.variableSelector} />
        </TableCell>
        <TableCell align="center">
          Graph Type:
          <GraphTypeSelect graphTypeSelector={props.graphTypeSelector} />
        </TableCell>
        <TableCell align="center">
          <Button variant="contained" color="primary" onClick={() => props.fetchData()}>Load Graph</Button>
        </TableCell>
      </TableRow>

  );
}

export default graphCreator
