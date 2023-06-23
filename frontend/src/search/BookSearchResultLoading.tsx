import React from 'react'
import { Card, Carousel, Placeholder } from 'react-bootstrap'
import '../resources/css/bookSearchCard.css'
import '../resources/css/customCarousel.css'

const BookSearchResultLoading = ({ label, labelComponent, CardComponent }) => {
	return (
		<Card className='mt-3 mb-4' id='search-card'>
			<Card.Body>
				<div className='row'>
					<div className='col-4 col-lg-4'>
						<Placeholder as={Card.Text} animation='glow' className='mb-0'>
							<h3 style={{ whiteSpace: 'nowrap' }}>
								{label}

								<span className='d-lg-none'>
									<br />
								</span>

								<span className='ms-lg-3 text-secondary h5'>
									총 <Placeholder xs={1} />권
								</span>
							</h3>
						</Placeholder>
					</div>

					<div className='col-8 col-lg-8 text-end'>{labelComponent}</div>
				</div>

				<Carousel controls={false} interval={null} indicators={false} variant='dark' className={'custom-carousel'}>
					<Carousel.Item>
						<div className='row'>
							<CardComponent />
							<CardComponent />
						</div>
					</Carousel.Item>
				</Carousel>
			</Card.Body>
		</Card>
	)
}

export default BookSearchResultLoading
