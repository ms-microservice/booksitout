import React from 'react'
import { Card } from 'react-bootstrap'
// Functions
import { getSourceImage, getSourceKoreanLabel } from '../../../functions/sourceFunction'

const SourceInfo = ({ source }) => {
	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={getSourceImage(source)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{getSourceKoreanLabel(source)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default SourceInfo
