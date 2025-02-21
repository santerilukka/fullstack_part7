import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import storage from '../services/storage'

const Blog = ({ blog, handleVote, handleDelete }) => {
  if (!blog) {
    return null
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  return (
    <div style={style} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
      <div>
        likes {blog.likes}
        <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
          like
        </button>
      </div>
      <div>{nameOfUser}</div>
      {canRemove && <button onClick={() => handleDelete(blog)}>remove</button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }),
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
