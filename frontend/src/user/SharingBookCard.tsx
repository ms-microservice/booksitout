import { Card } from "react-bootstrap"
import PageProgressBar from "../components/common/PageProgressBar"
import defaultBookCover from '../images/placeholder/default-book-cover-loading.png'
import BookRating from "../book/book-detail/BookRating"

const SharingBookCard = ({book}) => {
	return (
		<a href={`/book/info/${book.isbn}`} className='h-100'>
			<Card className='h-100'>
				<Card.Body className='h-100'>
					<div className='row row-eq-height h-100'>
						<div className='d-flex col-4 text-center align-items-center'>
							<img
								src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover}
								alt=''
								className='img-fluid rounded border'
								style={{ maxHeight: '200px' }}
							/>
						</div>

						<div className='col-8' style={{ position: 'relative' }}>
							<h5>{book.title}</h5>
							<h5 className='text-secondary pb-5'>{book.author}</h5>

							<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} className='pb-0 ps-3 pe-5'>
								{book.currentPage >= book.endPage ? (
									<div className='not-clickable'>
										<BookRating book={book} setBook={undefined} />
									</div>
								) : (
									<PageProgressBar book={book} />
								)}
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default SharingBookCard