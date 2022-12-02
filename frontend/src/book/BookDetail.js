import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
// Classification Icons
import LanguageInfo from './info/LanguageInfo'
import CategoryInfo from './info/CategoryInfo'
import SourceInfo from './info/SourceInfo'
import FormInfo from './info/FormInfo'
// Common
import Error from '../common/Error'
import Loading from '../common/Loading'
import NoContent from '../common/NoContent'

import { deleteBook, giveUpBook } from '../resources/functions/book'
import defaultBookCover from '../resources/images/common/book.png'

const BookDetail = ({ token }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const BOOK_DETAIL_API_URL = `http://localhost/v1/book/${id}`
	const READING_SESSION_API_URL = `http://localhost/v1/reading-session/${id}`
	const MEMO_API_URL = `http://localhost/v1/memo/all/${id}`
	const QUOTATION_API_URL = `http://localhost/v1/quotation/all/${id}`

	const BOOK_EDIT_URL = `/book/edit/${id}`

	const [notFound, setNotFound] = useState(true)
	const [loading, setLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)

	const [book, setBook] = useState(null)
	const [memo, setMemo] = useState(null)
	const [quotation, setQuotation] = useState(null)
	const [readingSession, setReadingSession] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 5000)

		fetch(BOOK_DETAIL_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					setNotFound(false)
				}
				return res.json()
			})
			.then((data) => setBook(data))
			.catch((e) => console.log(e))
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})

		fetch(MEMO_API_URL, { method: 'GET', headers: { Authorization: token } })
			.then((res) => res.json())
			.then((data) => setMemo(data))

		fetch(QUOTATION_API_URL, { method: 'GET', headers: { Authorization: token } })
			.then((res) => res.json())
			.then((data) => setQuotation(data))

		fetch(READING_SESSION_API_URL, { method: 'GET', headers: { Authorization: token } })
			.then((res) => res.json())
			.then((data) => setReadingSession(data))

		console.log(book)
	}, [])

	return (
		<div className='container'>
			{initialFetch ? (
				<></>
			) : loading ? (
				<Loading message='' />
			) : notFound ? (
				<Error />
			) : (
				<div className='row text-center'>
					<div className='col-12 col-md-4 mb-5'>
						<img
							src={book.cover == '' ? defaultBookCover : book.cover}
							alt=''
							className={`img-fluid rounded  ${book.cover != '' && 'border'}`}
						/>

						<div className='row mt-3'>
							<div className='col-6'>
								<Button variant='warning' className='w-100' onClick={() => navigate(BOOK_EDIT_URL)}>
									수정하기
								</Button>
							</div>

							<div className='col-6'>
								<Button variant='danger' className='w-100' onClick={() => deleteBook(id, token, navigate)}>
									삭제하기
								</Button>
							</div>

							<div className='col-12 mt-3'>
								<Button variant='primary' className='w-100' onClick={() => navigate(`/reading/${id}`)}>
									이어서 읽기
								</Button>
							</div>

							<div className='col-12 mt-3'>
								<Button variant='warning' className='w-100' onClick={() => navigate(`/reading/${id}`)}>
									포기하기
								</Button>
							</div>
						</div>
					</div>

					<div className='col-12 col-md-8 mb-5'>
						<div className='row mb-4'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author == null ? '-' : book.author}</h4>

							<div className='row justify-content-center align-items-center'>
								<div className='col-9'>
									<div className='progress mt-3 mb-3'>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width: ((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100 + '%',
											}}
											aria-valuenow={book.currentPage}
											aria-valuemin={0}
											aria-valuemax={book.endPage}></div>
									</div>
								</div>
								<div className='col-2 align-middle'>
									<span className='align-middle'>{`${book.currentPage == null ? 0 : book.currentPage} / ${book.endPage}`}</span>
								</div>
							</div>
						</div>

						<div className='row justify-content-center'>
							<div className='col-3 col-xl-2'>
								<LanguageInfo language={book.language} />
							</div>
							<div className='col-3 col-xl-2'>
								<CategoryInfo category={book.category} />
							</div>
							<div className='col-3 col-xl-2'>
								<FormInfo form={book.form} />
							</div>
							<div className='col-3 col-xl-2'>
								<SourceInfo source={book.source} />
							</div>
						</div>

						<BookRecordCard
							displayLabel='독서활동'
							record={readingSession}
							ListComponent={<ReadingSessionList readingSessionList={readingSession} />}
						/>
						<BookRecordCard displayLabel='메모' record={memo} ListComponent={<MemoList memoList={memo} />} />
						<BookRecordCard displayLabel='인용' record={quotation} ListComponent={<QuotationList quotationList={quotation} />} />
					</div>
				</div>
			)}
		</div>
	)
}

const BookRecordCard = ({ displayLabel, record, ListComponent }) => {
	return (
		<Card className='mt-3'>
			<Card.Body>
				<h4>{displayLabel}</h4>

				<div className='row justify-content-center mt-4'>
					<div className='col-12'>{record == null || record.length === 0 ? <NoContent style={{ width: '150px' }} /> : ListComponent}</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const MemoList = ({ memoList }) => {
	return (
		<div className='row row-eq-height'>
			{memoList.map((memo) => {
				return (
					<div className='col-12 col-lg-6 mb-2'>
						<Card>
							<Card.Body>
								<div className='row'>
									<div className='col-2'>
										<h6 className='mt-1'>{memo.page}</h6>
									</div>
									<div className='col-10'>
										<div className='text-start'>{memo.content}</div>
									</div>
								</div>
							</Card.Body>
						</Card>
					</div>
				)
			})}
		</div>
	)
}

const QuotationList = ({ quotationList }) => {
	return (
		<>
			{quotationList.map((quotation) => {
				return (
					<Card className='mb-2'>
						<Card.Body>
							<div className='row'>
								<div className='col-2'>{quotation.page}</div>
								<div className='col-7 text-start'>{quotation.content}</div>
								<div className='col-3'>{quotation.from_who}</div>
							</div>
						</Card.Body>
					</Card>
				)
			})}
		</>
	)
}

const ReadingSessionList = ({ readingSessionList }) => {
	return (
		<div className='row row-eq-height'>
			{readingSessionList.map((readingSession) => {
				return (
					<div className='col-12 col-lg-6'>
						<Card className='mb-2'>
							<Card.Body>
								<div className='row'>
									<div className='col-5'>22년 11월 5일</div>

									<div className='col-4'>
										{readingSession.startPage}p ~ {readingSession.endPage}p
									</div>

									<div className='col-3'>{readingSession.readTime}분</div>
								</div>
							</Card.Body>
						</Card>
					</div>
				)
			})}
		</div>
	)
}

export default BookDetail
