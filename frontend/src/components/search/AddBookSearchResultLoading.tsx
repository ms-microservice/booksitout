import { Card, Placeholder } from 'react-bootstrap'
import defaultLoadingBookCover from '../../resources/images/common/loading-default-book-cover.png'

const AddBookSearchResultLoading = () => {
	return (
		<Card className='text-center mt-2 mb-2' style={{ height: '250px' }}>
			<Card.Body>
				<img src={defaultLoadingBookCover} alt='book cover' className='img-fluid border mt-4 rounded' style={{ height: '100px' }} />

				<div className='mt-4'>
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