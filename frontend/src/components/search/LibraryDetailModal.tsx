import { Card, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeSearchLibraryDetail } from '../../redux/modalSlice'
import { LibraryBook } from './BookType'
import { RootState } from '../../redux/store'
import libraryIcon from '../../resources/images/book-classifications/sources/library.png'

const LibraryDetailModal = () => {
	const dispatch = useDispatch()

	const libraryModalOpen = useSelector((state: RootState) => state.modal.searchLibraryDetailOpen)
	const searchResult: LibraryBook | null = useSelector((state: RootState) => state.modal.searchLibraryDetailSelected)

	return (
		<Modal show={libraryModalOpen} onHide={() => dispatch(closeSearchLibraryDetail())} size='lg' fullscreen='md-down'>
			{searchResult == null ? (
				<></>
			) : (
				<>
					<Modal.Header closeButton>
						<h3>{searchResult.book.title}</h3>
						<h5 className='text-secondary ms-3'>{searchResult.book.author}</h5>
					</Modal.Header>

					<Modal.Body>
						<div className='row'>
							<div className='col-lg-3'>
								<img src={searchResult.book.cover} alt='' className='img-fluid w-100' />
							</div>

							<div className='col-lg-9'>
								{searchResult.libraryList.map((library) => {
									return (
										<div className='mb-2'>
											<LibraryInfo library={library} />
										</div>
									)
								})}
							</div>
						</div>
					</Modal.Body>
				</>
			)}
		</Modal>
	)
}

const LibraryInfo = ({ library }) => {
	return (
		<a href={library.bookLink ?? library.libraryLink} target='_blank' rel='noreferrer' className='text-decoration-none text-black'>
			<Card className=''>
				<Card.Body>
					<div className='row'>
						<div className='col-lg-1'>
							<img src={libraryIcon} alt='' className='img-fluid' style={{ width: '40px' }} />
						</div>

						<div className='col-lg-9'>
							<h5 className='mt-0'>{library.name}</h5>
							<h6 className='text-secondary mb-0'>{library.address}</h6>
						</div>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default LibraryDetailModal
