import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

const SimpleLibraryCardLoading = () => {
    return (
		<Card style={{ minHeight: '80px' }} className='mb-2'>
			<Card.Body>
				<div className='row'>
					<div className='col-10'>
						<h5>
							<Placeholder as={Card.Text} animation='glow' className='mb-0'>
								<Placeholder xs={3} />
							</Placeholder>
						</h5>
					</div>

					<div className='col-2 text-end'>
						<Placeholder as={Card.Text} animation='glow' className='mb-0'>
							<Placeholder xs={6} />
						</Placeholder>
					</div>
				</div>

				<h6 className='text-secondary clamp-1-line'>
					<Placeholder as={Card.Text} animation='glow' className='mb-0'>
						<Placeholder xs={8} />
					</Placeholder>
				</h6>
			</Card.Body>
		</Card>
	)
}

export default SimpleLibraryCardLoading