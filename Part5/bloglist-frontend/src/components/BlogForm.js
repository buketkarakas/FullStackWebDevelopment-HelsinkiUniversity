import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef, setMessage,setErrorStatus, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try{
      const newObject = {
        title: title,
        author: author,
        url: url
      }
      const response = await blogService.create(newObject)
      const newBlogs = [...blogs, response]
      setBlogs(newBlogs)
      setMessage('a new blog '+title+' by '+author+' added')
      setErrorStatus(false)
      setTimeout(() => {setMessage(null)}, 5000)

    }
    catch(exception){
      console.log(exception)
      setMessage('Wrong credentials')
      setErrorStatus(true)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h1>Create New</h1>
      <div>
            title <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
            author <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
            URL <input type="text" value={url} name="url" onChange={({ target }) => setURL(target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default BlogForm