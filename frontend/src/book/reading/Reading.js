import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// Components
import Timer from './Timer'
import BookRecordCard from './BookRecordCard'
import EndReadingSessionModal from './EndReadingSessionModal'
import ProgressBar from '../../common/ProgressBar'

const Reading = ({ token, readingSessionTime }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const READING_SESSION_API_URL = `http://localhost/v1/reading-session/${id}`
	const READING_SESSION_CURRENT_API_URL = `http://localhost/v1/reading-session/current`
	const MEMO_API_URL = `http://localhost/v1/memo/${id}`
	const QUOTE_API_URL = `http://localhost/v1/quote/${id}`

	const [book, setBook] = useState(null)
	const [memoList, setMemoList] = useState(null)
	const [quoteList, setQuoteList] = useState(null)

	const TIMER_ON_KEY = `timer-on`
	const [isTimerOn, setIsTimerOn] = useState(localStorage.getItem(TIMER_ON_KEY) === 'true')

	const toggleTimer = (e, state = !(localStorage.getItem(TIMER_ON_KEY) === 'true')) => {
		setIsTimerOn(state === true)
		localStorage.setItem(TIMER_ON_KEY, state)
	}

	useEffect(() => {
		fetch(READING_SESSION_CURRENT_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then(async (res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				}
				return res.json()
			})
			.then((readingSession) => {
				// POST new ReadingSession
				if (readingSession.book.bookId == id) {
					setBook(readingSession.book)
				} else {
					alert('진행중인 독서활동이 있어요')
					navigate(`/reading/${readingSession.book.bookId}`)
				}
			})
			.catch((readingSession) => {})

		// fetch(READING_SESSION_API_URL, {
		// 	method: 'POST',
		// 	headers: { Authorization: token },
		// })
		// 	.then((res) => {
		// 		if (res.status.toString().startsWith(2)) {
		// 			return res.json()
		// 		}

		// 		throw new Error(res.json())
		// 	})
		// 	.then((readingSession) => {
		// 		if (readingSession.book.bookId == id) {
		// 			toggleTimer(true)
		// 			setBook(readingSession.book)
		// 		}
		// 	})
		// 	.catch((res) => {
		// 		alert('진행중인 독서활동이 있어요 ')
		// 		navigate(`/reading/${res.json().bookId}`)
		// 	})
	}, [])

	const [isShowingModal, setIsShowingModal] = useState(false)
	const showModal = () => {
		setIsShowingModal(true)
		toggleTimer(false)
	}

	return (
		<div className='container'>
			<EndReadingSessionModal isShowingModal={isShowingModal} setIsShowingModal={setIsShowingModal} bookId={id} token={token} />

			{book != null && (
				<div className='row justify-content-center text-center'>
					<div className='col-4 col-lg-4'>
						<img src={book.cover} alt='' className='img-fluid rounded w-100 border' />
					</div>

					<div className='col-12 col-lg-8 mt-5'>
						<div className='mb-5'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author}</h4>

							<div className='row justify-content-center'>
								<div className='col-9'>
									<ProgressBar book={book} />
								</div>
							</div>
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
