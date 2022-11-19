import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsBookHalf as BookIcon } from 'react-icons/bs'

const ReadingButton = ({ bottomStyle = '40px', url = '/reading' }) => {
	const navigate = useNavigate()

	const addButtonStyle = {
		position: 'fixed',
		bottom: bottomStyle,
		right: '40px',
		width: '60px',
		height: '60px',
		borderRadius: '50px',
	}

	return (
		<BookIcon
			className='btn btn-primary'
			style={addButtonStyle}
			onClick={() => {
				navigate(url)
			}}
		/>
	)
}

export default ReadingButton
