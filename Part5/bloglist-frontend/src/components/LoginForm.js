import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setErrorStatus, username, password, setUser, setUsername, setPassword, setErrorMessage }) => {

  LoginForm.propTypes = {
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setErrorStatus(true)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  return(
    <form data-testid='login-form' onSubmit={handleLogin}>
      <div>
            username <input data-testid='username' id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
            password <input data-testid='password' id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button data-testid='login-button' id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm