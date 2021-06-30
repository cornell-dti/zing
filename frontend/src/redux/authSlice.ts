import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user?: User
}

export interface User {
  displayName: string
  email: string
  idToken: string
  refreshToken: string
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { saveLogin } = authSlice.actions

export default authSlice.reducer
