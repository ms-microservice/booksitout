import React from 'react'

const RouteTitle = ({ icon, title, subTitle = '' }) => {
	return (
		<div className='d-flex mb-3'>
			<h1 className='text-book ms-3 me-3'>{icon}</h1>
			<h1 className='pt-1'>{title}</h1>
			<h5 className='text-secondary ms-3 me-3'>{subTitle}</h5>
		</div>
	)
}

export default RouteTitle