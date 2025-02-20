import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      payload: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        payload: newBlog,
      })
      dispatch(
        setNotification(
          `Blog created: ${newBlog.title} by ${newBlog.author}`,
          'success'
        )
      )
    } catch (error) {
      dispatch(setNotification('Failed to create blog', 'error'))
    }
  }
}

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    default:
      return state
  }
}

export default blogsReducer
