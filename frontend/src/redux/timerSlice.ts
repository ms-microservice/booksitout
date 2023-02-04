import { createSlice } from '@reduxjs/toolkit'
import { getTimerSecond } from '../functions/timer'

export const timerSlice = createSlice({
	name: 'timer',
	initialState: {
		readingTimeInSeconds: Math.round(Number(getTimerSecond())),
		isTimerOn: localStorage.getItem('timer-on') === 'true',
	},
	reducers: {
		stopTimer: (state) => {
			localStorage.removeItem('reading-session-time')
			localStorage.removeItem('reading-session-date')
			localStorage.removeItem('timer-on')
			state.readingTimeInSeconds = 0
		},
		resumeTimer: (state) => {
			localStorage.setItem('timer-on', 'true')
			state.isTimerOn = true
		},
		pauseTimer: (state) => {
			localStorage.setItem('timer-on', 'false')
			state.isTimerOn = false
		},
		toggleTimer: (state) => {
			if (state.isTimerOn) {
				localStorage.setItem('timer-on', 'false')
				state.isTimerOn = false
			} else {
				localStorage.setItem('timer-on', 'true')
				state.isTimerOn = true
			}
		},
		updateReadingTimeDate: () => {
			localStorage.setItem('reading-session-date', new Date().toString())
		},
		updateOneSecond: (state) => {
			const currentTime = getTimerSecond()

			localStorage.setItem('reading-session-date', new Date().toString())
			localStorage.setItem('reading-session-time', (currentTime == null ? 1 : Number(currentTime) + 1).toString())

			state.readingTimeInSeconds = Math.round(Number(currentTime == null ? 1 : currentTime))
		},
	},
})

export const { updateOneSecond, stopTimer, resumeTimer, pauseTimer, toggleTimer, updateReadingTimeDate } = timerSlice.actions
export default timerSlice.reducer
