import { createSlice } from '@reduxjs/toolkit'

export const loginTokenSlice = createSlice({
	name: 'loginToken',
	initialState: {
		token: localStorage.getItem('login-token'),
	},
	reducers: {
		login: (state, action) => {
			state.token = action.payload
			localStorage.setItem('login-token', action.payload)
		},
		logout: (state) => {
			state.token = ''
			localStorage.setItem('login-token', '')
		},
	},
})

export const { logout } = loginTokenSlice.actions
export default loginTokenSlice.reducer
