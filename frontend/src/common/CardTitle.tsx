import React from 'react'

const CardTitle = ({icon, title, subTitle = '', textSize=3, iconSize=2, mb=3}) => {
    return (
		<div className={`d-flex flex-wrap mb-${mb} align-items-center`}>
			<h1 className={`me-2 text-book h${iconSize}`}>{icon}</h1>
			<div className={`h${textSize} m-0`}>{title}</div>

			<div className='col-12 col-md-6'>
				<h6 className='text-secondary ms-4 ms-md-2 mt-1 mt-md-3 mb-0 mb-md-1 clamp-1-line'>{subTitle}</h6>
			</div>
		</div>
	)
}

export default CardTitle