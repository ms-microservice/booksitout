import React from 'react'
import { Card } from 'react-bootstrap'
import { getFormImage, getFormKoreanLabel } from '../../../functions/formFunction'

const FormInfo = ({ form }) => {
	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={getFormImage(form)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{getFormKoreanLabel(form)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default FormInfo
