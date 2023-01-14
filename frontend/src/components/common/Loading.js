import React from 'react'

const Loading = ({ message = '잠시만 기다려 주세요', textSize = 'h1' }) => {
	const spinnerStyle = {
		width: '100px',
		height: '100px',
	}

	return (
		<div>
			<div className='row justify-content-center text-center align-items-center'>
				<div className='col-12 col-md-6'>
					<div className='spinner-border text-success' role='status' style={spinnerStyle} />
					<div className={`mt-4 ${textSize}`}>{message}</div>
				</div>
			</div>
		</div>
	)
}

export default Loading
