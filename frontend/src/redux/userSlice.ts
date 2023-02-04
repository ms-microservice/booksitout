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
		},
	},
})

export const { loginToken, logoutToken } = userSlice.actions
export default userSlice.reducer
