import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentsService from '../services/comments'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addComment(state, action) {
      const { blogId, comment } = action.payload
      const blog = state.find((b) => b.id === blogId)
      if (blog) {
        blog.comments.push(comment)
      }
    },
  },
})

export const { addBlog, setBlogs, updateBlog, deleteBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog.id))
  }
}

export const addCommentToBlog = (blogId, content) => {
  return async (dispatch) => {
    const comment = await commentsService.create(blogId, content)
    dispatch(addComment({ blogId, comment }))
    return comment
  }
}

export default blogSlice.reducer
