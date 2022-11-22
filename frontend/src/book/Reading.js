import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import NoContent from '../common/NoContent'

const Reading = ({ token }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const BOOK_API_URL = `http://localhost/v1/book/${id}`
	const READING_SESSION_API_URL = `http://localhost/v1/reading-session/${id}`
	const READING_SESSION_CURRENT_URL = `http://localhost/v1/reading-session/current`
	const READING_URL = `/reading/`
	const TIME_LOCALSTORAGE_VAR_NAME = 'reading-session-time'

	const [book, setBook] = useState(null)
	const [memoList, setMemoList] = useState(null)
	const [quoteList, setQuoteList] = useState(null)

	useEffect(() => {
		fetch(READING_SESSION_CURRENT_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(4)) {
					return
				}

				return res.json()
			})
			.then((readingSession) => {
				if (readingSession.book.bookId == id) {
					setTimerOn(true)
					setBook(readingSession.book)

					const localStorageTime = localStorage.getItem(TIME_LOCALSTORAGE_VAR_NAME)
					if (localStorageTime != null) {
						setSecondPassed(Number(localStorageTime))
					}

					return
				} else {
					alert('아직 진행중인 독서활동이 있어요. 전의 독서활동을 먼저 끝내 주세요')
					navigate(READING_URL + readingSession.book.bookId)
				}
			})

		// if (book == null) {
		// 	fetch(BOOK_API_URL, {
		// 		method: 'GET',
		// 		headers: { Authorization: token },
		// 	})
		// 		.then((res) => {
		// 			if (res.status.toString().startsWith(2)) {
		// 				return res.json()
		// 			}
		// 		})
		// 		.then((data) => setBook(data))
		// }
	}, [])

	const startReadingSession = () => {
		fetch(READING_SESSION_API_URL, {
			method: 'POST',
			headers: { Authorization: token },
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.status.toString().startsWith(2)) {
					alert(data.message)
					navigate(READING_URL + data.bookId)
				} else {
					setTimerOn(true)
				}
			})
	}

	const [timerOn, setTimerOn] = useState(false)
	const [secondPassed, setSecondPassed] = useState(0)
	setTimeout(() => {
		if (timerOn) {
			setSecondPassed(secondPassed + 1)
		}
		if (secondPassed % 2 == 0) {
			localStorage.setItem(TIME_LOCALSTORAGE_VAR_NAME, secondPassed)
		}
	}, 1000)
	const pauseTimer = () => setTimerOn(!timerOn)

	const [isShowingModal, setIsShowingModal] = useState(false)
	const showModal = () => {
		setIsShowingModal(true)
		setTimerOn(false)
	}

	return (
		<div className='container'>
			<EndReadingSessionModal isShowingModal={isShowingModal} setIsShowingModal={setIsShowingModal} setTimerOn={setTimerOn} />

			{book != null && (
				<div className='text-center'>
					<div className='row justify-content-center'>
						<div className='col-4 col-lg-4 '>
							<img src={book.cover} alt='' className='img-fluid rounded w-100' />
						</div>

						<div className='col-12 col-lg-8 mt-5'>
							<div className='mb-5'>
								<h2>{book.title}</h2>
								<h4 className='text-muted'>{book.author}</h4>
							</div>

							<Timer time={secondPassed} />

							<div className='row justify-content-center mb-4 mt-4'>
								<div className='col-6 col-lg-4'>
									<Button variant='primary' className='w-100' onClick={showModal}>
										독서 끝내기
									</Button>
								</div>

								<div className='col-6 col-lg-4'>
									<Button variant={timerOn ? 'danger' : 'success'} className='w-100' onClick={pauseTimer}>
										{timerOn ? '잠시 정지' : '다시 시작'}
									</Button>
								</div>
							</div>

							<div className='row justify-content-center mb-4'>
								<div className='col-12 col-lg-10 mt-3'>
									<BookRecordCard label='메모' conjunctures={['가', '를']} recordList={memoList} />
								</div>

								<div className='col-12 col-lg-10 mt-3'>
									<BookRecordCard label='인용' conjunctures={['이', '을']} recordList={quoteList} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

const Timer = ({ time }) => {
	return (
		<h1>
			{Math.floor(time / 60 / 60)} : {Math.floor(time / 60)} : {time % 60}
		</h1>
	)
}

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

const EndReadingSessionModal = ({ isShowingModal, setIsShowingModal, setTimerOn }) => {
	const hideModal = () => {
		setIsShowingModal(false)
		setTimerOn(true)
	}

	const endReadingSession = (e) => {
		e.preventDefault()
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
							<Form.Control />
						</div>
					</div>

					<div className='row justify-content-center'>
						<div className='col-12 col-md-4 mt-2'>
							<Button variant='warning' className='w-100'>
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

export default Reading
