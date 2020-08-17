import React from 'react'

const VariableSelect = (props) => {
  const variables = [
{  "positive": "Positive Test Results"},
{  "negative": "Negative Test Results"},
 { "hospitalizedCurrently": "Hospitalized With Covid-19"},
{"inIcuCurrently": "In ICU with Covid-19"},
{  "recovered": "Recovered"},
{  "death": "Deaths"},
{  "positiveIncrease": "Daily Increase in Total Positive Test Results"},
{  "negativeIncrease": "Daily Increase in Total Negative Test Results"},
{  "totalTestResults": "Total Tests Administered"},
{  "totalTestResultsIncrease": "Daily Increase in Total Tests Administered"},
{  "deathIncrease":  "Daily Increase in Total Positive Deaths"}]

  return (
    <div>
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
