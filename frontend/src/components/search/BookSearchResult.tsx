import { useState, useEffect } from 'react'
import { Card, Carousel } from 'react-bootstrap'

import NoSearchResult from './NoSearchResult'
import Error from '../common/Error'

import search from '../../functions/search'
import { UsedBook } from './BookType'
import './customCarousel.css'
import './bookSearchCard.css'

const BookSearchResult = ({ label, bookList, CardComponent }) => {
	const [splitBookList, setSplitBookList] = useState<UsedBook[][]>([])

	useEffect(() => {
		setSplitBookList(search.splitArray(bookList, 2))
	}, [bookList])

	return (
		<Card className='mt-3 mb-4' id='search-card'>
			<Card.Body>
				<h3>
					{label}
					{typeof bookList != 'undefined' && <span className='ms-3 text-secondary h5'>{`총 ${bookList.length}권`}</span>}
				</h3>

				{typeof bookList == 'undefined' ? (
					<Error />
				) : (
					<>
						{bookList.length === 0 ? (
							<NoSearchResult />
						) : (
							<Carousel controls={bookList.length > 2} interval={null} indicators={false} variant='dark' className={'custom-carousel'}>
								{splitBookList.map((bookArray) => {
									return (
										<Carousel.Item>
											<div className='row'>
												<CardComponent book={bookArray[0]} />

												{bookArray[1] != null && <CardComponent book={bookArray[1]} />}
											</div>
										</Carousel.Item>
									)
								})}
							</Carousel>
						)}
					</>
				)}
			</Card.Body>
		</Card>
	)
}

export default BookSearchResult
