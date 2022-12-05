import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'
import { deleteReadingSession } from '../../resources/functions/reading'

const EndReadingSessionModal = ({ isShowingModal, setIsShowingModal, bookId, toggleTimer, token }) => {
	const navigate = useNavigate()
	const [endPage, setEndPage] = useState(-1)

	const READING_SESSION_END_API_URL = `http://localhost/v1/reading-session/${bookId}/end?page=${endPage}&time=${localStorage.getItem(
		'reading-session-time'
	)}`

	const endReadingSession = (e) => {
		e.preventDefault()

		fetch(encodeURI(READING_SESSION_END_API_URL), {
			method: 'PUT',
			headers: { Authorization: token },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status.toString().startsWith(2)) {
					localStorage.removeItem('reading-session-time')
					navigate(`/book/detail/${bookId}`)
				}

				alert(data.message)
			})
	}

	const hideModal = () => {
		setIsShowingModal(false)
		toggleTimer(true)
	}

	return (
		<Modal show={isShowingModal} onHide={hideModal} size='lg' centered backdrop='static' fullscreen='md-down'>
			<Modal.Header className='text-center' closeButton>
				<Modal.Title className='w-100'>독서활동 끝내기</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={endReadingSession}>
					<h5 className='text-center'>끝내는 페이지</h5>

					<div className='row justify-content-center mt-3 mb-4'>
						<div className='col-3'>
							<Form.Control onChange={(e) => setEndPage(e.target.value)} />
						</div>
					</div>

					<div className='row justify-content-center'>
						<div className='col-12 col-md-4 mt-2'>
							<Button variant='warning' className='w-100' onClick={() => deleteReadingSession(token, navigate)}>
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
