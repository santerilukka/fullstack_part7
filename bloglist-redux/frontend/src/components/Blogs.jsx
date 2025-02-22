import React from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Notification from './Notification'

import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

import { Button, Table } from 'react-bootstrap'

const Blogs = ({ blogs, blogFormRef, user, handleLogout }) => {
  const dispatch = useDispatch()

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
    dispatch(notify(`A new blog ${blog.title} by ${blog.author} added`))
  }

  const handleVote = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(notify(`Blog ${blog.title} by ${blog.author} removed`))
    }
  }

  const byLikes = (a, b) => b.likes - a.likes

  const buttonStyle = {
    margin: '0 0 0 10px',
  }

  const topMargin = {
    marginTop: 10,
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <Button style={buttonStyle} variant='secondary' onClick={handleLogout}>
          logout
        </Button>
      </div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Blog
                    blog={blog}
                    handleVote={handleVote}
                    handleDelete={handleDelete}
                  />
                </td>
                <td>{blog.author}</td>
                <td>{blog.likes}</td>
                <td>
                  <Button variant='primary' onClick={() => handleVote(blog)}>
                    like
                  </Button>
                  {blog.user && blog.user.username === user.username && (
                    <Button
                      style={topMargin}
                      variant='danger'
                      onClick={() => handleDelete(blog)}
                    >
                      remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
