import { Card } from 'react-bootstrap'
import defaultCover from '../../../resources/images/common/book.png'
import libraryIcon from '../../../resources/images/book-classifications/sources/library.png'
import { useDispatch } from 'react-redux'
import { openSearchLibraryDetail, setSearchLibraryDetailSelected } from '../../../redux/modalSlice'

const LibraryCardComponent = ({ book }) => {
	const dispatch = useDispatch()

	const handleOnClick = () => {
		dispatch(openSearchLibraryDetail())
		dispatch(setSearchLibraryDetailSelected(book))
	}

	return (
		<div className='col-12 col-lg-6' style={{ height: '225px' }} onClick={handleOnClick}>
			<Card className='w-100 h-100'>
				<Card.Body>
					<div className='row w-100 h-100'>
						<div className='col-3'>
							<img src={book.book.cover === '' ? defaultCover : book.book.cover} alt='' className='img-fluid h-100' />
						</div>

						<div className='col-9'>
							<h5>{book.book.title.slice(0, 60)}</h5>
							<h6 className='text-secondary'>{book.book.author}</h6>

							<div className='mt-4'>
								{book.libraryList.slice(0, 5).map((library) => {
									return (
										<h6>
											<img src={libraryIcon} alt='' className='img-fluid me-2' style={{ width: '20px' }} />
											<span className='mt-2'>{library.name}</span>
										</h6>
									)
								})}
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default LibraryCardComponent
