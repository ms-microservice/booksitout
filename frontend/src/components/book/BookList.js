import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Pagination } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
import HorizontalBookView from './HorizontalBookView'
// Images
import kimchiImage from '../../resources/images/general/kimchi.png'
import bookShelfImage from '../../resources/images/common/bookshelf.png'
// Functions
import { getBookList, unGiveUpBook } from '../../functions/book'

const BookList = (props) => {
	const { range } = useParams()
	const navigate = useNavigate()

	const [initalFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const [bookList, setBookList] = useState(null)

	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 5000)
		getBookList(range)
			.then((list) => {
				if (list == null) {
					setError(true)
				} else {
					setBookList(list)
				}
			})
			.finally(() => {
				setInitialFetch(false)
				setIsLoading(false)
			})
	}, [])

	return (
		<div className='container'>
			{initalFetch ? (
				<></>
			) : isLoading ? (
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
										<>
											{range == 'done' ? (
												<HorizontalBookView
													book={book}
													firstButton={<></>}
													secondButton={<></>}
													link={`/book/detail/${book.bookId}`}
												/>
											) : range == 'give-up' ? (
												<HorizontalBookView
													book={book}
													firstButton={
														<Button
															variant='success'
															className='w-100'
															onClick={() => {
																const confirm = window.confirm('책을 다시 읽을까요?')

																if (confirm) {
																	unGiveUpBook(book.bookId).then((success) => {
																		if (success) {
																			toast.success('이제 책을 다시 읽을 수 있어요')
																			navigate(`book/detail/${book.bookId}`)
																		} else {
																			toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
																		}
																	})
																}
															}}>
															다시 읽기
														</Button>
													}
													secondButton={
														<Button variant='danger' className='w-100'>
															삭제하기
														</Button>
													}
													link={`/book/detail/${book.bookId}`}
												/>
											) : (
												<HorizontalBookView book={book} link={`/book/detail/${book.bookId}`} />
											)}
										</>
									</Card.Body>
								</Card>
							</div>
						)
					})}

					<Pagination className='pagination justify-content-center mb-5'>
						<Pagination.Item key={1} active={true}>
							1
						</Pagination.Item>
					</Pagination>
				</div>
			)}
		</div>
	)
}

export default BookList
