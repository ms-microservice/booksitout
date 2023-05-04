import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import SummaryTable from '../statistics/SummaryTable'
import Error from '../common/Error';

const MainSummaryStatisticsCard = ({ statistics }) => {
	const [initialFetch, setInitialFetch] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100'>
				<a href='/statistics' className='text-decoration-none text-black h-100'>
					<h3>{new Date().getFullYear()}년 독서 요약</h3>

					{statistics != null ? (
						<div className='h-100 d-flex align-items-center'>
							<SummaryTable statistics={statistics} />
						</div>
					) : initialFetch ? (
						<></>
					) : (
						<Error message='오류가 났어요' />
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainSummaryStatisticsCard
