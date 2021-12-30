import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const likeClick = async (event, blog) => {
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

  const deleteFunction = async (id) => {
    await blogService.deleteOne(id)
    setBlogs(blogs.filter((blog) => blog.id !== id))
    setMessage('successfully deleted')
    setErrorStatus(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleCreateBlog = async (event, title, author, url) => {
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

  const compare = (blog1, blog2) => blog2.likes - blog1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorStatus={errorStatus} />
      {user === null ?
        <LoginForm  setErrorMessage = {setMessage} setErrorStatus={setErrorStatus}  username={username} password={password} setUser={setUser} setPassword={setPassword} setUsername={setUsername}/> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>logout</button>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog}/>
          </Togglable>
          { blogs.sort(compare) &&
        blogs.map(blog =>
          <Blog key={blog.id}  blog={blog} likeClick={() => likeClick(blog)} deleteFunction={() => deleteFunction(blog.id)}/>
        )
          }
        </div>
      }
    </div>
  )
}

export default App