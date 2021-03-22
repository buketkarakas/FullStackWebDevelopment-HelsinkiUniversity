import React, { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>
}

const Statistic = (props) => {
  return <p>{props.name} {props.number}</p>
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
      <Statistic name="Good" number={good} />
      <Statistic name="Neutral" number={neutral} />
      <Statistic name="Bad" number={bad} />
    </div>
  )
}

export default App