import React from 'react'

const AddSelect = (props) => {
  let [variable, region, graph] = props.data
  return (
    <div>
      <select onChange={console.log(props.data)}>
        <option defaultValue="none" >Add Element</option>
        <option defaultValue="variable" >Variable</option>
        <option defaultValue="region" >Region</option>
    </select>
  </div>
  )
}

export default AddSelect
