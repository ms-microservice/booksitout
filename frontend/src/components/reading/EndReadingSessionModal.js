import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Modal, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Resources
import '../../resources/css/input.css'
import { FaExchangeAlt as ChangeIcon } from 'react-icons/fa'
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

		if (!isPercentMode && Number(endPage) === Number(book.currentPage)) {
			toast.error('1쪽이라도 읽어야 독서활동을 끝낼 수 있어요')
			return
		}

		if (isPercentMode && Number(endPage) < 0) {
			toast.error('0% 이상의 숫자를 적어주세요')
			return
		}

		if (isPercentMode && Number(endPage) > 100) {
			toast.error('100% 이하의 숫자를 적어주세요')
			return
		}

		const percentEndPage = Math.floor((book.endPage * endPage) / 100)
		if (isPercentMode && percentEndPage < book.currentPage) {
			toast.error(`${endPage}%면 ${percentEndPage}P라 그 전 독서활동 끝 페이지인 ${book.currentPage}P보다 작아요. 다시 확인해 주세요`)
			return
		}

		if (!isPercentMode && endPage < Number(book.currentPage + 1)) {
			toast.error('그 전 독서활동의 마지막 페이지보다 큰 페이지를 입력해 주세요')
			return
		}

		if (!isPercentMode && endPage > Number(book.endPage)) {
			toast.error('책의 마지막 페이지보다 커요. 페이지를 잘못 입력하셨다면 책 정보를 먼저 수정해 주세요')
			return
		}


		toast.loading('독서활동을 저장하고 있어요')
		endReadingSession(book, isPercentMode ? percentEndPage : endPage).then((success) => {
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

	const [isPercentMode, setIsPercentMode] = useState(false)

	return (
		<Modal show={isShowingModal} onHide={hideModal} size='lg' centered fullscreen='md-down'>
			<Modal.Header className='text-center' closeButton>
				<Modal.Title className='w-100'>독서활동 끝내기</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{book != null && (
					<Form onSubmit={(e) => handleEndReadingSession(e)}>
						<h5 className='text-center'>{isPercentMode ? '끝내는 퍼센트' : '끝내는 페이지'}</h5>

						<div className='row justify-content-center mt-3 mb-4'>
							<div className='col-6 col-lg-3'>
								<Form.Control
									id='pageInput'
									type='number'
									inputMode='numeric'
									pattern='[0-9]*'
									onChange={(e) => setEndPage(e.target.value)}
									autoFocus
									placeholder={
										isPercentMode
											? `${Math.floor((book.currentPage / book.endPage) * 100) + 1}% - 100%`
											: `${book.currentPage + 1}P - ${book.endPage}P`
									}
								/>
							</div>

							<div className='col-3 col-md-2 col-lg-1'>
								<Button
									variant='secondary'
									onClick={() => {
										setIsPercentMode(!isPercentMode)
										document.getElementById('pageInput').focus()
									}}
									className='w-100'>
									<ChangeIcon />
								</Button>
							</div>
						</div>

						<div className='row justify-content-center'>
							<div className='col-12 col-sm-8 col-md-4 mt-3 mt-md-2'>
								<Button variant='book-danger' className='w-100' onClick={() => handleEndWithoutSaving()}>
									그냥 끝내기
								</Button>
							</div>
							<div className='col-12 col-sm-8 col-md-4 mt-3 mt-md-2'>
								<Button variant='book' type='submit' className='w-100'>
									저장하고 끝내기
								</Button>
							</div>

							{/* <div className='col-12 col-sm-8 col-md-8 mt-3 mt-md-4'>
								<Button variant='book-danger' className='w-100' onClick={hideModal}>
									취소
								</Button>
							</div> */}
						</div>
					</Form>
				)}
			</Modal.Body>
		</Modal>
	)
}

export default EndReadingSessionModal
