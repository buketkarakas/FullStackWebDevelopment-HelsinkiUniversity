import React, { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>
}

const Statistic = (props) => {
  if(props.name === "positive")
    return <p>{props.name} {props.number} % </p> 
  else
    return <p>{props.name} {props.number}</p>
}

const Statistics = (props) => {
  if(props.good===0 && props.bad===0 && props.neutral===0)
    return <p>No feedback given</p>
  else
    return  <> 
              <Statistic name = "Good" number = {props.good} />
              <Statistic name = "Neutral" number = {props.neutral} />
              <Statistic name = "Bad" number = {props.bad} />
              <Statistic name = "all" number = {props.good+props.neutral+props.bad}/>
              <Statistic name = "average" number = {(props.good-props.bad)/(props.good+props.bad+props.neutral)}/>
              <Statistic name ="positive" number={props.good/(props.good+props.bad+props.neutral)*100}/>
            </>
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