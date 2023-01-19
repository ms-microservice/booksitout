import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginTokenSlice'

export default configureStore({
	reducer: {
		loginToken: loginReducer,
	},
})
