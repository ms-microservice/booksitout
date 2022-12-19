import React from 'react'
// Book Info
import CategoryInfo from './book-info/CategoryInfo'
import LanguageInfo from './book-info/LanguageInfo'
import FormInfo from './book-info/FormInfo'
// Images
import defaultBookCover from '../../resources/images/common/book.png'

const HorizontalBookView = ({
	book,
	firstButton = (
		<a href={`/reading/${book.bookId}`} className='btn btn-primary w-100'>
			이어서 읽기
		</a>
	),
	secondButton = (
		<a href='/book/' className='btn btn-danger w-100'>
			이 책 포기하기
		</a>
	),
}) => {
	const bookInfoStyle = 'col-4 col-md-4 mb-2'

	return (
		<div className='row row-eq-height mt-3'>
			<div className='col-4 align-self-center'>
				<img
					className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
					src={book.cover === '' ? defaultBookCover : book.cover}
					alt=''
				/>
			</div>

			<div className='col-8'>
				<h4>{book.title}</h4>
				<h6 className='text-muted'>{book.author == null || book.author === '' ? '-' : book.author}</h6>
				<PageProgressBar book={book} />

				<div className='row text-center mt-4 justify-content-center'>
					<div className={bookInfoStyle}>
						<BookInfoIcon infoType={LANGUAGE_INFO} infoData={book.language} />
					</div>

					<div className={bookInfoStyle}>
						<BookInfoIcon infoType={CATEGORY_INFO} infoData={book.category} />
					</div>

					<div className={bookInfoStyle}>
						<BookInfoIcon infoType={FORM_INFO} infoData={book.form} />
					</div>
				</div>

				<div className='row mt-4'>
					<div className='col-6'>{firstButton}</div>
					<div className='col-6'>{secondButton}</div>
				</div>
			</div>
		</div>
	)
}

export default HorizontalBookView
