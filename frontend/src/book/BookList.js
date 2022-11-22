import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
import HorizontalBookView from './HorizontalBookView'
// Images
import kimchiImage from '../resources/images/general/kimchi.png'
import bookShelfImage from '../resources/images/common/bookshelf.png'

const BookList = (props) => {
	const { range } = useParams()
	const BOOK_GET_LIST_API_URL = `http://localhost/v1/book/all/${range}`

	const [initalFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const [bookList, setBookList] = useState(null)

	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 5000)

		fetch(BOOK_GET_LIST_API_URL, {
			headers: { Authorization: props.token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				}

				return
			})
			.then((data) => setBookList(data))
			.catch((e) => setError(true))
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})
	}, [])

	return (
		<div className='container'>
			{initalFetch ? (
				<></>
			) : loading ? (
				<Loading message='잠시만 기다려 주세요' />
			) : error ? (
				<Error />
			) : bookList == null || bookList.length == 0 ? (
				<NoContent
					message={
						range == 'not-done'
							? `아직 읽지 않은 책이 없어요. 지금 바로 등록해 보세요!`
							: range == 'done'
							? `아직 다 읽은 책이 없어요`
							: range == 'give-up'
							? `내 사전에 포기란 없다! ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요`
							: `텅 비어 있어요`
					}
					icon={range == 'give-up' ? kimchiImage : bookShelfImage}
				/>
			) : (
				<div className='row row-eq-height'>
					{bookList.map((book) => {
						return (
							<div className='col-12 col-xl-6 mb-5'>
								<Card className='h-100'>
									<Card.Body>
										<a href={`/book/detail/${book.bookId}`} className='text-black text-decoration-none'>
											{range == 'done' ? (
												<HorizontalBookView book={book} firstButton={<></>} secondButton={<></>} />
											) : (
												<HorizontalBookView book={book} />
											)}
										</a>
									</Card.Body>
								</Card>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default BookList
