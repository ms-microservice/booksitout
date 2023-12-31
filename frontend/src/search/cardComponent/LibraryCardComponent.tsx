import React from 'react'
import { Card } from 'react-bootstrap'
import defaultCover from '../../resources/images/common/default-book-cover.png'
import { useDispatch } from 'react-redux'
import { openSearchLibraryDetail, setSearchLibraryDetailSelected } from '../../redux/modalSlice'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const LibraryCardComponent = ({ book }) => {
	const dispatch = useDispatch()

	const handleOnClick = () => {
		dispatch(openSearchLibraryDetail())
		dispatch(setSearchLibraryDetailSelected(book))
	}

	if (book == null || book === undefined || book.book == null || book.book === undefined) return <></>

	return (
		<div className="col-12 col-lg-6 mb-3 mb-lg-0 clickable" style={{ height: '225px' }} onClick={handleOnClick}>
			<Card className="w-100 h-100" style={{ overflow: 'hidden' }}>
				<Card.Body>
					<div className="row w-100 h-100">
						<div className="col-3 d-flex align-items-center">
							<img
								src={book.book.cover === '' ? defaultCover : book.book.cover}
								alt=""
								className="img-fluid w-100"
							/>
						</div>

						<div className="col-9">
							<h5>{book.book.title.slice(0, 40)}</h5>
							<h6 className="text-secondary">{book.book.author}</h6>

							<div className="mt-4" style={{ whiteSpace: 'nowrap' }}>
								{book.libraryList.slice(0, 5).map(library => {
									return (
										<h6>
											<booksitoutIcon.library
												className="me-2 text-book pb-14"
												style={{ width: '20px' }}
											/>
											<span className="mt-2">{library.name}</span>
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
