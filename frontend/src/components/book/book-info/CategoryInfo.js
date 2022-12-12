import React from 'react'
import { Card } from 'react-bootstrap'
// Functions
import { getCategoryIcon, getCategoryKoreanDisplayName } from '../../../functions/category'

const CategoryInfo = ({ category }) => {
	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={getCategoryIcon(category)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{getCategoryKoreanDisplayName(category)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default CategoryInfo
