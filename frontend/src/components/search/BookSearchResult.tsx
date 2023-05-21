import { useState, useEffect } from 'react'
import { Card, Carousel } from 'react-bootstrap'

import NoSearchResult from './NoSearchResult'
import Error from '../common/Error'
import SearchNotConfigured from './SearchNotConfigured'

import '../../resources/css/bookSearchCard.css'
import '../../resources/css/customCarousel.css'
import utils from '../../functions/utils'
import { UsedBook } from '../../types/BookType'

const BookSearchResult = ({ label, labelComponent, bookList, CardComponent, isConfigured, notConfiguredUrl = '/settings' }) => {
	const [splitBookList, setSplitBookList] = useState<UsedBook[][]>([])

	useEffect(() => {
		setSplitBookList(utils.splitArray(bookList, 2))
	}, [bookList])

	return (
		<Card className='mt-3 mb-4' id='search-card'>
			<Card.Body>
				<div className='row'>
					<div className='col-4 col-lg-4'>
						<h3 style={{ whiteSpace: 'nowrap' }}>
							{label}
							
							<span className="d-lg-none"><br/></span>

							{bookList != null && typeof bookList != 'undefined' && isConfigured && <span className='ms-lg-3 text-secondary h5'>{`총 ${bookList.length}권`}</span>}
						</h3>
					</div>

					<div className='col-8 col-lg-8 text-end' >{labelComponent}</div>
				</div>

				{!isConfigured ? (
					<SearchNotConfigured url = {notConfiguredUrl}/>
				) : typeof bookList == 'undefined' || bookList == null ? (
					<div className="h-100">
						<Error />
					</div>
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

												{bookArray[1] != null ? <CardComponent book={bookArray[1]} /> : <div className='col-12 col-lg-6 m-2 d-lg-none' style={{ height: '225px' }}/>}
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
