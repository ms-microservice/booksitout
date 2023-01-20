import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Resources
import '../../resources/css/input.css'
// Functions
import { endReadingSessionWithoutSaving } from '../../functions/reading'
import { endReadingSession } from '../../functions/reading'
// Settings
import messages from '../../settings/messages'
// Redux
import { useDispatch } from 'react-redux'
import { resumeTimer, stopTimer } from '../../redux/timerSlice'

const EndReadingSessionModal = ({ isShowingModal, setIsShowingModal, book }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [endPage, setEndPage] = useState(-1)

	const hideModal = () => {
		setIsShowingModal(false)
		dispatch(resumeTimer())
	}

	const handleEndReadingSession = (e) => {
		e.preventDefault()

		if (endPage === -1 || endPage === '') {
			toast.error('끝내는 페이지를 입력해 주세요')
			return
		}

		if (endPage <= 0) {
			toast.error('페이지는 0보다 작을 수 없어요')
			return
		}

		if (Number(endPage) === Number(book.currentPage)) {
			toast.error('1쪽이라도 읽어야 독서활동을 끝낼 수 있어요')
			return
		}

		toast.loading('독서활동을 저장하고 있어요')
		endReadingSession(book, endPage).then((success) => {
			if (success) {
				navigate(`/book/detail/${book.bookId}`)
			} else {
				toast.error(messages.error)
			}
		})
	}

	const handleEndWithoutSaving = () => {
		const confirm = window.confirm('독서활동을 저장하지 않고 끝낼까요?')

		if (confirm) {
			endReadingSessionWithoutSaving().then((success) => {
				if (success) {
					dispatch(stopTimer())
					toast.success(messages.reading.delete.success.notSaving)
					navigate(`/book/detail/${book.bookId}`)
				} else {
					toast.error(messages.error)
				}
			})
		}
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
							<Button variant='warning' className='w-100' onClick={() => handleEndWithoutSaving()}>
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
