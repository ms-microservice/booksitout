import React from 'react'
import errorImage from '../resources/images/common/error.png'

const NoContent = ({ message = '텅 비어 있어요', icon = errorImage }) => {
	const imageStyle = {
		width: '250px',
	}

	return (
		<div>
			<div className='row justify-content-center'>
				<img src={icon} alt='' className='img-fluid mt-5' style={imageStyle} />

				<h2 className='text-center mt-5'>{message}</h2>
			</div>
		</div>
	)
}

export default NoContent
