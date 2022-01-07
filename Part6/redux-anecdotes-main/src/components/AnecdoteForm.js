import React from "react";
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdoteContent.value
        event.target.anecdoteContent.value = ''
        dispatch(createAnecdote(content))
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