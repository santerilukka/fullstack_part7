import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log('here', action.payload)
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const notify = (message, type = 'success') => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}

const notificationReducer = notificationSlice.reducer

export default notificationReducer
