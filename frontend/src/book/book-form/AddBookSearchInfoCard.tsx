import React from 'react'
import { Card } from 'react-bootstrap'

const AddBookSearchInfoCard = ({ icon, label, p = 16 }) => {
	return (
		<Card style={{ minHeight: '50px' }} className='h-100'>
			<Card.Body style={{ padding: `${p}px` }}>
				<div className='d-flex justify-content-center align-items-center'>
					<h4 className='text-book me-3 mb-1'>{icon}</h4>
					<h6 className='m-0 clamp-1-line'>{label}</h6>
				</div>
			</Card.Body>
		</Card>
	)
}

export default AddBookSearchInfoCard