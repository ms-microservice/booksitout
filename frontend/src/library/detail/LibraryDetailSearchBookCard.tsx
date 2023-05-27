import React from 'react'
import CardTitle from '../../common/CardTitle'
import { Card } from 'react-bootstrap'
import Preparing from '../../components/common/Preparing'

const LibraryDetailSearchBookCard = ({library}) => {
    return (
		<Card style={{ minHeight: '800px' }}>
			<Card.Body>
				<CardTitle size='h2' icon={undefined} title='책 검색하기' subTitle={`${library.name}에서 책을 검색할 수 있어요`} />

				<Preparing message='아직 개발중이에요' mt='300px'/>
			</Card.Body>
		</Card>
	)
}

export default LibraryDetailSearchBookCard