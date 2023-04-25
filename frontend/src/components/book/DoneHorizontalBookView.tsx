import { Card } from 'react-bootstrap'
import defaultBookCover from '../../resources/images/common/default-book-cover.png'
import { AiFillStar as StarFillIcon, AiOutlineStar as StarIcon } from 'react-icons/ai'

const DoneHorizontalBookView = ({ book }) => {
	return (
		<a href={`/book/detail/${book.bookId}`} className='h-100 text-black text-decoration-none'>
			<Card className='h-100'>
				<Card.Body className='mb-4'>
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

					<div
						className='row justify-content-center'
						style={{ position: 'absolute', bottom: '0px' }}>
						{[1, 2, 3, 4, 5].map((rate) => {
							return (
								<div className={`col-2 text-center text-warning ps-0 ${book.rating == null && 'text-muted'}`}>
									<h1>{rate <= book.rating ? <StarFillIcon /> : <StarIcon />}</h1>
								</div>
							)
						})}
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default DoneHorizontalBookView
