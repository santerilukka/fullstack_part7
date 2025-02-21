import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      dispatch(notify('Logged in', 'success'))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type='text'
          data-testid='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          data-testid='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type='submit' value='Login' />
    </form>
  )
}

export default Login
