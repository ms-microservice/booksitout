import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import timerReducer from './timerSlice'
import modalReducer from './modalSlice'

const store = configureStore({
	reducer: {
		user: userReducer,
		timer: timerReducer,
		modal: modalReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export default store
