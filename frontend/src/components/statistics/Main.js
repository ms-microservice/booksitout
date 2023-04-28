import { useState, useEffect } from 'react'
import { Card, Alert, Button } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
import DateLineChart from './DateLineChart'
import SummaryTable from './SummaryTable'
import Goal from '../goal/Goal'
// Functions
import { getLastBook } from '../../functions/book'
import { getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'
import { getAlertMessage, getIsAlertShowing, updateAlertCloseTime } from '../../functions/alert'
import { giveUpBook } from '../../functions/book'
// Settings
import uiSettings from '../../settings/ui'
import messages from '../../settings/messages'

import '../../resources/css/mainReadChart.css'
import MainBookView from '../book/MainHorizontalBookView';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import MainLibraryCard from '../library/MainLibraryCard'

const Main = () => {
	const [loading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(getIsAlertShowing())

	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [goal, setGoal] = useState(null)
	const [statistics, setStatistics] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, uiSettings.initalFetchTime)

		Promise.all([
			getLastBook().then((book) => setLastBook(book)),
			getReadTime(7).then((readTime) => setReadTime(readTime)),
			getGoal(new Date().getFullYear()).then((res) => setGoal(res)),
			getStatisticsSummary(new Date().getFullYear()).then((stats) => setStatistics(stats)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [])

	const closeAlert = () => {
		setShowAlert(false)
		updateAlertCloseTime()
	}

	if (initialFetch) return <></>
	if (loading) return <Loading />

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<div className='row row-eq-height mb-5'>
				{showAlert && (
					<div className='container'>
						<Alert variant='success' dismissible onClose={() => closeAlert()}>
							{getAlertMessage()}
						</Alert>
					</div>
				)}

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<LastReadBook lastBook={lastBook} />
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<ReadingTimeChart readTime={readTime} />
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<SummaryChart statistics={statistics} />
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<GoalChart statistics={statistics} goal={goal} />
				</div>

				{/* <div className='col-12 col-md-6 col-xl-4 mb-4'>
					<MainLibraryCard/>
				</div> */}

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<IntroductionCard />
				</div>
			</div>
		</div>
	)
}

const LastReadBook = ({lastBook}) => { 
	const navigate = useNavigate()

	const handleGiveupBook = (bookId) => {
		const confirm = window.confirm('책을 포기할까요?')

		if (confirm) {
			giveUpBook(bookId).then((success) => {
				if (success) {
					toast.success('책을 포기했어요. 마음이 바뀌시면 언제든지 다시 시작하실 수 있어요!')
					navigate(`book/detail/${bookId}`)
				} else {
					toast.error('오류가 났어요 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Card>
			<Card.Body>
				<h3>마지막으로 읽은 책</h3>

				{lastBook == null ? (
					<NoContent message={messages.book.lastBook.noContent} />
				) : (
					<MainBookView
						book={lastBook}
						firstButton={
							<a href={`/reading/${lastBook.bookId}`} className='btn btn-book w-100'>
								이어서 읽기
							</a>
						}
						secondButton={
							<Button variant='book-danger' className='w-100' onClick={() => handleGiveupBook(lastBook.bookId)}>
								포기하기
							</Button>
						}
						link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook != null && lastBook.bookId}`}
					/>
				)}
			</Card.Body>
		</Card>
	)
}

const ReadingTimeChart = ({readTime}) => {
	return (
		<Card className='h-100'>
			<a href='/statistics' className='text-decoration-none text-black h-100'>
				<Card.Body className='h-100'>
					<h3>최근 1주일 독서시간</h3>

					{readTime == null ? (
						<Error message='오류가 났어요' />
					) : (
						<div className='h-100 w-100 d-flex align-items-center pe-0 pe-md-2 mt-5 mt-md-0 mb-4 mb-md-0' id='readTimeChart'>
							<DateLineChart startDate={new Date().setDate(new Date().getDate() - 7)} data={readTime} duration={7} />
						</div>
					)}
				</Card.Body>
			</a>
		</Card>
	)
}

const SummaryChart = ({statistics}) => {
	return (
		<Card className='h-100'>
			<Card.Body className='h-100 mb-4'>
				<a href='/statistics' className='text-decoration-none text-black h-100'>
					<h3>{new Date().getFullYear()}년 독서 요약</h3>

					{statistics == null ? (
						<Error message='오류가 났어요' />
					) : (
						<div className='h-100 d-flex align-items-center'>
							<SummaryTable statistics={statistics} />
						</div>
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

const GoalChart = ({statistics, goal}) => {
	return (
		<Card className='pb-xl-4 h-100'>
			<Card.Body>
				<a href='/goal' className='text-decoration-none text-black'>
					<h3>{new Date().getFullYear()}년 목표</h3>

					{statistics == null ? (
						<Error message='오류가 났어요' />
					) : (
						<div
							className='h-100 d-flex align-items-center justify-content-center mt-4 mt-md-0 pb-4 pb-md-0 pt-xl-5 pb-xl-5 pe-3 pe-md-4'
							style={{ position: 'relative', bottom: '20px' }}>
							<Goal goal={goal} />
						</div>
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

const IntroductionCard = () => {
	const introData = [
		{
			id: 1,
			title: '책잇아웃 간단한 소개',
			link: '/introduction',
		},
		{
			id: 2,
			title: '사용 가능한 모든 기능',
			link: '/introduction/features',
		},
	]

	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100'>
				<h3 className='mb-4'>책잇아웃 소개</h3>

			<div className="row">

				{introData.map((intro) => {
					return (
						<div className='col-12 col-md-6'>
							<Card className='mb-3'>
								<a href={intro.link} className='text-decoration-none text-black'>
									<Card.Body>
										<h5 className='text-center'>{intro.title}</h5>

										<Button variant='book' className='w-100'>
											보러 가기
										</Button>
									</Card.Body>
								</a>
							</Card>
						</div>
					)
				})}
			</div>
			</Card.Body>
		</Card>
	)
}

export default Main
