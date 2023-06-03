import { Card, ProgressBar } from 'react-bootstrap'
import defaultCover from '../../../resources/images/common/default-book-cover.png'

const MyBookCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6 mb-3' style={{ height: '225px' }}>
			<a href={`/book/detail/${book.bookId}`} className='text-decoration-none text-black'>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100'>
							<div className='col-3 d-flex align-self-center'>
								<img src={book.cover === '' ? defaultCover : book.cover} alt='' className='img-fluid w-100' />
							</div>

							<div className='col-9'>
								<h5>{book.title}</h5>
								<h6 className='text-secondary'>{book.author}</h6>

								<div className='row align-items-center'>
									<div className='col-8'>
										<ProgressBar
											variant='book'
											className='mt-3 mb-3'
											now={((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100}
											label={`${Math.round(((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100)}%`}
										/>
									</div>

									<div className='col-4'>
										<span className='align-middle' style={{ whiteSpace: 'nowrap' }}>
											<b className='text-book'>{`${
												book.currentPage == null || book.currentPage < 0 ? 0 : book.currentPage
											}`}</b>{' '}
											/ {`${book.endPage}`}
										</span>
									</div>
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default MyBookCardComponent
