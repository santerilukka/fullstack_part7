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
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    storage.saveUser(user)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    storage.removeUser() // Change this line
    dispatch(clearUser())
  }
}

export default userSlice.reducer
