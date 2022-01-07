import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from "../reducers/anecdoteReducer";
import { removeNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const filtered = state.filter === 'ALL' ? state.anecdotes : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    return filtered
  })
  
  console.log(anecdotes)

  const vote = (anecdote) => {
      dispatch(increaseVotes(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`,3))
  }

  return (
      <>
      {anecdotes.sort((a, b) => b.votes - a.votes) && anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
      </>
  )
}

export default AnecdoteList