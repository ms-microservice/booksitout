import { Card, Placeholder } from "react-bootstrap"

import libraryLoading from '../resources/images/common/library-loading.png'

const LibraryLoadingPlaceholder = () => {
	return (
		<Card className='text-center mt-3 mb-3'>
			<Card.Body>
				<img src={libraryLoading} alt='book cover' className='img-fluid border rounded' style={{ height: '100px' }} />

				<div className=''>
					<Placeholder as={Card.Text} animation='glow'>
						<Placeholder xs='8' />
					</Placeholder>
				</div>
			</Card.Body>
		</Card>
	)
}

export default LibraryLoadingPlaceholder