import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'CREATE_BLOG':
      return [...state, action.payload]
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.payload)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', payload: blogs })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({ type: 'CREATE_BLOG', payload: newBlog })
    dispatch(setNotification(`Blog created: ${newBlog.title}`, 'success'))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({ type: 'LIKE_BLOG', payload: updatedBlog })
    dispatch(setNotification(`You liked ${updatedBlog.title}`, 'success'))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({ type: 'DELETE_BLOG', payload: id })
    dispatch(setNotification('Blog removed', 'success'))
  }
}

export default blogReducer
