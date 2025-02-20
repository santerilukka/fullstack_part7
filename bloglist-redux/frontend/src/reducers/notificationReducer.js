const initialState = null

export const setNotification = (message, type = 'success', timeout = 5000) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type },
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer
