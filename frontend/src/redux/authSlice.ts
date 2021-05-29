import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    saveLogin: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { saveLogin } = authSlice.actions

export default authSlice.reducer
