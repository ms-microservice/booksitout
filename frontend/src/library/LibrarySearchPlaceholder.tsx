import React from 'react'
import { Card, ListGroup, Placeholder } from 'react-bootstrap'

const LibrarySearchPlaceholder = () => {
    return (
		<ListGroup.Item className='text-center'>
			<Placeholder as={Card.Text} animation='glow' className='mb-0'>
				<Placeholder xs={3} />
			</Placeholder>

			<Placeholder as={Card.Text} animation='glow'>
				<Placeholder xs={5} />
			</Placeholder>
		</ListGroup.Item>
	)
}

export default LibrarySearchPlaceholder