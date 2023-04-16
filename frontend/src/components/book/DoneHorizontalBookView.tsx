import { Card } from 'react-bootstrap'
import defaultBookCover from '../../resources/images/common/default-book-cover.png'

const DoneHorizontalBookView = ({book}) => {
  return (
		<a href={`/book/detail/${book.bookId}`} className='h-100 text-black text-decoration-none'>
			<Card className='h-100'>
				<Card.Body>
					<div className='d-flex justify-content-center'>
						<img
							src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover}
							alt=''
							className='img-fluid rounded border'
							style={{ height: '225px' }}
						/>
					</div>

					<div className='text-center mt-2'>
						<h5>{book.title}</h5>
						<h6 className='text-secondary'>{book.author}</h6>
					</div>
				</Card.Body>
			</Card>
		</a>
  )
}

export default DoneHorizontalBookView