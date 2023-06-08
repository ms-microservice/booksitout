import { Card } from 'react-bootstrap'
import defaultBookCover from '../../images/placeholder/default-book-cover.png'
import '../bookCover.css'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const DoneHorizontalBookView = ({ book }) => {
	return (
		<a href={`/book/detail/${book.bookId}`} className='h-100 text-black text-decoration-none'>
			<Card className='h-100'>
				<Card.Body className='mb-5'>
					<div className='d-flex justify-content-center'>
						<img
							id='book-cover'
							src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover}
							alt=''
							className='img-fluid rounded border'
						/>
					</div>

					<div className='text-center mt-2'>
						<h5>{book.title}</h5>
						<h6 className='text-secondary'>{book.author}</h6>
					</div>

					<div className='row justify-content-center w-100' style={{ position: 'absolute', bottom: '0px' }}>
						{[1, 2, 3, 4, 5].map((rate) => {
							return (
								<div
									className={`col-2 text-center text-warning ps-0 pe-0 ms-0 me-0 ${book.rating == null && 'text-muted'}`}
									style={{ opacity: book.rating == null ? '0.1' : '0.7' }}>
									<h1>{rate <= book.rating ? <booksitoutIcon.starFill /> : <booksitoutIcon.star />}</h1>
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
