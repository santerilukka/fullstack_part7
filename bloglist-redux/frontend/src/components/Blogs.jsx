import React from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Notification from './Notification'

const Blogs = ({
  blogs,
  handleVote,
  handleDelete,
  handleCreate,
  blogFormRef,
  user,
  handleLogout,
}) => {
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
