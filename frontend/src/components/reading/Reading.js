import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import Timer from './Timer'
import MemoCard from './MemoCard'
import QuotationCard from './QuotationCard'
import EndReadingSessionModal from './EndReadingSessionModal'
import PageProgressBar from '../common/PageProgressBar'
// Functions
import { getBookOfCurrentReadingSession, getCurrentReadingSession, startReadingSession } from '../../functions/reading'
import { getIsTimerOn, turnOffTimer, turnOnTimer } from '../../functions/timer'

const Reading = ({ readingSessionTime, setReadingSessionTime }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [book, setBook] = useState(null)

	const [isTimerOn, setIsTimerOn] = useState(getIsTimerOn())
	const toggleTimer = (state = !getIsTimerOn()) => {
		if (state) {
			setIsTimerOn(true)
			turnOnTimer()
		} else {
			setIsTimerOn(false)
			turnOffTimer()
		}
	}

	useEffect(() => {
		getBookOfCurrentReadingSession().then((book) => {
			if (book == null) {
				// Start Reading Session
				startReadingSession(id).then((res) => {
					if (res[0]) {
						toggleTimer(true)
						setBook(res[1])
					} else {
						toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
					}
				})
			} else {
				if (id != book.bookId) {
					toast.error('진행중인 독서활동이 있어요')
					navigate(`/reading/${book.bookId}`)
				}
				setBook(book)
			}
		})

		// getCurrentReadingSession(id, setBook, toggleTimer, navigate, setReadingSessionId)
	}, [])

	const [isShowingModal, setIsShowingModal] = useState(false)
	const showModal = () => {
		setIsShowingModal(true)
		toggleTimer(false)
	}

	return (
		<div className='container' style={{ marginBottom: '100px' }}>
			<EndReadingSessionModal
				isShowingModal={isShowingModal}
				setIsShowingModal={setIsShowingModal}
				toggleTimer={toggleTimer}
				setTime={setReadingSessionTime}
				book={book}
			/>

			{book != null && (
				<div className='row justify-content-center text-center'>
					<div className='col-8 col-lg-6 col-xl-4'>
						<img src={book.cover} alt='' className='img-fluid rounded w-100 border' />
					</div>

					<div className='col-12 col-lg-12 col-xl-8 mt-5 mb-5'>
						<div className='mb-5'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author}</h4>

							<div className='row justify-content-center'>
								<div className='col-11 col-md-9'>
									<PageProgressBar book={book} />
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
								<Button variant={isTimerOn ? 'danger' : 'success'} className='w-100' onClick={() => toggleTimer(!isTimerOn)}>
									{isTimerOn ? '잠시 정지' : '다시 시작'}
								</Button>
							</div>
						</div>

						<div className='row justify-content-center mb-4'>
							<div className='col-12 col-lg-10 mt-3'>
								<MemoCard bookId={id} currentPage={book.currentPage} />
							</div>

							<div className='col-12 col-lg-10 mt-3'>
								<QuotationCard bookId={id} currentPage={book.currentPage} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Reading
