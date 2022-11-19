import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
// Icon
import { dummy } from '../resources/data/mainDummyData.js'
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
	const STATISTICS_SUMMARY_URL = `http://localhost/v1/`

	const [isLoading, setIsLoading] = useState(false)
	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [statistics, setStatistics] = useState(null)

	const uiData = [
		{
			id: 1,
			title: '마지막으로 읽은 책',
			element: lastBook === null ? <Error message='마지막으로 읽은 책이 없어요' /> : <HorizontalBookView book={lastBook} />,
		},
		{
			id: 2,
			title: '최근 2주간 독서시간',
			element:
				statistics == null ? (
					<Error message='독서시간을 불러올 수 없어요' />
				) : (
					<DateLineChart startDate={new Date().setDate(new Date().getDate() - 14)} data={readTime} />
				),
		},
		{
			id: 3,
			title: '2022년 목표',
			element: statistics === null ? <Error message='목표를 불러올 수 없어요' /> : <Goal goal={dummy.goal} />,
		},
		{
			id: 4,
			title: '2022년 독서 요약',
			element: statistics === null ? <Error message='통계를 불러올 수 없어요' /> : <SummaryTable statistics={statistics} />,
		},
	]

	const fetchFromApi = ({ url, token, setData }) => {
		fetch(url, {
			methods: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				console.log(res)
				return res.json()
			})
			.then((data) => {
				console.log(data)

				if (data.status.toString().startsWith(2)) {
					setData(data)
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	useEffect(() => {
		Promise.all([
			fetchFromApi(LAST_BOOK_API_URL, props.token, setLastBook),
			fetchFromApi(READ_TIME_API_URL, props.token, setReadTime),
			// fetchFromApi(STATISTICS_SUMMARY_URL, props.token, setStatistics),
		]).finally(() => {
			setIsLoading(false)
		})
	}, [])

	return (
		<Container>
			{isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height'>
					{uiData.map((ui) => {
						return (
							<div className='col-lg-12 col-xl-6 mb-4'>
								<CardWithTitle title={ui.title} element={ui.element} />
							</div>
						)
					})}
				</div>
			)}
		</Container>
	)
}

const CardWithTitle = ({ title, element }) => {
	return (
		<Card className='h-100'>
			<Card.Body>
				<h3>{title}</h3>

				{element}
			</Card.Body>
		</Card>
	)
}

export default Main
