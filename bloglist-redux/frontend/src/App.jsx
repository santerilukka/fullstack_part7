import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import notificationReducer from './reducers/notificationReducer'
import { setNotification, notify } from './reducers/notificationReducer'

import blogReducer from './reducers/blogReducer'
import { setBlogs, addBlog } from './reducers/blogReducer'
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from './reducers/blogReducer'

import userReducer from './reducers/userReducer'
import { setUser, clearUser, login, logout } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const blogFormRef = createRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      storage.saveUser(user)
      setUser(user)
      dispatch(notify(`Welcome, ${user.name}!`))
    } catch (exception) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
    dispatch(notify(`A new blog ${blog.title} by ${blog.author} added`))
  }

  const handleVote = async (blog) => {
    dispatch(updateBlog(blog))
    dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
    setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)))
  }

  const handleLogout = () => {
    dispatch(logout())
    setUser(null)
    dispatch(clearUser())
    dispatch(notify('Logged out'))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(notify(`Blog ${blog.title} by ${blog.author} removed`))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs
        .slice()
        .sort(byLikes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleVote={handleVote}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  )
}

export default App
