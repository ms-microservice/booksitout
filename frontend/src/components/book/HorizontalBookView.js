// Images
import defaultBookCover from '../../resources/images/common/default-book-cover.png'
import { ProgressBar } from 'react-bootstrap';

const HorizontalBookView = ({ book, firstButton = <></>, secondButton = <></>, link = '' }) => {
	return (
		<a href={link} className='mb-4 align-self-center text-decoration-none text-black'>
			<div className='d-flex justify-content-center'>
				<img
					className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
					src={book.cover === '' ? defaultBookCover : book.cover}
					alt=''
					style={{height: '200px'}}
				/>
			</div>

			<div className='mt-3 text-center'>
				<h4 style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{book.title}</h4>
				<h6 className='text-muted' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
					{book.author == null || book.author === '' ? '-' : book.author}
				</h6>
				<HorizontalPageBar book={book} />
			</div>

			<div className='row mt-4'>
				<div className='col-12 mb-2'>{firstButton}</div>
				<div className='col-12 mb-2'>{secondButton}</div>
			</div>
		</a>
	)
}

const HorizontalPageBar = ({ book, showPage = true }) => {
	return (
		<div className='row align-items-center'>
			<div className={showPage ? 'col-7 col-xl-8' : 'col-12'}>
				<ProgressBar
					className='mt-3 mb-3'
					now={((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100}
					label={`${Math.round(((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100)}%`}
				/>
			</div>

			{showPage && (
				<div className='col-5 col-xl-4 text-end'>
					<span className='align-middle' style={{ whiteSpace: 'nowrap' }}>{`${
						book.currentPage == null || book.currentPage < 0 ? 0 : book.currentPage
					} / ${book.endPage}`}</span>
				</div>
			)}
		</div>
	)
}


export default HorizontalBookView
