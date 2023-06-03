import React from 'react'
import { Card, Form } from 'react-bootstrap'

const MembershipAddFormImageEditCard = ({ membership }) => {
	return (
		<Card style={{ minHeight: '200px' }} className='mt-3'>
			<Card.Body>
				<Form>
					<Form.Label>회원증 번호</Form.Label>
					<Form.Control value={membership?.number ?? ''} />

					<div className='mt-3' />

					<Form.Label>회원증 지역</Form.Label>
					<Form.Control value={membership.region.koreanName} />
				</Form>
			</Card.Body>
		</Card>
	)
}

export default MembershipAddFormImageEditCard