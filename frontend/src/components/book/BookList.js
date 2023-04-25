import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
import HorizontalBookView from './HorizontalBookView'
import DoneHorizontalBookView from './DoneHorizontalBookView'
import InfiniteScrollLoading from './InfiniteScrollLoading';
// Images
import kimchiImage from '../../resources/images/common/kimchi.png'
import bookShelfImage from '../../resources/images/common/bookshelf.png'
// Functions
import { deleteBook, getBookList, unGiveUpBook, giveUpBook } from '../../functions/book'

const BookList = () => {
	const { range, rangeDetail } = useParams()
	const rangeApi = range === 'not-done' ? (rangeDetail === 'all' ? range : rangeDetail) : range
	const noContentMessage = range === 'not-done' ? `아직 읽지 않은 책이 없어요. 지금 바로 등록해 보세요!` : range === 'done' ? `아직 다 읽은 책이 없어요` : range === 'give-up' ? `내 사전에 포기란 없다! ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요` : `텅 비어 있어요`
	const noContentImage = range === 'give-up' ? kimchiImage : bookShelfImage
	const fetchSize = 24

	const [initalFetch, setInitialFetch] = useState(true)
	const [loading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [maxPage, setMaxPage] = useState(0)

	const [bookList, setBookList] = useState(null)

	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 5000)

		getBookList(rangeApi, 0, fetchSize)
			.then((pageList) => {
				if (pageList == null) throw new Error()

				setBookList(pageList.content)
				setMaxPage(pageList.totalPages - 1)
			})
			.catch(() => {
				setError(true)
			})
			.finally(() => {
				setInitialFetch(false)
				setIsLoading(false)
			})
	}, [])

	const getNextPage = () => {
		getBookList(rangeApi, currentPage + 1, fetchSize)
			.then((pageList) => {
				setBookList([...bookList, ...pageList.content])
			})
			.finally(() => {
				setCurrentPage(currentPage + 1)
			})
	}

	if (initalFetch) return <></>
	if (loading) return <Loading message='잠시만 기다려 주세요' />
	if (error || bookList == null) return <Error />
	if (bookList.length === 0) return <NoContent message={noContentMessage} icon={noContentImage}/>

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px' }}>
			<InfiniteScroll
				dataLength={bookList.length}
				next={getNextPage}
				hasMore={currentPage < maxPage}
				loader={<InfiniteScrollLoading />}
				className='overflow-hidden'>
				<BookCardList bookList={bookList} range={range} setBookList={setBookList} />
			</InfiniteScroll>
		</div>
	)
}

const BookCardList = ({ bookList, range, setBookList }) => {
	const handleGiveupBook = (bookId) => {
		const confirm = window.confirm('책을 포기할까요?')

		if (confirm) {
			giveUpBook(bookId).then((success) => {
				if (success) {
					toast.success('책을 포기했어요. 마음이 바뀌시면 언제든지 다시 시작하실 수 있어요!')
					setBookList(bookList.filter((b) => b.bookId !== bookId))
				} else {
					toast.error('오류가 났어요 다시 시도해 주세요')
				}
			})
		}
	}

	const handleUngiveupBook = (bookId) => {
		const confirm = window.confirm('책을 다시 읽을까요?')

		if (confirm) {
			unGiveUpBook(bookId).then((success) => {
				if (success) {
					toast.success('이제 책을 다시 읽을 수 있어요')
					setBookList(bookList.filter((b) => b.bookId !== bookId))
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	if (range === 'done') {
		return (
			<div className='row row-eq-height mb-4'>
				{bookList.map((book) => {
					return (
						<div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-4'>
							<DoneHorizontalBookView book={book} />
						</div>
					)
				})}
			</div>
		)
	}

	if (range === 'give-up') {
		return (
			<div className='row row-eq-height'>
				{bookList.map((book) => {
					return (
						<div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-4'>
							<Card className='h-100'>
								<Card.Body>
									<HorizontalBookView
										book={book}
										firstButton={
											<Button
												variant='book'
												className='w-100'
												onClick={(e) => {
													e.preventDefault()
													handleUngiveupBook(book.bookId)
												}}>
												다시 읽기
											</Button>
										}
										secondButton={
											<Button
												variant='book-danger'
												className='w-100'
												onClick={(e) => {
													e.preventDefault()
													const confirm = window.confirm('정말 이 책을 삭제할까요?')

													if (confirm) {
														deleteBook(book.bookId).then((success) => {
															if (success) {
																toast.success('책을 삭제했어요')
																setBookList(bookList.filter((b) => b.bookId !== book.bookId))
															} else {
																toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
															}
														})
													}
												}}>
												삭제하기
											</Button>
										}
										link={`/book/detail/${book.bookId}`}
									/>
								</Card.Body>
							</Card>
						</div>
					)
				})}
			</div>
		)
	}

	if (range === 'not-done') {
		return (
			<div className='row row-eq-height'>
				{bookList.map((book) => {
					return (
						<div className='col-6 col-sm-4 col-md-3 col-xl-2 mb-5'>
							<Card className='h-100'>
								<Card.Body>
									<HorizontalBookView
										book={book}
										link={`/book/detail/${book.bookId}`}
										firstButton={
											<a href={`/reading/${book.bookId}`} className='btn btn-book w-100'>
												이어서 읽기
											</a>
										}
										secondButton={
											<Button
												variant='book-danger'
												className='w-100'
												onClick={(e) => {
													e.preventDefault()
													handleGiveupBook(book.bookId)
												}}>
												포기하기
											</Button>
										}
									/>
								</Card.Body>
							</Card>
						</div>
					)
				})}
			</div>
		)
	}

	return <h1 className='text-center'>잘못된 URL이에요</h1>
}

export default BookList