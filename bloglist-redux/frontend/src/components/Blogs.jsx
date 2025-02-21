import React from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Notification from './Notification'

import { createBlog, updateBlog, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blogs = ({ blogs, blogFormRef, user, handleLogout }) => {
  const dispatch = useDispatch()

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
    dispatch(notify(`A new blog ${blog.title} by ${blog.author} added`))
  }

  const handleVote = async (blog) => {
    dispatch(updateBlog(blog))
    dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(notify(`Blog ${blog.title} by ${blog.author} removed`))
    }
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

export default Blogs
