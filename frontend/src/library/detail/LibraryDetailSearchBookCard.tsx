import React from 'react'
import CardTitle from '../../common/CardTitle'
import { Card } from 'react-bootstrap'
import Preparing from '../../components/common/Preparing'
import { VscSearch as SearchIcon } from 'react-icons/vsc'

const LibraryDetailSearchBookCard = ({library}) => {
    return (
		<Card style={{ minHeight: '500px' }}>
			<Card.Body>
				<CardTitle icon={<SearchIcon />} title='책 검색하기' subTitle={`${library.name}에서 책을 검색할 수 있어요`} textSize={2} />

				<Preparing message='아직 준비중이에요' mt='125px' />
			</Card.Body>
		</Card>
	)
}

export default LibraryDetailSearchBookCard