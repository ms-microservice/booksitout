import { Button, ProgressBar } from 'react-bootstrap';

import defaultBookCover from '../../../resources/images/common/default-book-cover.png'
import '../../../resources/css/bookCover.css'
import { deleteBook, getBookList, unGiveUpBook, giveUpBook } from '../../../functions/book'
import toast from 'react-hot-toast';


const HorizontalBookView = ({
	book,
	link = '',
	bookList,
	setBookList,
	firstButton = (
		<Button
			variant='book'
			className='w-100'
			onClick={(e) => {
				e.preventDefault()
				handleUngiveupBook(book.bookId)
			}}>
			다시 읽기
		</Button>
	),

	secondButton = (
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

	)
}) => {
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

	return (
		<>
			<a href={link} className='mb-4 align-self-center'>
				<div className='d-flex justify-content-center'>
					<img
						id='book-cover'
						className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
						src={book.cover === '' ? defaultBookCover : book.cover}
						alt=''
					/>
				</div>

				<div className='mt-3 text-center'>
					<h5 style={{ overflow: 'hidden', height: '50px' }} className={book.title.length <= 7 ? 'pt-2' : ''}>
						{book.title}
					</h5>

					<h6 className='text-muted mb-md-0' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
						{book.author == null || book.author === '' ? '-' : book.author}
					</h6>

					<HorizontalPageBar book={book} />
				</div>
			</a>
			<div className='row mt-3 mt-md-2'>
				<div className='col-12 mb-2'>{firstButton}</div>
				<div className='col-12 mb-2'>{secondButton}</div>
			</div>
		</>
	)
}

const HorizontalPageBar = ({ book }) => {
	return (
		<div className='row align-items-center'>
			<div className='col-12 col-md-6 col-xl-7'>
				<ProgressBar
					variant='book'
					className='mt-2 mt-md-3 mb-1 mb-md-3'
					now={((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100}
					label={`${Math.round(((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100)}%`}
				/>
			</div>

			<div className='col-12 col-md-6 col-xl-5 mt-1 mt-md-0'>
				<span className='align-middle' style={{ whiteSpace: 'nowrap' }}>
					<b className='text-book'>{book.currentPage == null || book.currentPage < 0 ? 0 : book.currentPage}</b>
					{` / ${book.endPage}`}
				</span>
			</div>
		</div>
	)
}


export default HorizontalBookView
