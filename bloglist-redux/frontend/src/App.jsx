import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBlogs, createBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'

import { useState } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={() => {}} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <Togglable buttonLabel='create new blog'>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  )
}

export default App
