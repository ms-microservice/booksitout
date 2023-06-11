import React from 'react'
import { useParams } from 'react-router-dom'
import BookList from './book-list/BookList'
import RouteTitle from '../common/RouteTitle'
import { BsBookHalf as BookIcon } from 'react-icons/bs'

const BookRoute = () => {
	const { range, rangeDetail } = useParams()

    return (
		<div className='container-fluid h-100' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<RouteTitle icon={<BookIcon />} title={'내 책'} />
			<BookList range={range} rangeDetail={rangeDetail} />
		</div>
	)
}

export default BookRoute