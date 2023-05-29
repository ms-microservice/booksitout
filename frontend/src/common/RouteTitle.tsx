import React from 'react'

const RouteTitle = ({ icon, title }) => {
	return (
		<div className='d-flex mb-3'>
			<h1 className='text-book ms-3 me-3'>
                {icon}
			</h1>
			<h1 className='pt-1'>{title}</h1>
		</div>
	)
}

export default RouteTitle