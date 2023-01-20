import { createSlice } from '@reduxjs/toolkit'
import defaultProfile from '../../resources/images/common/logo.png'

export const userSlice = createSlice({
	name: 'user',
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

export const { loginToken, logoutToken } = userSlice.actions
export default userSlice.reducer
