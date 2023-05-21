import { Card } from "react-bootstrap"

const AddBookSearchResult = ({book}) => {
	return (
		<Card className='text-center mt-2 mb-2 clickable' style={{ height: '250px' }}>
			<Card.Body>
				<img src={book.cover} alt='book cover' className='img-fluid border' style={{ height: '100px' }} />

				<div className='h-50 d-flex flex-column justify-content-center mt-3'>
					<h6 className='limit-2-line'>{book.title}</h6>
					<h6 className='text-secondary limit-2-line'>{book.author.replaceAll('^', ', ')}</h6>
				</div>
			</Card.Body>
		</Card>
	)
}
export default AddBookSearchResult