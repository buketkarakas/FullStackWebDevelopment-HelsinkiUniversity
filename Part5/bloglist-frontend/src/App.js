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
            <BlogForm blogFormRef={blogFormRef} setMessage={setMessage} setErrorStatus={setErrorStatus} blogs={blogs} setBlogs={setBlogs}/>
          </Togglable>
          { blogs.sort(compare) &&
        blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} blogs={blogs} setErrorStatus={setErrorStatus} setMessage={setMessage} />
        )
          }
        </div>
      }
    </div>
  )
}

export default App