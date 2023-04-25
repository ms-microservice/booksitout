import React, { useState, useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
// Components
import Error from '../common/Error'
import Loading from '../common/Loading'

import CategoryTable from './CategoryTable'
import LanguageTable from './LanguageTable'
import SummaryTable from './SummaryTable'
import DateLineChart from './DateLineChart'
import GoalView from './goal/GoalView'
// Functions
import { getCategoryStatistics, getLangaugeStatistics, getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'

const Statistics = () => {
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

	return (
		<div className='container'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height'>
					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h3>최근 30일 독서시간</h3>

								<div className='row h-100 w-100' id='readTimeChart'>
									<DateLineChart startDate={new Date().setDate(new Date().getDate() - 30)} data={readTimeList} duration={30} />
								</div>
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<div className='row'>
									<div className='col-6'>
										<h3>매년 독서현황</h3>
									</div>

									<div className='col-6'>
										<Form>
											<Form.Select onChange={(e) => setStatisticsSelectedYear(e.target.value)}>
												{Array.from(
													{ length: new Date().getFullYear() - localStorage.getItem('register-year') + 1 },
													(_, i) => i + Number(localStorage.getItem('register-year'))
												)
													.reverse()
													.map((year) => {
														return <option value={year}>{`${year}년`}</option>
													})}
											</Form.Select>
										</Form>
									</div>

									{isStatisticsLoading ? (
										<div className='col-12 mt-5 w-100'>
											<Loading textSize='h2' />
										</div>
									) : statisticsData == null ? (
										<Error />
									) : (
										<div className='mt-3'>
											<SummaryTable statistics={statisticsData} />
										</div>
									)}
								</div>
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h3>언어별 독서현황</h3>

								<LanguageTable languageData={languageData} />
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h3>장르별 독서현황</h3>

								<CategoryTable categoryData={categoryData} />
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<a href='/statistics/goal' className='text-decoration-none text-black'>
							<Card className='h-100'>
								<Card.Body>
									<div className='row'>
										<h3>목표 달성 현황</h3>
									</div>

									<div className='mt-5 mb-5'>
										<GoalView goal={goalData} />
									</div>
								</Card.Body>
							</Card>
						</a>
					</div>
				</div>
			)}
		</div>
	)
}

export default Statistics
