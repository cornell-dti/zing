import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user?: string
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveLogin: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    },
  },
})

export const { saveLogin } = authSlice.actions

export default authSlice.reducer
