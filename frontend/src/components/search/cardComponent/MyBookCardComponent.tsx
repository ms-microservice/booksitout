import { Card } from 'react-bootstrap'
import PageProgressBar from '../../common/PageProgressBar'
import defaultCover from '../../../resources/images/common/default-book-cover.png'

const MyBookCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6' style={{ height: '225px' }}>
			<a href={`/book/detail/${book.bookId}`} className='text-decoration-none text-black' target='_blank' rel="noreferrer">
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100'>
							<div className='col-3 d-flex align-self-center'>
								<img src={book.cover === '' ? defaultCover : book.cover} alt='' className='img-fluid w-100' />
							</div>

							<div className='col-9'>
								<h5>{book.title}</h5>
								<h6 className='text-secondary'>{book.author}</h6>

								<PageProgressBar book={book} />
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default MyBookCardComponent
