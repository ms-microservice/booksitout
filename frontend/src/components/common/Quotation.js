import React from 'react'
import { Card } from 'react-bootstrap'

const Quotation = ({ quotation, onClick }) => {
	return (
		<Card className='mb-3' onClick={onClick}>
			<Card.Header>
				<>{quotation.page == null ? '-' : `${quotation.page} P`}</>
			</Card.Header>

			<Card.Body>
				<div className='row'>
					<div>{quotation.content}</div>
				</div>
			</Card.Body>

			<Card.Footer>{quotation.from_who == null || quotation.from_who === '' ? '-' : quotation.from_who}</Card.Footer>
		</Card>
	)
}

export default Quotation
