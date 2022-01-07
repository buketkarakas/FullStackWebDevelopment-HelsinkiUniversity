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
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You have created a new anecdote`,3000))
         
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