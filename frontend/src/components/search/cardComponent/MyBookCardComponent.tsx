import { Card } from 'react-bootstrap'
import PageProgressBar from '../../common/PageProgressBar'
import defaultCover from '../../../resources/images/common/book.png'

const MyBookCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6' style={{ height: '225px' }}>
			<a href={`/book/detail/${book.bookId}`} className='text-decoration-none text-black'>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100'>
							<div className='col-3 align-self-center'>
								<img src={book.cover === '' ? defaultCover : book.cover} alt='' className='img-fluid h-100' />
							</div>

							<div className='col-9'>
								<h5>{book.title}</h5>
								<h6 className='text-secondary'>{book.author}</h6>

								<PageProgressBar book={book} showPage={false} />
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default MyBookCardComponent
