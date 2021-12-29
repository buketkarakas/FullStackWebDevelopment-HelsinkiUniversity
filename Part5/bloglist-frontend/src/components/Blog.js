import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({blog, setBlogs, blogs}) =>{
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

  const buttonLabel = detailsVisible ? "hide": "view"
  const displayDetails = {display: detailsVisible ? "": "none"}
  console.log(blog)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={()=> setDetailsVisible(!detailsVisible)}>{buttonLabel}</button>
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
    </div>  
)
}

export default Blog