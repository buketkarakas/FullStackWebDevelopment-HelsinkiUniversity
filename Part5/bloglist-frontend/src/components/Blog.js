import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setBlogs, blogs, user, setErrorStatus, setMessage }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeClick = async (event) => {
    event.preventDefault()
    const newBlog = {
      ...blog,
      likes: blog.likes+1
    }
    const  blogID = blog.id
    await blogService.update(newBlog, blog.id)
    const updatedBlog = {
      ...newBlog,
      blogID
    }
    setBlogs(
      blogs.map((tempBlog) => (blog.id === tempBlog.id ? updatedBlog : tempBlog))
    )
  }

  const handleRemove = async () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) && deleteFunction(blog.id)
  }

  const deleteFunction = async (id) => {
    await blogService.deleteOne(id)
    setBlogs(blogs.filter((blog) => blog.id !== id))
    setMessage('successfully deleted')
    setErrorStatus(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const buttonLabel = detailsVisible ? 'hide': 'view'
  const displayDetails = { display: detailsVisible ? '': 'none' }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={ () => setDetailsVisible(!detailsVisible)}>{buttonLabel}</button>
      </div>
      <div style={displayDetails}>
        {blog.url}
      </div>
      <div style={displayDetails}>
        likes: {blog.likes} <button onClick={likeClick}>like</button>
      </div>
      <div style={displayDetails}>
        {blog.user.name}
      </div>
      <div style={displayDetails}>
        { user.username === blog.user.username ?
          <button id='remove' onClick={handleRemove}>remove</button> : null
        }
      </div>
    </div>
  )
}

export default Blog