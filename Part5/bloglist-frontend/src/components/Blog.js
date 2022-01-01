import React, { useState } from 'react'

const Blog = ({ blog, deleteFunction, likeClick }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleRemove = async () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) && deleteFunction(blog.id)
  }

  const buttonLabel = detailsVisible ? 'hide': 'view'
  return (
    <div className='blog' style={blogStyle}>
      <div className='titleAndAuthor' data-testid='blogInfo'>
        {blog.title} {blog.author}
      </div>
      <button data-testid='viewButton' onClick={ () => setDetailsVisible(!detailsVisible)}>{buttonLabel}</button>
      { detailsVisible && <>
        <div data-testid='url'>
          {blog.url}
        </div>
        <div data-testid='likes'>
          likes: {blog.likes} <button data-testid='likeButton' onClick={() => likeClick(blog)}>like</button>
        </div>
        <div data-testid='remove'>
          <button data-testid='removeButton' onClick={handleRemove}>remove</button> : null
        </div>
      </>
      }
    </div>
  )
}

export default Blog