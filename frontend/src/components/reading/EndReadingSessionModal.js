import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { endReadingSessionWithoutSaving } from '../../functions/reading'
import { endReadingSession } from '../../functions/reading'
import '../../resources/css/input.css'

const EndReadingSessionModal = ({ isShowingModal, setIsShowingModal, bookId, toggleTimer, readingSessionId, setTime, book }) => {
	const navigate = useNavigate()
	const [endPage, setEndPage] = useState(-1)

	const hideModal = () => {
		setIsShowingModal(false)
		toggleTimer(true)
	}

	const handleEndReadingSession = (e) => {
		e.preventDefault()

		endReadingSession(book, endPage).then((success) => {
			if (success) {
				navigate(`/book/detail/${book.bookId}`)
			}
		})
	}

	return (
		<Modal show={isShowingModal} onHide={hideModal} size='lg' centered fullscreen='md-down'>
			<Modal.Header className='text-center' closeButton>
				<Modal.Title className='w-100'>독서활동 끝내기</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleEndReadingSession(e)}>
					<h5 className='text-center'>끝내는 페이지</h5>

					<div className='row justify-content-center mt-3 mb-4'>
						<div className='col-3'>
							<Form.Control type='number' onChange={(e) => setEndPage(e.target.value)} autoFocus />
						</div>
					</div>

					<div className='row justify-content-center'>
						<div className='col-12 col-md-4 mt-2'>
							<Button
								variant='warning'
								className='w-100'
								onClick={() => {
									endReadingSessionWithoutSaving(readingSessionId).then((success) => {
										if (success) {
											toast.success('독서활동을 저장하지 않고 끝냈어요')
											localStorage.removeItem('reading-session-time')
											localStorage.removeItem('reading-session-date')
											localStorage.removeItem('timer-on')
											setTime(0)
											navigate('/book/not-done')
										} else {
											toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
										}
									})
								}}>
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
