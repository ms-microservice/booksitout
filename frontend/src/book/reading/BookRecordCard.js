import React from 'react'
import NoContent from '../../common/NoContent'
import { Card, Button, Form } from 'react-bootstrap'

const BookRecordCard = ({ label, conjunctures, recordList }) => {
	const saveRecord = (e) => {
		e.preventDefault()
	}

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>{label}</h4>

				<div className='row row-eq-height'>
					{recordList == null || recordList.length == 0 ? (
						<NoContent message={`${label}${conjunctures[0]} 없어요`} style={{ width: '100px' }} />
					) : (
						recordList.map((record) => {
							return (
								<div className='col-6 col-md-4 mb-3'>
									<Card className='h-100'>
										<Card.Header>{record.page}</Card.Header>

										<Card.Body className='d-flex align-items-center justify-content-center'>{record.content}</Card.Body>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={saveRecord}>
					<div className='row'>
						<div className='col-3 col-md-2'>
							<Form.Control type='number' placeholder='Page' className='h-100' required />
						</div>

						<div className='col-7 col-md-8'>
							<Form.Control type='text' placeholder={`${label}${conjunctures[1]} 입력해 주세요`} required />
						</div>

						<div className='col-2'>
							<Button variant='success' className='w-100 h-100'>
								등록
							</Button>
						</div>
					</div>
				</Form>
			</Card.Footer>
		</Card>
	)
}

export default BookRecordCard
