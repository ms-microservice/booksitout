import React from 'react'

const CardTitle = ({icon, title, subTitle, size='h1'}) => {
    return (
		<div className='d-flex mb-3'>
			<h1 className='me-2 text-book h1'>{icon}</h1>

			<div className={`pt-1 ${size}`}>{title}</div>

			<h6 className='text-secondary ms-2 mt-4'>{subTitle}</h6>
		</div>
	)
}

export default CardTitle