import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Alert } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import HorizontalBookView from '../book/HorizontalBookView'
import DateLineChart from './DateLineChart'
import SummaryTable from './SummaryTable'
import GoalView from './GoalView'
import NoContent from '../common/NoContent'
// Functions
import { getLastBook } from '../../functions/book'
import { getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'
// Settings
import { INITIAL_FETCH_TIME } from '../../settings/settings'

const Main = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(true)

	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [goal, setGoal] = useState(null)
	const [statistics, setStatistics] = useState(null)

	const cardData = [
		{
			id: 1,
			title: '마지막으로 읽은 책',
			element: lastBook != null && (
				<HorizontalBookView
					book={lastBook}
					secondButton={
						<a href='/book/all' className='btn btn-warning w-100'>
							다른 책 읽기
						</a>
					}
				/>
			),
			data: lastBook,
			error: <NoContent message='마지막으로 읽은 책이 없어요' />,
			url: lastBook == null ? `/book/not-done` : `/book/detail/${lastBook != null && lastBook.bookId}`,
		},
		{
			id: 2,
			title: '최근 2주간 독서시간',
			element: readTime != null && <DateLineChart startDate={new Date().setDate(new Date().getDate() - 14)} data={readTime} />,
			data: readTime,
			message: '오류가 났어요',
			url: '/statistics',
		},
		{
			id: 3,
			title: '2022년 목표',
			element: statistics != null && <GoalView goal={goal} />,
			data: statistics,
			error: <Error message='오류가 났어요' />,
			url: '/statistics/goal',
		},
		{
			id: 4,
			title: '2022년 독서 요약',
			element: statistics != null && <SummaryTable statistics={statistics} />,
			data: statistics,
			error: <Error message='오류가 났어요' />,
			url: '/statistics',
		},
	]

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, INITIAL_FETCH_TIME)

		Promise.all([
			getLastBook().then((book) => setLastBook(book)),
			getReadTime(14).then((readTime) => setReadTime(readTime)),
			getGoal(new Date().getFullYear()).then((res) => setGoal(res)),
			getStatisticsSummary().then((stats) => setStatistics(stats)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [])

	return (
		<div className='container'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height'>
					<div className='container'>
						{showAlert && (
							<Alert variant='success' dismissible onClose={() => setShowAlert(false)}>
								{`어서오세요, ${localStorage.getItem('user-name')}님! 오늘도 마음의 양식을 섭취하러 오셨군요 😉`}
							</Alert>
						)}
					</div>

					{cardData.map((ui) => {
						return (
							<div className='col-lg-12 col-xl-6 mb-4'>
								<CardWithTitle title={ui.title} element={ui.data == null ? ui.error : ui.element} url={ui.url} />
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

const CardWithTitle = ({ title, element, url }) => {
	return (
		<Link to={url} className='text-decoration-none text-black'>
			<Card className='h-100'>
				<Card.Body>
					<h3>{title}</h3>

					{element}
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Main
