import React from 'react'
import { useParams } from 'react-router-dom'
import BookList from './book-list/BookList'
import RouteTitle from '../common/RouteTitle'
import { BsBookHalf as BookIcon } from 'react-icons/bs'
import RouteContainer from '../common/RouteContainer'
import BookListRangeButton from './book-list/BookListRangeButton'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Boarding from '../info/Boarding'

const BookRoute = () => {
	const isLogin = useSelector((state: RootState) => state.user.isLogin)
	const { range, rangeDetail } = useParams()

    return (
		<RouteContainer>
			<RouteTitle icon={<BookIcon />} title={'내 책'} />

			{!isLogin ? (
				<Boarding
					title="내 책을 관리하려면 로그인 해 주세요"
					subtitle="내가 읽고 있는 책, 다 읽은 책을 쉽게 관리하고 남은 독서시간을 예측해줘요"
				/>
			) : (
				<>
					<BookListRangeButton range={range} />
					<div className="mb-4" />

					<BookList range={range} rangeDetail={rangeDetail} />
				</>
			)}
		</RouteContainer>
	)
}

export default BookRoute