import { Card, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeSearchLibraryDetail } from '../redux/modalSlice'
import { LibraryBook } from '../types/BookType'
import { RootState } from '../redux/store'
import libraryIcon from '../resources/images/book-classifications/sources/library.png'

const LibraryDetailModal = () => {
	const dispatch = useDispatch()

	const libraryModalOpen = useSelector((state: RootState) => state.modal.searchLibraryDetailOpen)
	const searchResult: LibraryBook | null = useSelector((state: RootState) => state.modal.searchLibraryDetailSelected)

	return (
		<Modal show={libraryModalOpen} onHide={() => dispatch(closeSearchLibraryDetail())} size='lg' fullscreen='md-down' style={{overflow: 'hidden'}} centered>
			{searchResult == null ? (
				<></>
			) : (
				<>
					<Modal.Header closeButton>
						<h3 className='mb-0'>
							{searchResult.book.title.slice(0, 50)}

							<br />

							<h5 className='text-secondary mt-1'>{searchResult.book.author}</h5>
						</h3>
					</Modal.Header>

					<Modal.Body>
						<div className='row'>
							<div className='col-lg-3'>

								<div className='row justify-content-center'>
									<div className='col-8 col-lg-12'>
										<img src={searchResult.book.cover} alt='' className='img-fluid w-100' />
									</div>
								</div>

							</div>

							<div className='col-lg-9'>
								{searchResult.libraryList.map((library) => {
									return (
										<div className='mt-2 mt-lg-0 mb-2'>
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
						<div className='col-2 text-center'>
							<img src={libraryIcon} alt='' className='img-fluid' style={{ width: '40px' }} />
						</div>

						<div className='col-10'>
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
