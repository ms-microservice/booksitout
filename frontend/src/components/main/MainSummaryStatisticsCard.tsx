import { Card } from 'react-bootstrap'
import SummaryTable from '../statistics/SummaryTable'
import Error from '../common/Error';
import CardTitle from '../../common/CardTitle';
import { BsFileEarmarkBarGraphFill as StatisticsIcon } from 'react-icons/bs'

const MainSummaryStatisticsCard = ({ statistics, loading }) => {
	const currentYear = new Date().getFullYear()

	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100'>
				<a href='/statistics' className='text-decoration-none text-black h-100'>
					<CardTitle icon={<StatisticsIcon />} title={`${currentYear}년 독서 요약`} subTitle={undefined} iconSize='h2'/>

					{statistics == null && statistics !== undefined ? (
						<Error message='오류가 났어요' mb='75px' />
					) : (
						<div className='h-100 '>
							<div className='d-flex align-items-center' style={{ marginTop: '40px', marginBottom: '10px' }}>
								<SummaryTable statistics={statistics} loading={loading} />
							</div>
						</div>
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainSummaryStatisticsCard
