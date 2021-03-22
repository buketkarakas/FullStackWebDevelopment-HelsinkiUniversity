import React, { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>
}

const Statistic = (props) => {
  if(props.name === "positive")
    return <>
    <td>{props.name} </td>
    <td>{props.number} %</td>
    </>
  else
    return <>
    <td>{props.name} </td>
    <td>{props.number}</td>
    </>
}

const Statistics = (props) => {
  if(props.good===0 && props.bad===0 && props.neutral===0)
    return <p>No feedback given</p>
  else
    return  <table>
      <tbody>
        <tr>
          <Statistic name = "Good" number = {props.good} />
        </tr>
        <tr>
          <Statistic name = "Neutral" number = {props.neutral} />
        </tr>
        <tr>
          <Statistic name = "Bad" number = {props.bad} />
        </tr>
        <tr>
          <Statistic name = "all" number = {props.good+props.neutral+props.bad}/>
        </tr>
        <tr>
          <Statistic name = "average" number = {(props.good-props.bad)/(props.good+props.bad+props.neutral)}/>
        </tr>
        <tr>
          <Statistic name ="positive" number={props.good/(props.good+props.bad+props.neutral)*100}/>
        </tr>
      </tbody>
    </table>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good+1)
  const handleClickNeutral = () => setNeutral(neutral+1)
  const handleClickBad = () => setBad(bad+1)



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleClickGood} name="Good"/>
      <Button handleClick = {handleClickNeutral} name="Neutral"/>
      <Button handleClick = {handleClickBad} name="Bad"/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App