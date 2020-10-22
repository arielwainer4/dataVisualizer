import React from 'react'

const AddSelect = (props) => {
  let [variable, region, graph] = props.data

  function cloneSelect(el) {
    console.log(el.target.value)
    var select = document.getElementById(`${el.target.value}-select`)
    var clone = select.cloneNode(true)
    // var name = select.getAttribute("name") + selectionCounter++
    // clone.id = name
    clone.setAttribute("onChange", () => props.regionSelector)
    document.getElementById(`${el.target.value}-div`).append(clone)
  }

  return (
    <div>
      <select onChange={cloneSelect}>
        <option defaultValue="none" >Add Element</option>
        <option value="variable" >Variable</option>
        <option value="region" >Region</option>
    </select>
  </div>
  )
}

export default AddSelect
