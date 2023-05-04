import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
// Components
import Loading from '../../common/Loading'
import Error from '../../common/Error'
import NoContent from '../../common/NoContent'
import HorizontalBookView from '../book-view/HorizontalBookView'
import DoneHorizontalBookView from '../book-view/DoneHorizontalBookView'
import InfiniteScrollLoading from '../../common/InfiniteScrollLoading'
import BookListRangeButton from './BookListRangeButton'
// Images
import kimchiImage from '../../../resources/images/common/kimchi-green.png'
import bookShelfImage from '../../../resources/images/common/bookshelf.png'
// Functions
import { deleteBook, getBookList, unGiveUpBook, giveUpBook } from '../../../functions/book'
import parse from 'html-react-parser'
import BookListBoarding from '../../info/BookListBoarding'

const BookList = () => {
	const isLogin =
		localStorage.getItem('login-token') != null &&
		localStorage.getItem('login-token') != '' &&
		typeof localStorage.getItem('login-token') != 'undefined'

	const { range, rangeDetail } = useParams()
	const rangeApi = () => {
		if (range === 'not-done') {
			if (rangeDetail === 'all' || rangeDetail == null) {
				return 'not-done'
			} else {
				return 'not-started'
			}
		}

		return range
	}

	const noContentMessage = parse(
		range === 'not-done'
			? `읽지 않은 책이 없어요`
			: range === 'done'
			? `다 읽은 책이 없어요`
			: range === 'give-up'
			? `내 사전에 포기란 없다! <br/> ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요`
			: `텅 비어 있어요`
	)
	const fetchSize = 24

	const [initalFetch, setInitialFetch] = useState(true)
	const [loading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [maxPage, setMaxPage] = useState(0)

	const [bookList, setBookList] = useState(null)

	useEffect(() => {
		document.title = `${range == 'not-done' ? '읽고 있는 책' : range == 'give-up' ? '포기한 책' : '다 읽은 책'} | 책잇아웃`
		if (!isLogin) {
			setInitialFetch(false)
			setIsLoading(false)
			return
		}

		setTimeout(() => setInitialFetch(false), 5000)

		getBookList(rangeApi(), 0, fetchSize)
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
		getBookList(rangeApi(), currentPage + 1, fetchSize)
			.then((pageList) => {
				setBookList([...bookList, ...pageList.content])
			})
			.finally(() => {
				setCurrentPage(currentPage + 1)
			})
	}

	if (!isLogin) return <BookListBoarding />
	if (initalFetch) return <></>
	if (loading) return <Loading message='잠시만 기다려 주세요' />

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px' }}>
			<div className='mb-4'>
				<BookListRangeButton range={range} />
			</div>

			{ error || bookList == null ? (
				<Error />
			) : bookList.length === 0 ? (
				range == 'give-up' ? (
					<NoContent message={noContentMessage} textSize='h2' icon={kimchiImage} mt='30px' imageSize='200px' />
				) : (
					<NoContent message={noContentMessage} textSize='h2' useImage={false} iconSize='10em' mt='75px' />
				)
			) : (
				<InfiniteScroll
					dataLength={bookList.length}
					next={getNextPage}
					hasMore={currentPage < maxPage}
					loader={<InfiniteScrollLoading />}
					className='overflow-hidden'>
					<BookCardList bookList={bookList} range={range} setBookList={setBookList} />
				</InfiniteScroll>
			)}
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
