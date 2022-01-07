import React from "react";
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";


const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteContent.value
        event.target.anecdoteContent.value = ''
        props.createAnecdote(content)
        props.setNotification(`You have created a new anecdote`,3)
         
    }

    return <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote} >
            <div><input name='anecdoteContent' /></div>
            <button>create</button>
        </form>
    </>
}

const mapStateToProps = (state) => 
{  
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,  
    filter: state.filter
  }
}

const mapDispatchToProps = {  createAnecdote,setNotification}


const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm