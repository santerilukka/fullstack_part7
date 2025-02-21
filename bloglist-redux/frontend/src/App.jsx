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
import {
  setUser,
  clearUser,
  login,
  logout,
  setUserFromStorage,
} from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'
import BlogDetail from './components/BlogDetail'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch(setUserFromStorage(loggedUserJSON))
    }
  }, [dispatch])

  const blogFormRef = createRef()
  const handleLogout = () => {
    try {
      dispatch(logout())
      dispatch(notify('Logged out', 'success'))
    } catch (exception) {
      dispatch(notify('Error logging out', 'error'))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  const padding = {
    padding: 5,
  }

  const colour = {
    backgroundColor: 'lightgrey',
    padding: 5,
  }

  return (
    <Router>
      <div style={colour}>
        <Link style={padding} to='/'>
          blogs
        </Link>
        <Link style={padding} to='/users'>
          users
        </Link>
        <span style={padding}>{user.name} logged in</span>
        <button style={padding} onClick={handleLogout}>
          logout
        </button>
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <Blogs
              blogs={blogs}
              blogFormRef={blogFormRef}
              user={user}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User users={users} />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />{' '}
      </Routes>
    </Router>
  )
}

export default App
