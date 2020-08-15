import React from 'react'

const VariableSelect = (props) => {
  const variables = ["positive", "negative", "hospitalizedCurrently","inIcuCurrently","recovered", "death", "totalTestsViral", "positiveCasesViral", "totalTestsAntibody", "positiveTestsAntibody", "negativeTestsAntibody", "totalTestsAntigen", "positiveTestsAntigen", "positiveIncrease", "negativeIncrease", "total", "totalTestResults", "totalTestResultsIncrease", "posNeg", "deathIncrease"]

  return (
    <div>
      <select onChange={props.variableSelector}>
        {variables.map((variable, idx) => {
        return <option value={variable} key={idx}>{variable}</option> })}
      </select>
    </div>
  )
}

export default VariableSelect
