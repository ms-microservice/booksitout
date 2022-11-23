import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// Components
import Timer from './Timer'
import BookRecordCard from './BookRecordCard'
import EndReadingSessionModal from './EndReadingSessionModal'

const Reading = ({ token, readingSessionTime }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const READING_SESSION_CURRENT_API_URL = `http://localhost/v1/reading-session/current`
	const READING_SESSION_API_URL = `http://localhost/v1/reading-session/${id}`
	const MEMO_API_URL = `http://localhost/v1/memo/${id}`
	const QUOTE_API_URL = `http://localhost/v1/quote/${id}`

	const [book, setBook] = useState(null)
	const [memoList, setMemoList] = useState(null)
	const [quoteList, setQuoteList] = useState(null)

	const TIMER_ON = `timer-on`
	const [isTimerOn, setIsTimerOn] = useState(localStorage.getItem(TIMER_ON))
	const toggleTimer = (state = !isTimerOn) => {
		state == 'true' ? setIsTimerOn(true) : setIsTimerOn(false)
		state == 'true' ? localStorage.setItem(TIMER_ON, true) : localStorage.setItem(TIMER_ON, false)
	}

	useEffect(() => {
		localStorage.setItem(TIMER_ON, isTimerOn)
	}, [isTimerOn])

	const startReadingSession = () => {
		fetch(READING_SESSION_API_URL, {
			method: 'POST',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (!res.status.toString().startsWith(2)) {
					throw new Error(res.json())
				}

				toggleTimer(true)
			})
			.catch((e) => {
				// setBook()
			})
	}

	useEffect(() => {
		fetch(READING_SESSION_CURRENT_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(4)) {
					startReadingSession()
					throw new Error()
				}
				return res.json()
			})
			.then((readingSession) => {
				if (readingSession.book.bookId == id) {
					toggleTimer(true)
					setBook(readingSession.book)
				} else {
					alert('아직 진행중인 독서활동이 있어요. 전의 독서활동을 먼저 끝내 주세요')
					navigate(`/reading/${readingSession.book.bookId}`)
				}
			})
			.catch((e) => console.log(e))
	}, [])

	const [isShowingModal, setIsShowingModal] = useState(false)
	const showModal = () => {
		setIsShowingModal(true)
		toggleTimer(false)
	}

	return (
		<div className='container'>
			<EndReadingSessionModal
				isShowingModal={isShowingModal}
				setIsShowingModal={setIsShowingModal}
				setTimerOn={setIsTimerOn}
				bookId={id}
				token={token}
			/>

			{book != null && (
				<div className='row justify-content-center text-center'>
					<div className='col-4 col-lg-4'>
						<img src={book.cover} alt='' className='img-fluid rounded w-100 border' />
					</div>

					<div className='col-12 col-lg-8 mt-5'>
						<div className='mb-5'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author}</h4>
						</div>

						<Timer time={readingSessionTime} />

						<div className='row justify-content-center mb-4 mt-4'>
							<div className='col-6 col-lg-4'>
								<Button variant='primary' className='w-100' onClick={showModal}>
									독서 끝내기
								</Button>
							</div>

							<div className='col-6 col-lg-4'>
								<Button variant={isTimerOn ? 'danger' : 'success'} className='w-100' onClick={toggleTimer}>
									{isTimerOn ? '잠시 정지' : '다시 시작'}
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
			)}
		</div>
	)
}

export default Reading
