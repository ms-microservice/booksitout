import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// Components
import Timer from './Timer'
import MemoCard from './MemoCard'
import QuotationCard from './QuotationCard'
import EndReadingSessionModal from './EndReadingSessionModal'
import PageProgressBar from '../common/PageProgressBar'
// Functions
import { getCurrentReadingSession } from '../../functions/reading'
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

	const [readingSessionId, setReadingSessionId] = useState(null)
	useEffect(() => {
		getCurrentReadingSession(id, setBook, toggleTimer, navigate, setReadingSessionId)
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
				bookId={id}
				toggleTimer={toggleTimer}
				readingSessionId={readingSessionId}
				setTime={setReadingSessionTime}
			/>

			{book != null && (
				<div className='row justify-content-center text-center'>
					<div className='col-12 col-lg-6 col-xl-4'>
						<img src={book.cover} alt='' className='img-fluid rounded w-100 border' />
					</div>

					<div className='col-12 col-lg-12 col-xl-8 mt-5 mb-5'>
						<div className='mb-5'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author}</h4>

							<div className='row justify-content-center'>
								<div className='col-9'>
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
