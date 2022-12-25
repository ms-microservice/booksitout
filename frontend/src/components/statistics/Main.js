import React, { useState, useEffect } from 'react'
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
	const getDateDifferenceInDays = (date1, date2) => {
		const differenceInTime = Math.abs(date2 - date1)
		const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24)
		return differenceInDays
	}

	const [isLoading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(getDateDifferenceInDays(new Date(), new Date(localStorage.getItem('main-alert'))) < 1 ? false : true)

	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [goal, setGoal] = useState(null)
	const [statistics, setStatistics] = useState(null)

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

	const closeAlert = () => {
		setShowAlert(false)
		localStorage.setItem('main-alert', new Date())
	}

	const componentList = [
		<Card>
			<Card.Body>
				<h3>마지막으로 읽은 책</h3>

				{lastBook == null ? (
					<NoContent message='마지막으로 읽은 책이 없어요' />
				) : (
					<HorizontalBookView
						book={lastBook}
						secondButton={
							<a href='/book/all' className='btn btn-warning w-100'>
								다른 책 읽기
							</a>
						}
						link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook != null && lastBook.bookId}`}
					/>
				)}
			</Card.Body>
		</Card>,
		<Card className='h-100'>
			<Card.Body>
				<h3>최근 2주간 독서시간</h3>

				{readTime == null ? (
					<Error message='오류가 났어요' />
				) : (
					<a href='/statistics'>
						<DateLineChart startDate={new Date().setDate(new Date().getDate() - 14)} data={readTime} />
					</a>
				)}
			</Card.Body>
		</Card>,
		<Card className='h-100'>
			<Card.Body>
				<a href='/statistics/goal' className='text-decoration-none text-black'>
					<h3>2022년 목표</h3>

					{statistics != null && <GoalView goal={goal} />}
				</a>
			</Card.Body>
		</Card>,
		<Card>
			<Card.Body>
				<a href='/statistics' className='text-decoration-none text-black'>
					<h4>2022년 독서 요약</h4>

					{statistics == null ? <Error message='오류가 났어요' /> : <SummaryTable statistics={statistics} />}
				</a>
			</Card.Body>
		</Card>,
	]

	return (
		<div className='container'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height mt-5 mb-5'>
					{showAlert && (
						<div className='container'>
							<Alert variant='success' dismissible onClose={() => closeAlert()}>
								{`어서오세요, ${localStorage.getItem('user-name')}님! 오늘도 마음의 양식을 섭취하러 오셨군요 😉`}
							</Alert>
						</div>
					)}

					{componentList.map((component) => {
						return <div className='col-12 col-md-6 mb-4'>{component}</div>
					})}
				</div>
			)}
		</div>
	)
}

export default Main
