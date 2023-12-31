import { Card } from 'react-bootstrap'

import Error from '../common/Error'
import DateLineChart from '../statistics/DateLineChart'
import CardTitle from '../common/CardTitle'
import { BsGraphUp as GraphIcon } from 'react-icons/bs'
import DateLineChartPlaceholder from '../statistics/DateLineChartPlaceholder'

const MainReadingTimeCard = ({readTime}) => {
	return (
		<Card className='h-100' style={{ minHeight: '200px' }}>
			<Card.Body className='h-100'>
				<a href='/statistics' className='text-black'>
					<CardTitle icon={<GraphIcon />} title='최근 1주일 독서시간' iconSize={2} />

					{readTime === undefined ? (
						<Error />
					) : readTime == null ? (
						<div className='h-100 w-100 d-flex align-items-center pe-0 pe-md-2 mt-4 mt-md-0 mb-4 mb-md-0' id='readTimeChart'>
							<DateLineChartPlaceholder startDate={new Date().setDate(new Date().getDate() - 7)} duration={7} />
						</div>
					) : (
						<div className='h-100 w-100 d-flex align-items-center pe-0 pe-md-2 mt-4 mt-md-0 mb-4 mb-md-0' id='readTimeChart'>
							<DateLineChart startDate={new Date().setDate(new Date().getDate() - 7)} data={readTime} duration={7} />
						</div>
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainReadingTimeCard