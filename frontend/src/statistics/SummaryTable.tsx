import timeIcon from '../resources/images/statistics/time.png'
import averageIcon from '../resources/images/statistics/simple-chart.png'
import bookIcon from '../resources/images/statistics/book-overlap.png'
import starIcon from '../resources/images/statistics/star.png'
import longestDayIcon from '../resources/images/statistics/bookworm.png'
import pageIcon from '../resources/images/statistics/page.png'
import { Card, Placeholder } from 'react-bootstrap'
import utils from '../functions/utils'

const SummaryTable = ({ statistics, loading = false  }) => {
	const statisticsData = [
		{
			id: 1,
			icon: timeIcon,
			name: '총 독서시간',
			value: (statistics) =>
				`${statistics.yearStatistics.totalReadTime != null && Math.round(statistics.yearStatistics.totalReadTime / 60)}시간`,
		},
		{
			id: 2,
			icon: averageIcon,
			name: '하루 평균',
			value: (statistics) => `${statistics.dayStatistics.averageReadTime != null && statistics.dayStatistics.averageReadTime}분`,
		},
		{
			id: 3,
			icon: bookIcon,
			name: '읽은 책',
			value: (statistics) => `${statistics.yearStatistics.totalReadBookCount != null && statistics.yearStatistics.totalReadBookCount}권`,
		},
		{
			id: 4,
			icon: starIcon,
			name: '평균별점',
			value: (statistics) => `${statistics.yearStatistics.averageStar != null && statistics.yearStatistics.averageStar.toFixed(1)}점`,
		},
		{
			id: 2,
			icon: longestDayIcon,
			name: '최대 독서 시간',
			value: (statistics) => `${statistics.dayStatistics.mostReadTime != null && statistics.dayStatistics.mostReadTime}분`,
		},
		{
			id: 2,
			icon: pageIcon,
			name: '총 읽은 페이지',
			value: (statistics) =>
				`${statistics.yearStatistics.totalReadPage != null && utils.insertCommas(statistics.yearStatistics.totalReadPage)}`,
		},
	]

	return (
		<table className='table table-hover'>
			<tbody>
				{statisticsData.map((stat) => {
					return (
						<tr>
							<th className='col-8 h5'>
								<img className='img-fluid me-3 force-1-line' src={stat.icon} alt='' style={{ width: '30px', height: '30px' }} />
								{stat.name}
							</th>

							<td className='col-4'>
								<h5>
									{loading ? (
										<Placeholder as={Card.Text} animation='wave'>
											<Placeholder xs='6' />
										</Placeholder>
									) : (
										stat.value(statistics)
									)}
								</h5>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default SummaryTable
