import anecdotesService from "../services/anecdotes"

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      anecdote,
    })
  }
}

export const increaseVotes = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: anecdote.id,
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => { 
    const anecdotes = await anecdotesService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE': {
      return state.map((anecdote) =>
      anecdote.id === action.data
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote
    )
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