import React from 'react'

const GraphTypeSelect = (props) => {
  return (
    <div id='graph-div'>
      <select onChange={props.graphTypeSelector} id='graph-select'>
        <option defaultValue="none" >Choose a Graph</option>
        <option defaultValue="line" >Line</option>
        <option defaultValue="bar" >Bar</option>
    </select>
  </div>
  )
}

export default GraphTypeSelect
