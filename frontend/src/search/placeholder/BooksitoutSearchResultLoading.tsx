import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import loadingCover from '../../images/placeholder/default-book-cover-loading.png'
import booksitoutIcon from '../../common/icons/booksitoutIcon'
import AddBookSearchInfoCardLoading from '../../book/book-form/AddBookSearchInfoCardLoading'

const BooksitoutSearchResultLoading = () => {
  return (
		<div className='col-12 col-lg-6 mb-3' style={{ height: '225px' }}>
			<Card className='h-100'>
				<Card.Body>
					<div className='row h-100'>
						<div className='col-3 d-flex align-self-center'>
							<img src={loadingCover} alt='' className='img-fluid w-100 rounded border' />
						</div>

						<div className='col-9'>
							<h5 className='clamp-1-line'>
								<Placeholder as={Card.Text} animation='glow' className='mb-0'>
									<Placeholder xs={8} />
								</Placeholder>
							</h5>
							<h6 className='text-secondary clamp-1-line'>
								<Placeholder as={Card.Text} animation='glow' className='mb-0'>
									<Placeholder xs={3} />
								</Placeholder>
							</h6>

							<div className='row pt-3'>
								<div className='col-6 mb-1'>
									<AddBookSearchInfoCardLoading p={10} icon={<booksitoutIcon.page />} />
								</div>

								<div className='col-6 mb-1'>
									<AddBookSearchInfoCardLoading p={10} icon={<booksitoutIcon.language />} />
								</div>

								<div className='col-6 mb-1'>
									<AddBookSearchInfoCardLoading p={10} icon={<booksitoutIcon.category />} />
								</div>

								<div className='col-6 mb-1'>
									<AddBookSearchInfoCardLoading p={10} icon={<booksitoutIcon.publishYear />} />
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
  )
}

export default BooksitoutSearchResultLoading