import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import DateLineChart from './DateLineChart'
import LanguageTable from './LanguageTable'

const Statistics = ({ token }) => {
	const [readTimeDuration, setReadTimeDuration] = useState(29)
	const READTIME_API_URL = `http://localhost/v1/statistics/read-time/${readTimeDuration}`

	const [readTimeList, setReadTimeList] = useState(null)
	const [languageData, setLanguageData] = useState([
		{
			id: 1,
			title: 'KOREAN',
			done: 15,
			notDone: 12,
		},
		{
			id: 2,
			title: 'ENGLISH',
			done: 15,
			notDone: 12,
		},
		{
			id: 3,
			title: 'JAPANESE',
			done: 15,
			notDone: 12,
		},
		{
			id: 4,
			title: 'CHINESE',
			done: 15,
			notDone: 12,
		},
		{
			id: 5,
			title: 'FRENCH',
			done: 0,
			notDone: 0,
		},
	])

	useEffect(() => {
		fetch(READTIME_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => res.json())
			.then((readTime) => setReadTimeList(readTime.timeSeriesData))
	}, [])

	return (
		<div className='container'>
			<div className='row row-eq-height'>
				<div className='col-12 col-lg-6 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h3>최근 30일 독서시간</h3>
							<DateLineChart startDate={new Date().setDate(new Date().getDate() - 30)} data={readTimeList} duration={30} />
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h3>매년 독서현황</h3>
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
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-4'>
					<a href='/statistics/goal' className='text-decoration-none text-black'>
						<Card className='h-100'>
							<Card.Body>
								<h3>목표 달성 현황</h3>
							</Card.Body>
						</Card>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Statistics
