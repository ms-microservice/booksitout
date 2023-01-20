import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import timerReducer from './timerSlice'

export default configureStore({
	reducer: {
		user: userReducer,
		timer: timerReducer,
	},
})
