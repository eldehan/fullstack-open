import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

// Thunk
export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(() => dispatch(removeNotification()), delay * 1000)
  }

}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer