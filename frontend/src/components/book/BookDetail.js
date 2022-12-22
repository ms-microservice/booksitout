import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button, ProgressBar } from 'react-bootstrap'
// Components
import BookInfoIcon from './book-info/BookInfoIcon'
import PageProgressBar from '../common/PageProgressBar'
// Components (Common)
import Error from '../common/Error'
import Loading from '../common/Loading'
import NoContent from '../common/NoContent'
// Images
import defaultBookCover from '../../resources/images/common/book.png'
// Functions
import { deleteBook, getBook, giveUpBook } from '../../functions/book'
// Urls
import { getMemo } from '../../functions/memo'
import { getQuotation } from '../../functions/quotation'
import { getAllReadingSessionOfBook } from '../../functions/reading'
import { CATEGORY_INFO, FORM_INFO, LANGUAGE_INFO, SOURCE_INFO } from './book-info/bookInfoEnum'
import AddButton from '../common/AddButton'

const BookDetail = ({ token }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const BOOK_EDIT_URL = `/book/edit/${id}`

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

		Promise.all([
			getBook(id).then((book) => setBook(book)),
			getMemo(id).then((memoList) => setMemo(memoList)),
			getQuotation(id).then((quotationList) => setQuotation(quotationList)),
			getAllReadingSessionOfBook(id).then((readingSessionList) => setReadingSession(readingSessionList)),
		]).finally(() => {
			setLoading(false)
			setInitialFetch(false)
		})
	}, [])

	return (
		<div className='container'>
			{initialFetch ? (
				<></>
			) : loading ? (
				<Loading message='' />
			) : book == null ? (
				<NoContent message='책이 없어요 다시 확인해 주세요' />
			) : (
				<div className='row text-center'>
					<div className='col-12 col-md-4 mb-5'>
						<div className='row justify-content-center'>
							<div className='col-8'>
								<img
									src={book.cover == '' ? defaultBookCover : book.cover}
									alt=''
									className={`img-fluid rounded  ${book.cover != '' && 'border'}`}
								/>
							</div>
						</div>

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

							{book.currentPage < book.endPage && (
								<>
									<div className='col-12 mt-3'>
										<Button variant='primary' className='w-100' onClick={() => navigate(`/reading/${id}`)}>
											이어서 읽기
										</Button>
									</div>

									<div className='col-12 mt-3'>
										<Button variant='warning' className='w-100' onClick={() => giveUpBook(id, token, navigate)}>
											포기하기
										</Button>
									</div>
								</>
							)}
						</div>
					</div>

					<div className='col-12 col-md-8 mb-5'>
						<div className='row mb-4'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author == null ? '-' : book.author}</h4>

							<div className='row justify-content-center'>
								<div className='col-12 col-lg-11'>
									<PageProgressBar book={book} />
								</div>
							</div>
						</div>

						<div className='row justify-content-center'>
							<div className='col-3 col-xl-2'>
								<a href={`/book/all?language=${book.language}`} className='text-decoration-none text-black'>
									<BookInfoIcon infoType={LANGUAGE_INFO} infoData={book.language} />
								</a>
							</div>
							<div className='col-3 col-xl-2'>
								<a href={`/book/all?category=${book.category}`} className='text-decoration-none text-black'>
									<BookInfoIcon infoType={CATEGORY_INFO} infoData={book.category} />
								</a>
							</div>
							<div className='col-3 col-xl-2'>
								<a href={`/book/all?form=${book.form}`} className='text-decoration-none text-black'>
									<BookInfoIcon infoType={FORM_INFO} infoData={book.form} />
								</a>
							</div>
							<div className='col-3 col-xl-2'>
								<a href={`/book/all?source=${book.source}`} className='text-decoration-none text-black'>
									<BookInfoIcon infoType={SOURCE_INFO} infoData={book.source} />
								</a>
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
								<div className='row justify-content-center'>
									<div className='col-8 col-md-6'>
										🗓️{' '}
										{readingSession.startTime
											.substring(2, readingSession.startTime.indexOf('T'))
											.replace('-', '년 ')
											.replace('-', '월 ')
											.concat('일')}
									</div>

									<div className='col-4 col-md-6'>⏰ {readingSession.readTime}분</div>

									<div className='col-6 mt-3'>
										📃 {readingSession.startPage}p - {readingSession.endPage}p
									</div>

									<ProgressBar className='p-0'>
										<ProgressBar
											style={{ backgroundColor: 'rgb(234, 236, 239)' }}
											now={(readingSession.startPage / readingSession.book.endPage) * 100}
										/>
										<ProgressBar now={(readingSession.endPage / readingSession.book.endPage) * 100} />
									</ProgressBar>
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
