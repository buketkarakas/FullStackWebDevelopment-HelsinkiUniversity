
export const createAnecdote = (anecdote) => {
  return  {
    type: "NEW_ANECDOTE",
    anecdote
  }
}

export const increaseVotes = (id) => {
  return {
    type: "VOTE",
    data: {id: id}
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToUpdate = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    }
    case 'NEW_ANECDOTE':
      return state.concat(action.anecdote)
    case 'INIT_ANECDOTES': 
      return action.data
    default:
      return state
      
  }
}

export default anecdoteReducer