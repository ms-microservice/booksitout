// Images
import defaultBookCover from '../../resources/images/common/default-book-cover.png'
import { ProgressBar } from 'react-bootstrap';
import '../../resources/css/bookCover.css'

const HorizontalBookView = ({ book, firstButton = <></>, secondButton = <></>, link = '' }) => {
	return (
		<a href={link} className='mb-4 align-self-center text-decoration-none text-black'>
			<div className='d-flex justify-content-center'>
				<img
					id='book-cover'
					className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
					src={book.cover === '' ? defaultBookCover : book.cover}
					alt=''
				/>
			</div>

			<div className='mt-3 text-center'>
				<h5 style={{ overflow: 'hidden', height: '50px' }} className={book.title.length <= 7 && 'pt-2'}>{book.title}</h5>

				<h6 className='text-muted mb-md-0' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
					{book.author == null || book.author === '' ? '-' : book.author}
				</h6>

				<HorizontalPageBar book={book} />
			</div>

			<div className='row mt-3 mt-md-2'>
				<div className='col-12 mb-2'>{firstButton}</div>
				<div className='col-12 mb-2'>{secondButton}</div>
			</div>
		</a>
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
