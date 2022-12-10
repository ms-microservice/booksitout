import React from 'react'
// Book Info
import CategoryInfo from './info/CategoryInfo'
import LanguageInfo from './info/LanguageInfo'
import FormInfo from './info/FormInfo'
// Images
import defaultBookCover from '../resources/images/common/book.png'

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

				<div className='row align-items-center'>
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
					<div className='col-3 align-middle'>
						<span className='align-middle'>{`${book.currentPage == null ? 0 : book.currentPage} / ${book.endPage}`}</span>
					</div>
				</div>

				<div className='row text-center mt-4 justify-content-center'>
					<div className='col-4'>
						<LanguageInfo language={book.language} />
					</div>

					<div className='col-4'>
						<CategoryInfo category={book.category} />
					</div>

					<div className='col-4'>
						<FormInfo form={book.form} />
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
