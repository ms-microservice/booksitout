import React from 'react'
import { useParams } from 'react-router-dom'
import BookList from './book-list/BookList'
import RouteTitle from '../common/RouteTitle'
import { BsBookHalf as BookIcon } from 'react-icons/bs'
import RouteContainer from '../common/RouteContainer'
import BookListRangeButton from './book-list/BookListRangeButton'

const BookRoute = () => {
	const { range, rangeDetail } = useParams()

    return (
		<RouteContainer>
			<RouteTitle icon={<BookIcon />} title={'내 책'} />

			<BookListRangeButton range={range} />
			<div className="mb-4" />

			<BookList range={range} rangeDetail={rangeDetail} />
		</RouteContainer>
	)
}

export default BookRoute