import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const TimerFloatingButton = ({ url = '/reading' }) => {
	const time: number = useSelector((state: RootState) => state.timer.readingTimeInSeconds)
	const token: string | null = useSelector((state: RootState) => state.user.token)

	const timeStyle: React.CSSProperties = {
		position: 'fixed',
		left: '2.5%',
		bottom: '20px',

		width: '90px',
		height: '60px',

		borderRadius: '10px',
	}

	return (
		<>
			{token !== '' && token !== null ? (
				time == null || time === 0 || typeof time === 'undefined' ? (
					<></>
				) : (
					<Button variant='book' href={url} style={timeStyle}>
						<h6 className='mt-1 mb-0'>{`${Math.floor((time / 60 / 60) % (60 * 60))}H `}</h6>
						<h6 className='mt-0' style={{ whiteSpace: 'nowrap' }}>
							{Math.floor(time / 60) % 60}M {`${time % 60}S`}
						</h6>
					</Button>
				)
			) : (
				<></>
			)}
		</>
	)
}

export default TimerFloatingButton
