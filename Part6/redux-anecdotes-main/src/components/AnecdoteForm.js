import React from "react";
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteContent.value
        event.target.anecdoteContent.value = ''
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 3000)
        dispatch(setNotification(`You have created a new anecdote`))
         
    }

    return <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote} >
            <div><input name='anecdoteContent' /></div>
            <button>create</button>
        </form>
    </>
}

export default AnecdoteForm