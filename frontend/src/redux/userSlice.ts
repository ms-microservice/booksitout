import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: localStorage.getItem('login-token'),
	},
	reducers: {
		loginToken: (state, action) => {
			state.token = action.payload
		},
		logoutToken: (state) => {
			state.token = ''
			localStorage.setItem('login-token', '')
			localStorage.setItem('user-name', '')
			localStorage.setItem('profile-image', '')
			localStorage.setItem('login-date', '')
			localStorage.setItem('register-year', '')
		},
	},
})

export const { loginToken, logoutToken } = userSlice.actions
export default userSlice.reducer
