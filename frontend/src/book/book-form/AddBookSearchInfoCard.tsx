import React from 'react'
import { Card } from 'react-bootstrap'

const AddBookSearchInfoCard = ({ icon, label, p = 16, me=3 }) => {
	return (
		<Card style={{ minHeight: '50px' }} className='h-100 w-100'>
			<Card.Body style={{ padding: `${p}px` }}>
				<div className='d-flex justify-content-center align-items-center h-100'>
					<h5 className={`text-book me-${me} mb-1`}>{icon}</h5>
					<h6 className='m-0 clamp-1-line'>{label}</h6>
				</div>
			</Card.Body>
		</Card>
	)
}

export default AddBookSearchInfoCard