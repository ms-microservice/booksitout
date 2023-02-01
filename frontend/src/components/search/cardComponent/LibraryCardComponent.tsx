import { Card } from 'react-bootstrap'
import defaultCover from '../../../resources/images/common/book.png'

const LibraryCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6' style={{ height: '225px' }}>
			<a href='' className='text-decoration-none text-black' target='_blank' rel='noreferrer'>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100'>
							<div className='col-3 align-self-center'>
								<img src={book.book.cover === '' ? defaultCover : book.book.cover} alt='' className='img-fluid h-100' />
							</div>

							<div className='col-9'>
								<h5>{book.book.title}</h5>
								<h6 className='text-secondary'>{book.book.author}</h6>

								<div className='mt-4'>
									{book.libraryList.slice(0, 5).map((library) => {
										return <h6>{library.name}</h6>
									})}
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default LibraryCardComponent
