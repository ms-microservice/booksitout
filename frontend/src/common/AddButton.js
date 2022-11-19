import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillPlusCircle as AddIcon } from 'react-icons/ai'

const AddButton = ({ bottomStyle = '120px', url = '/book/add' }) => {
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
		<AddIcon
			className='btn btn-success'
			style={addButtonStyle}
			onClick={() => {
				navigate(url)
			}}
		/>
	)
}

export default AddButton
