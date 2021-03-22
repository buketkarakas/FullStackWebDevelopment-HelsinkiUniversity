import React, { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))
  const [maxAnectode, setMaxAnectode] = useState(0)

  const handleClick = () => {
    let randomNum = Math.round((Math.random()*10)%6)
    setSelected(randomNum)
  }

  const vote = () => {
    const copy = {...points}
    copy[selected] += 1
    if(copy[selected]>copy[maxAnectode])
      setMaxAnectode(selected)
    setPoints(copy)
  }

  return (
    <>
    <div>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
    </div>
    <div>
      <Button name="next anectode" handleClick={handleClick}/>
      <Button name="vote" handleClick={vote} />
      <h1>Anectode with most votes</h1>
      {anecdotes[maxAnectode]}
      <p>has {points[maxAnectode]} votes</p>
    </div>
    
    </>
  )
}

export default App