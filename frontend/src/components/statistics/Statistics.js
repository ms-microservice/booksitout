import React, { useState, useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
// Components
import Error from '../common/Error'
import Loading from '../common/Loading'

import CategoryTable from './CategoryTable'
import LanguageTable from './LanguageTable'
import SummaryTable from './SummaryTable'
import DateLineChart from './DateLineChart'
// Functions
import { getCategoryStatistics, getLangaugeStatistics, getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'

import '../../resources/css/statistics.css'
import StatisticsBoarding from '../info/StatisticsBoarding'
import { useSelector } from 'react-redux'

const Statistics = () => {
	const isLogin = useSelector((state) => state.user.isLogin)

	const [initialFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	const [readTimeList, setReadTimeList] = useState(null)
	const [statisticsData, setStatisticsData] = useState(null)
	const [languageData, setLanguageData] = useState(null)
	const [categoryData, setCategoryData] = useState(null)
	const [goalData, setGoalData] = useState(null)

	const [statisticsSelectedYear, setStatisticsSelectedYear] = useState(new Date().getFullYear())
	const [isStatisticsLoading, setIsStatisticsLoading] = useState(false)

	useEffect(() => {
		document.title = '통계 | 책잇아웃'
		setTimeout(() => {
			setInitialFetch(false)
		}, 3000)

		Promise.all([
			getReadTime(30).then((readTime) => setReadTimeList(readTime)),
			getStatisticsSummary(new Date().getFullYear()).then((stats) => setStatisticsData(stats)),
			getLangaugeStatistics().then((languageStats) => setLanguageData(languageStats)),
			getCategoryStatistics().then((categoryStats) => setCategoryData(categoryStats)),
			getGoal(new Date().getFullYear()).then((goal) => setGoalData(goal)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
			setIsStatisticsLoading(false)
		})
	}, [])

	useEffect(() => {
		if (initialFetch) return

		setIsStatisticsLoading(true)

		let isSecondPassed = false
		let isLoadingDone = false
		setTimeout(() => {
			isSecondPassed = true
			if (isLoadingDone) {
				setIsStatisticsLoading(false)
			}
		}, 500)

		getStatisticsSummary(statisticsSelectedYear)
			.then((stats) => setStatisticsData(stats))
			.then(() => {
				if (isSecondPassed) {
					setIsStatisticsLoading(false)
				} else {
					isLoadingDone = true
				}
			})
	}, [statisticsSelectedYear])

	if (!isLogin) return <StatisticsBoarding />
	if (initialFetch) return <></>
	if (isLoading) return <Loading/>

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<div className='row row-eq-height'>
				<div className='col-12 col-md-6 col-xl-4 mb-4 '>
					<Card className='h-100'>
						<Card.Body className='h-100'>
							<h3>최근 30일 독서시간</h3>

							<div className='row h-100 w-100 pt-2 pb-2' id='readTimeChart'>
								<DateLineChart startDate={new Date().setDate(new Date().getDate() - 30)} data={readTimeList} duration={30} />
							</div>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4 '>
					<Card className='h-100'>
						<Card.Body>
							<div className='row h-100'>
								<div className='col-6'>
									<h3>매년 독서현황</h3>
								</div>

								<div className='col-6'>
									<Form>
										<Form.Select onChange={(e) => setStatisticsSelectedYear(e.target.value)}>
											{
												// Array.from(
												// 	{ length: new Date().getFullYear() - localStorage.getItem('register-year') + 1 },
												// 	(_, i) => i + Number(localStorage.getItem('register-year'))
												// )
												Array.from(
													{ length: new Date().getFullYear() - (new Date().getFullYear() - 5) + 1 },
													(_, i) => i + new Date().getFullYear() - 5
												)
													.reverse()
													.map((year) => {
														return <option value={year}>{`${year}년`}</option>
													})
											}
										</Form.Select>
									</Form>
								</div>

								<div className='mt-2'>
									{isStatisticsLoading ? (
										<div className='col-12 w-100'>
											<Loading textSize='h2' mt='74.5px' mb='74.5px' />
										</div>
									) : statisticsData == null ? (
										<Error />
									) : (
										<div className='mt-3'>
											<SummaryTable statistics={statisticsData} />
										</div>
									)}
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h3>언어별 독서현황</h3>

							<LanguageTable languageData={languageData} />
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h3>장르별 독서현황</h3>

							<CategoryTable categoryData={categoryData} />
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Statistics
