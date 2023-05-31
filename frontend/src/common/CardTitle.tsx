import React from 'react'

const CardTitle = ({icon, title, subTitle = '', textSize=3, iconSize=2, mb=3}) => {
    return (
		<div className={`d-flex mb-${mb} align-items-center`}>
			<h1 className={`me-2 text-book h${iconSize}`}>{icon}</h1>
			<div className={`h${textSize} m-0`}>{title}</div>

			<h6 className='text-secondary ms-2 mt-3'>{subTitle}</h6>
		</div>
	)
}

export default CardTitle