import React from 'react'
import { Card } from 'react-bootstrap'
import defaultCover from '../../resources/images/common/default-book-cover.png'
import AddBookSearchInfoCard from '../../book/book-form/AddBookSearchInfoCard'
import booksitoutIcon from '../../common/icons/booksitoutIcon'
import { getLanguageKoreanLabel } from '../../functions/language'

const BooksitoutCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6 mb-3' style={{ height: '225px' }}>
			<a href={`/book/info/${book.isbn}`}>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100'>
							<div className='col-3 d-flex align-self-center'>
								<img src={book.cover === '' ? defaultCover : book.cover} alt='' className='img-fluid w-100 rounded border' />
							</div>

							<div className='col-9'>
								<h5 className='clamp-1-line'>{book.title}</h5>
								<h6 className='text-secondary clamp-1-line'>{book.author}</h6>

								<div className='row pt-3'>
									<div className='col-6 mb-1'>
										<AddBookSearchInfoCard p={10} icon={<booksitoutIcon.page />} label={`${book.page ?? '?'} 페이지`} />
									</div>

									<div className='col-6 mb-1'>
										<AddBookSearchInfoCard
											p={10}
											icon={<booksitoutIcon.language />}
											label={getLanguageKoreanLabel(book.language)}
										/>
									</div>

									<div className='col-6 mb-1'>
										<AddBookSearchInfoCard p={10} icon={<booksitoutIcon.category />} label={book.category ?? '기타'} />
									</div>

									<div className='col-6 mb-1'>
										<AddBookSearchInfoCard
											p={10}
											icon={<booksitoutIcon.publishYear />}
											label={`${book.publicationYear ?? '? '}년 출판`}
										/>
									</div>
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default BooksitoutCardComponent