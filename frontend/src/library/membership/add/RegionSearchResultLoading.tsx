import React from 'react'
import { Card, ListGroup, Placeholder } from 'react-bootstrap'

const RegionSearchResultLoading = () => {
	return (
		<ListGroup.Item style={{ height: '60px' }} className='rounded'>
			<Placeholder as={Card.Text} animation='glow' className='text-center'>
				<Placeholder xs={5} />
			</Placeholder>
		</ListGroup.Item>
	)
}

export default RegionSearchResultLoading