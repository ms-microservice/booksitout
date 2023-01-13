const TIMER_ON_KEY = `timer-on`
const READING_TIME_KEY = `reading-session-time`
const READING_TIME_DATE = `reading-session-date`

const getIsTimerOn = () => {
	return localStorage.getItem(TIMER_ON_KEY) === 'true'
}

const turnOnTimer = () => {
	localStorage.setItem(TIMER_ON_KEY, 'true')
}

const turnOffTimer = () => {
	localStorage.setItem(TIMER_ON_KEY, 'false')
}

const getDifferenceInSeconds = (date1: Date, date2: Date) => {
	return Math.abs((Number(date1.getTime()) - Number(date2.getTime())) / 1000)
}

const getTimerSecond = () => {
	const difference = getDifferenceInSeconds(new Date(localStorage.getItem(READING_TIME_DATE) ?? ''), new Date())
	localStorage.setItem(READING_TIME_DATE, new Date().toString())

	if (difference > 3 && getIsTimerOn()) {
		const previousSeconds = localStorage.getItem(READING_TIME_KEY)
		localStorage.setItem(READING_TIME_KEY, (Number(previousSeconds) + Number(difference)).toString())
	}

	return localStorage.getItem(READING_TIME_KEY)
}

const updateReadingTimeDate = () => {
	localStorage.setItem(READING_TIME_DATE, new Date().toString())
}

const updateTimerSecond = (newTimerSecond: number) => {
	localStorage.setItem(READING_TIME_DATE, new Date().toString())
	localStorage.setItem(READING_TIME_KEY, newTimerSecond.toString())
}

export { getIsTimerOn, getTimerSecond, updateTimerSecond, turnOnTimer, turnOffTimer, updateReadingTimeDate }
