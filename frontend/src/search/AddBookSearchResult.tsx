import { Card } from "react-bootstrap"
import defaultBookCover from '../images/placeholder/default-book-cover.png'

import booksitoutLogo from '../images/logo/square/booksitout.png'
import naverLogo from '../images/logo/square/naver.png'

const AddBookSearchResult = ({book}) => {
	return (
		<Card className='text-center mt-2 mb-2 clickable' style={{ height: '250px' }}>
			<img
				src={book.from === 'BOOKSITOUT' ? booksitoutLogo : naverLogo}
				alt={book.from}
				style={{ position: 'absolute', width: '25px', height: '25px', top: '-5px', right: '5px' }}
				className='rounded'
			/>

			<Card.Body>
				<div className='d-flex justify-content-center align-items-center' style={{ height: '125px' }}>
					<div className='row'>
						<div className='col-12'>
							<img
								src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover}
								alt='book cover'
								className='img-fluid border rounded'
								style={{ maxHeight: '125px' }}
							/>
						</div>
					</div>
				</div>

				<div className='h-50 d-flex flex-column justify-content-center'>
					<h6 className='limit-2-line'>{book.title}</h6>
					<h6 className='text-secondary limit-2-line'>{book.author.replaceAll('^', ', ')}</h6>
				</div>
			</Card.Body>
		</Card>
	)
}
export default AddBookSearchResult