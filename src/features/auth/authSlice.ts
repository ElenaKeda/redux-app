import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  // fake simple auth
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    userLoggedOut(state) {
      state.username = null
    },
  },
  selectors: { selectCurrentUsername: (state) => state.username },
})

export const authReducer = authSlice.reducer
export const { userLoggedIn, userLoggedOut } = authSlice.actions
export const { selectCurrentUsername } = authSlice.selectors
