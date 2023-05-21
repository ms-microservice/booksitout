import { Button, Card } from "react-bootstrap"

const BookInfoBasicInfoCard = ({ book }) => {
	return (
		<Card style={{ minHeight: '600px' }}>
			<Card.Body className=' row row-eq-height justify-content-center h-100'>
				<h2>기본정보</h2>

				<div className='col-8 col-md-4 text-center'>
					<img src={book.cover} alt='' className='img-fluid border rounded' style={{ maxHeight: '400px' }} />
				</div>

				<div className='col-12 col-md-8 text-center pt-4'>
					<h4>{book.title}</h4>
					<h5 className='text-secondary'>{book.author}</h5>

					<div className='row justify-content-center mt-5'>
						<div className='col-12 col-md-6'>
							<a href={`/search/${book.title}`}>
								<Button variant='book w-100'>책 검색하기</Button>
							</a>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default BookInfoBasicInfoCard