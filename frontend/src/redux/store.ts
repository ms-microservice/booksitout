import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginTokenSlice'
import timerReducer from './timerSlice'

export default configureStore({
	reducer: {
		loginToken: loginReducer,
		timer: timerReducer,
	},
})
