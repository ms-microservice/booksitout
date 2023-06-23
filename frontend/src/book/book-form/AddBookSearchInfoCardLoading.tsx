import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

const AddBookSearchInfoCardLoading = ({ icon, p = 16 }) => {
	return (
		<Card style={{ minHeight: '50px' }} className='h-100'>
			<Card.Body style={{ padding: `${p}px` }}>
				<Placeholder as={Card.Text} animation='glow' className='mb-0'>
					<div className='d-flex justify-content-center align-items-center'>
						<h4 className='text-book me-3 mb-1'>{icon}</h4>
						<Placeholder xs={5} />
					</div>
				</Placeholder>
			</Card.Body>
		</Card>
	)
}

export default AddBookSearchInfoCardLoading