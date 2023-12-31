import { Card } from 'react-bootstrap'
import SummaryTable from '../statistics/SummaryTable'
import Error from '../common/Error';
import CardTitle from '../common/CardTitle';
import { BsFileEarmarkBarGraphFill as StatisticsIcon } from 'react-icons/bs'

const MainSummaryStatisticsCard = ({ statistics, loading }) => {
	const currentYear = new Date().getFullYear()

	return (
		<Card className='h-100' style={{ minHeight: '380px' }}>
			<Card.Body className='h-100'>
				<a href='/statistics' className='text-decoration-none text-black h-100'>
					<CardTitle icon={<StatisticsIcon />} title={`${currentYear}년 독서 요약`} iconSize={2} />

					{statistics === undefined ? (
						<Error move={75} />
					) : (
						<div className='h-100 '>
							<div className='d-flex align-items-center' style={{ marginBottom: '10px' }}>
								<SummaryTable statistics={statistics} loading={loading || statistics == null} />
							</div>
						</div>
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainSummaryStatisticsCard
