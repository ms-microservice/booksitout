import React from 'react'
import { Card, Form } from 'react-bootstrap'
import Error from '../../common/Error'
import SummaryTable from '../SummaryTable'
import { getStatisticsSummary } from '../../functions/statistics'
import { BsFillCalendarDateFill as DateIcon } from 'react-icons/bs'
import CardTitle from '../../common/CardTitle'

const SummaryTableAllCard = () => {
	const [statisticsData, setStatisticsData] = React.useState(null)
	const [statisticsSelectedYear, setStatisticsSelectedYear] = React.useState(new Date().getFullYear())
	const [isStatisticsLoading, setIsStatisticsLoading] = React.useState(true)

    React.useEffect(() => {
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
			.then((stats) => setStatisticsData(stats.data))
			.finally(() => (isSecondPassed ? setIsStatisticsLoading(false) : (isLoadingDone = true)))
	}, [statisticsSelectedYear])

	return (
		<Card className="h-100">
			<Card.Body>
				<div className="row h-100">
					<div className="col-7">
						<CardTitle icon={<DateIcon />} title={'매년 독서현황'} />
					</div>

					<div className="col-5">
						<Form>
							<Form.Select onChange={e => setStatisticsSelectedYear(Number(e.target.value))}>
								{Array.from(
									{ length: new Date().getFullYear() - (new Date().getFullYear() - 5) + 1 },
									(_, i) => i + new Date().getFullYear() - 5,
								)
									.reverse()
									.map(year => {
										return <option value={year}>{`${year}년`}</option>
									})}
							</Form.Select>
						</Form>
					</div>

					<div className="mt-2" style={{ minHeight: '320px' }}>
						{isStatisticsLoading ? (
							<SummaryTable statistics={statisticsData} loading={true} />
						) : statisticsData == null ? (
							<Error mt={35} />
						) : (
							<SummaryTable statistics={statisticsData} loading={false} />
						)}
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default SummaryTableAllCard