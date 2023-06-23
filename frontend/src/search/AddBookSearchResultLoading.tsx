import { Card, Placeholder } from 'react-bootstrap'
import defaultLoadingBookCover from '../resources/images/common/loading-default-book-cover.png'

const AddBookSearchResultLoading = () => {
	return (
		<Card className='text-center mt-2 mb-2' style={{ height: '250px' }}>
			<Card.Body>
				<div className='d-flex justify-content-center align-items-center' style={{ height: '125px' }}>
					<div className='row'>
						<div className='col-12'>
							<img
								src={defaultLoadingBookCover}
								alt='book cover loading'
								className='img-fluid border rounded'
								style={{ maxHeight: '125px' }}
							/>
						</div>
					</div>
				</div>

				<div className='h-50 d-flex flex-column justify-content-center'>
					<Placeholder as={Card.Text} animation='glow'>
						<Placeholder xs='8' />
						<br />
						<Placeholder xs='5' />
					</Placeholder>
				</div>
			</Card.Body>
		</Card>
	)
}

export default AddBookSearchResultLoading