import React, { useState, useEffect } from 'react'
import { Card, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import HorizontalBookView from '../book/HorizontalBookView'
import DateLineChart from './DateLineChart'
import SummaryTable from './SummaryTable'
import Goal from './Goal'

const Main = (props) => {
	const LAST_BOOK_API_URL = `http://localhost/v1/book/last`
	const READ_TIME_API_URL = `http://localhost/v1/statistics/read-time/14`
	const STATISTICS_SUMMARY_URL = `http://localhost/v1/statistics/year/2022`

	const [isLoading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(true)

	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [statistics, setStatistics] = useState(null)

	const uiData = [
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
			message: '마지막으로 읽은 책이 없어요',
			url: `/book/detail/${lastBook != null && lastBook.bookId}`,
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
			element: statistics != null && <Goal goal={{ current: statistics.yearly.totalReadBookCount, goal: statistics.goal }} />,
			data: statistics,
			message: '오류가 났어요',
			url: '/statistics/goal',
		},
		{
			id: 4,
			title: '2022년 독서 요약',
			element: statistics != null && <SummaryTable statistics={statistics} />,
			data: statistics,
			message: '오류가 났어요',
			url: '/statistics',
		},
	]

	const fetchFromApi = (url, setData) => {
		fetch(url, {
			methods: 'GET',
			headers: { Authorization: props.token, 'Content-Type': 'application/json' },
		})
			.then((res) => {
				if (!res.status.toString().startsWith(2)) {
					return
				}
				return res.json()
			})
			.then((data) => setData(data))
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		Promise.all([
			fetchFromApi(LAST_BOOK_API_URL, (data) => setLastBook(data)),
			fetchFromApi(READ_TIME_API_URL, (data) => data.status.toString().startsWith(2) && setReadTime(data.timeSeriesData)),
			fetchFromApi(STATISTICS_SUMMARY_URL, (data) => data.status.toString().startsWith(2) && setStatistics(data)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [])

	return (
		<Container>
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

					{uiData.map((ui) => {
						return (
							<div className='col-lg-12 col-xl-6 mb-4'>
								{ui.data == null ? (
									<CardWithTitle title={ui.title} element={<Error message={ui.message} />} />
								) : (
									<CardWithTitle title={ui.title} element={ui.element} url={ui.url} />
								)}
							</div>
						)
					})}
				</div>
			)}
		</Container>
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
