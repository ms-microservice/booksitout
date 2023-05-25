import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: localStorage.getItem('login-token'),
		isLogin:
			localStorage.getItem('login-token') != null &&
			localStorage.getItem('login-token') != '' &&
			typeof localStorage.getItem('login-token') != 'undefined',
	},
	reducers: {
		loginToken: (state, action) => {
			state.token = action.payload
		},
		logoutToken: (state) => {
			state.token = ''
			state.isLogin = false
		},
		checkIsLogin: (state) => {
			state.isLogin = state.token != null && state.token != '' && typeof state.token != 'undefined'
		}
	},
})

export const { loginToken, logoutToken, checkIsLogin } = userSlice.actions
export default userSlice.reducer
