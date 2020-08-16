import React from 'react'

const VariableSelect = (props) => {
  const variables = ["positive", "negative", "hospitalizedCurrently","inIcuCurrently","recovered", "death", "positiveIncrease", "negativeIncrease","totalTestResults", "totalTestResultsIncrease", "posNeg", "deathIncrease"]

  return (
    <div>
      <select onChange={props.variableSelector}>
        <option defaultValue="none" >Choose a Variable</option>
        {variables.map((variable, idx) => {
        return <option value={variable} key={idx}>{variable}</option> })}
      </select>
    </div>
  )
}

export default VariableSelect
