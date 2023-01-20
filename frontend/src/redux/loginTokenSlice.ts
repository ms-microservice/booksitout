import { createSlice } from '@reduxjs/toolkit'

export const loginTokenSlice = createSlice({
	name: 'loginToken',
	initialState: {
		token: localStorage.getItem('login-token'),
	},
	reducers: {
		loginToken: (state, action) => {
			state.token = action.payload
			localStorage.setItem('login-token', action.payload)
		},
		logoutToken: (state) => {
			state.token = ''
			localStorage.setItem('login-token', '')
			localStorage.setItem('user-name', '')
		},
	},
})

export const { loginToken, logoutToken } = loginTokenSlice.actions
export default loginTokenSlice.reducer
