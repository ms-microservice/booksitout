import React from 'react'

const PageProgressBar = ({ book }) => {
	return (
		<div className='row align-items-center'>
			<div className='col-8 col-md-9'>
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

			<div className='col-4 col-md-3 align-middle'>
				<span className='align-middle'>{`${book.currentPage == null ? 0 : book.currentPage} / ${book.endPage}`}</span>
			</div>
		</div>
	)
}

export default PageProgressBar
