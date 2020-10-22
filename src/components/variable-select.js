import React from 'react'

const VariableSelect = (props) => {
  const variables = [
{  "positive": "Total Positive Test Results"},
{  "negative": "Total Negative Test Results"},
 { "hospitalizedCurrently": "Current Hospitalizations"},
{"inIcuCurrently": "Current In ICU"},
{  "recovered": "Total Recovered"},
{  "death": "Total Deaths"},
{  "positiveIncrease": "Daily Increase in Total Positive Test Results"},
{  "negativeIncrease": "Daily Increase in Total Negative Test Results"},
{  "totalTestResults": "Total Tests Administered"},
{  "totalTestResultsIncrease": "Daily Increase in Total Tests Administered"},
{  "deathIncrease":  "Daily Increase in Total Positive Deaths"}]

  return (
    <div id='variable-select'>
      <select onChange={props.variableSelector}>
        <option defaultValue="none" >Choose a Variable</option>
        {variables.map((variable, idx) => {
          let unformatted;
          let formatted;

          for(let key in variable) {
            unformatted = key
            formatted = variable[key]}

          return <option value={unformatted} key={idx}>{formatted}</option> })}
          }
      </select>
    </div>
  )
}

export default VariableSelect
