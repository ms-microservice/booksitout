import React from 'react'
import { Card, Form } from 'react-bootstrap'
import MembershipAddFormImageTypeSearchCard from './MembershipAddFormImageTypeSearchCard'

const MembershipAddFormImageEditCard = ({ membership, setMembership }) => {
	const selectType = (typeId) => {
		setMembership({
			...membership,
			typeId: typeId,
		})
	}

	return (
		<Card style={{ minHeight: '440px' }} className="mt-3">
			<Card.Body>
				<Form>
					<div className="d-flex align-items-center">
						<Form.Label>회원증 번호</Form.Label>
						<h6 className="ms-3 text-book">{membership?.number.length}</h6>
					</div>
					<Form.Control
						defaultValue={membership?.number ?? ''}
						onChange={e => setMembership({ ...membership, number: e.target.value })}
					/>

					<div className="mt-3" />

					<Form.Label>종류</Form.Label>
					<div style={{ minHeight: '200px' }}>
						<MembershipAddFormImageTypeSearchCard
							recognizedMembership={membership}
							selectType={selectType}
						/>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default MembershipAddFormImageEditCard