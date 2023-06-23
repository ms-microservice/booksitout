import React from 'react'
import { Card } from 'react-bootstrap'
import styled from 'styled-components';
import CardTitle from '../common/CardTitle';
import booksitoutIcon from '../common/icons/booksitoutIcon';
import StatisticsInfoCard from './CurrentlyReadingCard';
import YearDoneCard from './YearDoneCard';
import { booksitoutServer } from '../functions/axios';

const StatisticsBookSummaryCard = () => {
	const [consecutiveReading, setConsecutiveReading] = React.useState(0)
	const [currentReading, setCurrentReading] = React.useState(0)
	React.useEffect(() => {
		booksitoutServer.get(`v5/statistics/current`).then(res => {
			setConsecutiveReading(res.data.consecutiveReading)
			setCurrentReading(res.data.currentReading)
		})
	}, [])

    return (
		<CardContainer>
			<Card.Body>
				<CardTitle icon={<booksitoutIcon.book />} title={'내 독서 현황'} />

				<div className="row">
					<div className="col-12 col-md-6 mb-2">
						<StatisticsInfoCard
							icon={<booksitoutIcon.currentReading />}
							count={currentReading}
							textFront={'지금 책잇아웃에서'}
							textBack={'명이 책을 읽고 있어요'}
						/>
					</div>

					<div className="col-12 col-md-6 mb-2">
						<StatisticsInfoCard
							icon={<booksitoutIcon.consecutive />}
							textFront={''}
							count={consecutiveReading}
							textBack={'일 연속으로 책을 읽고 있어요!'}
						/>
					</div>
				</div>

				<div className="mt-3" />
				<YearDoneCard />
			</Card.Body>
		</CardContainer>
	)
}

const CardContainer = styled(Card).attrs({})`
	height: 100%;
	min-height: 900px;
`

export default StatisticsBookSummaryCard