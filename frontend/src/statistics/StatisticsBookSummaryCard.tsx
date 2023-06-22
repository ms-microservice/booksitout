import React from 'react'
import { Card } from 'react-bootstrap'
import styled from 'styled-components';
import CardTitle from '../common/CardTitle';
import booksitoutIcon from '../common/icons/booksitoutIcon';
import Error from '../common/Error';

const StatisticsBookSummaryCard = () => {
    return (
		<CardContainer>
			<Card.Body>
				<CardTitle icon={<booksitoutIcon.book />} title={'내 독서 현황'} />

				<Error />
			</Card.Body>
		</CardContainer>
	)
}

const CardContainer = styled(Card).attrs({})`
	height: 100%;
	min-height: 900px;
`

export default StatisticsBookSummaryCard