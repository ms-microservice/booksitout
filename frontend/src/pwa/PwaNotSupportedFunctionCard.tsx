import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import CardTitle from '../common/CardTitle'
import booksitoutIcon from '../common/icons/booksitoutIcon';

const PwaNotSupportedFunctionCard = () => {
    const notSupportedFunctionList = ['도서관 회원증 Apple Wallet에 추가']

    return (
		<Card style={{ minHeight: '400px' }}>
			<Card.Body>
				<CardTitle icon={<booksitoutIcon.notSupported />} title={`지원되지 않는 기능 (총 ${notSupportedFunctionList.length}개)`} />

				<div className='ps-4'>
					<ListGroup>
						{notSupportedFunctionList.map((notSupported) => {
							return <ListGroup.Item>{notSupported}</ListGroup.Item>
						})}
					</ListGroup>
				</div>
			</Card.Body>
		</Card>
	)
}

export default PwaNotSupportedFunctionCard
