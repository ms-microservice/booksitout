import React from 'react'
import { Card } from 'react-bootstrap'

const SimpleLibraryCard = ({ library }) => {
	return (
		<Card style={{ minHeight: '80px' }} className='mb-2'>
			<a href={`/library/detail/${library.id}`}>
				<Card.Body>
					<h5 className='text-center'>{library.name}</h5>
					<h6 className='text-secondary text-center clamp-1-line'>{library.location.address}</h6>
				</Card.Body>
			</a>
		</Card>
	)
}

export default SimpleLibraryCard