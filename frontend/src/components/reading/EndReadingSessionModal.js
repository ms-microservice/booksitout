import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'
import { deleteReadingSession } from '../../functions/reading'
import { endReadingSession } from '../../functions/reading'
import '../../resources/css/input.css'

const EndReadingSessionModal = ({ isShowingModal, setIsShowingModal, bookId, toggleTimer, token }) => {
	const navigate = useNavigate()
	const [endPage, setEndPage] = useState(-1)

	const hideModal = () => {
		setIsShowingModal(false)
		toggleTimer(true)
	}

	return (
		<Modal show={isShowingModal} onHide={hideModal} size='lg' centered fullscreen='md-down'>
			<Modal.Header className='text-center' closeButton>
				<Modal.Title className='w-100'>독서활동 끝내기</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => endReadingSession(bookId, endPage, e, navigate)}>
					<h5 className='text-center'>끝내는 페이지</h5>

					<div className='row justify-content-center mt-3 mb-4'>
						<div className='col-3'>
							<Form.Control type='number' onChange={(e) => setEndPage(e.target.value)} autoFocus />
						</div>
					</div>

					<div className='row justify-content-center'>
						<div className='col-12 col-md-4 mt-2'>
							<Button variant='warning' className='w-100' onClick={() => deleteReadingSession(navigate)}>
								그냥 끝내기
							</Button>
						</div>
						<div className='col-12 col-md-4 mt-2'>
							<Button type='submit' className='w-100'>
								저장하고 끝내기
							</Button>
						</div>

						<div className='col-12 col-md-8 mt-2'>
							<Button variant='danger' className='w-100' onClick={hideModal}>
								취소
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default EndReadingSessionModal
