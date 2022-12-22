import React from 'react'
import { Card } from 'react-bootstrap'

const BookInfoIcon = ({
	infoType,
	infoData,
	responsiveImageStyle = 'col-4 col-md-8 align-self-center',
	responsiveTextStyle = 'col-6 col-md-12 mt-2 mt-md-0',
}) => {
	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className={responsiveImageStyle}>
						<img src={infoType.imageFunction(infoData)} alt='' className='img-fluid mb-2' />
					</div>

					<div className={responsiveTextStyle}>
						<h5 className='text-center'>{infoType.textFunction(infoData)}</h5>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default BookInfoIcon
