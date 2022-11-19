import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
import HorizontalBookView from './HorizontalBookView'

const BookList = (props) => {
	const { range } = useParams()
	const apiUrl = `http://localhost/v1/book/all/${range}`

	const [initalFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const [bookList, setBookList] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 5000)

		fetch(apiUrl, {
			headers: {
				Authorization: props.token,
			},
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				}

				return
			})
			.then((data) => {
				setBookList(data)
			})
			.catch((e) => {
				setError(true)
				console.log(e)
			})
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
				<NoContent />
			) : (
				<div className='row row-eq-height'>
					{bookList.map((book) => {
						return (
							<div className='col-12 col-xl-6 mb-5'>
								<Card>
									<Card.Body>
										<a href={`/book/detail/${book.bookId}`} className='text-black text-decoration-none'>
											<HorizontalBookView book={book} />
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
