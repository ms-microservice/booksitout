import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Timer = () => {
	const time = useSelector((state: RootState) => state.timer.readingTimeInSeconds)

	return (
		<h1>
			{Math.floor((time / 60 / 60) % (60 * 60))} : {Math.floor(time / 60) % 60} : {time % 60}
		</h1>
	)
}
export default Timer
