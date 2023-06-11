import { ProgressBar } from 'react-bootstrap'

const PageProgressBar = ({ book, showPage = true }) => {
	return (
		<div className='row align-items-center'>
			<div className={showPage ? 'col-8' : 'col-12'}>
				<ProgressBar
					variant='book'
					className='mt-3 mb-3'
					now={((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100}
					label={`${Math.round(((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100)}%`}
				/>
			</div>

			{showPage && (
				<div className='col-4 text-end'>
					<span className='align-middle' style={{ whiteSpace: 'nowrap' }}>
						<b className='text-book'>{`${book.currentPage == null || book.currentPage < 0 ? 0 : book.currentPage}`}</b> /{' '}
						{`${book.endPage}`}
					</span>
				</div>
			)}
		</div>
	)
}

export default PageProgressBar
