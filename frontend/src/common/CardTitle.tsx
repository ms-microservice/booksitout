import React from 'react'

const CardTitle = ({icon, title, subTitle = '', size='h3', pt='2', iconSize='h2', mb='3'}) => {
    return (
		<div className={`d-flex mb-${mb} align-items-center`}>
			<h1 className={`me-2 text-book ${iconSize}`}>{icon}</h1>
			<div className={`${size} m-0`}>{title}</div>

			<h6 className='text-secondary ms-2 mt-4'>{subTitle}</h6>
		</div>
	)
}

export default CardTitle