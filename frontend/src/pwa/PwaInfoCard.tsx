import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../common/CardTitle'
import booksitoutIcon from '../common/icons/booksitoutIcon';

const PwaInfoCard = () => {
    return (
		<Card style={{ minHeight: '400px' }}>
			<Card.Body>
				<CardTitle icon={<booksitoutIcon.info />} title={'앱으로 추가하기에 관한 정보'} />
			</Card.Body>
		</Card>
	)
}

export default PwaInfoCard