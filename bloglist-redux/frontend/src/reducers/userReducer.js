import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import storage from '../services/storage'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const login = (credentials) => {
  console.log('credentials', credentials)
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (e) {
      console.log(e)
    }
  }
}

export const logout = () => {
  console.log('logout')
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }
}

export const setUserFromStorage = (json) => {
  console.log('setUserFromStorage', json)
  return (dispatch) => {
    const user = JSON.parse(json)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

const userReducer = userSlice.reducer

export default userReducer
