import React from 'react'
import noContentImage from '../resources/images/common/bookshelf.png'

const NoContent = () => {
	const imageStyle = {
		width: '250px',
	}

	return (
		<div>
			<div className='row justify-content-center'>
				<img src={noContentImage} alt='' className='img-fluid mt-5' style={imageStyle} />

				<h2 className='text-center mt-5'>해당 조건의 책이 없어요</h2>
			</div>
		</div>
	)
}

export default NoContent
