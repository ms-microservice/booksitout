import React from 'react'
import { Card } from 'react-bootstrap'

const SimpleLibraryCard = ({ library }) => {
	return (
		<Card style={{ minHeight: '80px' }} className='mb-2'>
			<a href={`/library/detail/${library.id}`}>
				<Card.Body>
					<div className='row'>
						<div className='col-8'>
							<h5>{library.name}</h5>
						</div>

						{library.location.distance !== 0 && (
							<div className='col-4 text-end'>
								<div className='text-secondary'>{library.location.distance?.toFixed(2) ?? '-'} km</div>
							</div>
						)}
					</div>

					<h6 className='text-secondary clamp-1-line'>{library.location.address}</h6>
				</Card.Body>
			</a>
		</Card>
	)
}

export default SimpleLibraryCard