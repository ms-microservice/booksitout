import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOneSecond, updateReadingTimeDate } from '../redux/timerSlice'

const TimerSettings = () => {
	const timerOn = useSelector((state: any) => state.timer.isTimerOn)
	const dispatch = useDispatch()

	useEffect(() => {
		const interval = setInterval(() => {
			if (timerOn) {
				dispatch(updateOneSecond())
			} else {
				dispatch(updateReadingTimeDate())
				updateReadingTimeDate()
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [dispatch, timerOn])

	return <></>
}

export default TimerSettings
