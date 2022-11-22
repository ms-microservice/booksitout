import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import NoContent from '../common/NoContent'

const Reading = ({ token }) => {
	const memoList = [
		{
			memoId: 1,
			content: `너무 감동적이다 어떡하냐`,
			page: 5,
		},
		{
			memoId: 2,
			content: `너무 감동적이다 어떡하냐ㅜㅜㅜㅜㅜㅜ감동적이다 어떡하냐ㅜㅜㅜㅜㅜㅜ감동적이다 어떡하냐ㅜㅜㅜㅜㅜㅜ`,
			page: 5,
		},
		{
			memoId: 3,
			content: `너무 감동적이다 어떡하냐`,
			page: 5,
		},
		{
			memoId: 4,
			content: `너무 감동적이다 어떡하냐ㅜㅜㅜㅜㅜㅜㅜㅜ`,
			page: 1000,
		},
	]
	const quoteList = []

	const { id } = useParams()
	const navigate = useNavigate()

	const BOOK_API_URL = `http://localhost/v1/book/${id}`
	const READING_SESSION_API_URL = `http://localhost/v1/reading-session/${id}`
	const READING_URL = `/reading/`
	const [book, setBook] = useState(null)

	useEffect(() => {
		Promise.all([
			fetch(BOOK_API_URL, {
				method: 'GET',
				headers: { Authorization: token },
			})
				.then((res) => {
					if (res.status.toString().startsWith(2)) {
						return res.json()
					}
				})
				.then((data) => setBook(data))
				.finally(() => {}),
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
				}),
		])
	}, [])

	const [timerOn, setTimerOn] = useState(false)
	const [time, setTime] = useState(0)
	setTimeout(() => {
		if (timerOn) {
			setTime(time + 1)
		}
	}, 1000)

	const pauseTimer = () => {
		setTimerOn(!timerOn)
	}

	const [isShowingModal, setIsShowingModal] = useState(false)
	const showModal = () => {
		setIsShowingModal(true)
		setTimerOn(false)
	}
	const endReadingSession = (e) => {
		e.preventDefault()
	}
	const hideModal = () => {
		setIsShowingModal(false)
		setTimerOn(true)
	}

	return (
		<div className='container'>
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

							<Timer time={time} />

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

export default Reading
