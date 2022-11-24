import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsBookHalf as BookIcon } from 'react-icons/bs'
import { Button } from 'react-bootstrap'

const ReadingButton = ({ bottomStyle = '40px', url = '/reading', time }) => {
	const navigate = useNavigate()

	const readingButtonStyle = {
		position: 'fixed',
		bottom: bottomStyle,
		right: '40px',
		width: '60px',
		height: '60px',
		borderRadius: '50px',
	}

	const timeStyle = {
		position: 'fixed',
		bottom: bottomStyle,
		right: '40px',
		width: '90px',
		height: '60px',
		borderRadius: '10px',
	}

	return (
		<>
			{time == null || time == '' ? (
				<BookIcon
					className='btn btn-primary'
					style={readingButtonStyle}
					onClick={() => {
						navigate(url)
					}}
				/>
			) : (
				<Button href={url} style={timeStyle}>
					<h6 className='mt-1'>
						{time > 60 * 60 && `${Math.floor((time / 60 / 60) % (60 * 60))}H `}
						{Math.floor(time / 60) % 60}M {`${time % 60}S`}
					</h6>
				</Button>
			)}
		</>
	)
}

export default ReadingButton
