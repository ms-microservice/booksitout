import { Button } from 'react-bootstrap'
import { BsBookHalf as BookIcon } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ReadingButton = ({ bottomStyle = '40px', url = '/reading' }) => {
	const navigate = useNavigate()
	const time = useSelector((state) => state.timer.readingTimeInSeconds)
	const token = useSelector((state) => state.user.token)

	const readingButtonStyle = {
		position: 'fixed',
		right: '2.5%',
		
		width: '60px',
		height: '60px',

		borderRadius: '50px',
		bottom: bottomStyle,
	}

	const timeStyle = {
		position: 'fixed',
		right: '2.5%',

		width: '90px',
		height: '60px',

		borderRadius: '10px',
		bottom: bottomStyle,
	}

	return (
		<>
			{token !== '' ? (
				time == null || time === '' || time === 0 || typeof time === 'undefined' ? (
					<BookIcon
						className='btn btn-book'
						style={readingButtonStyle}
						onClick={() => {
							navigate(url)
						}}
					/>
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

export default ReadingButton
