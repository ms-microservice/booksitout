import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import iconLoading from '../../resources/images/common/library-loading.png'
import loadingCover from '../../resources/images/common/loading-default-book-cover.png'

const SubscriptionSearchLoading = () => {
    return (
		<div className='col-12 col-lg-6 mb-3 mb-lg-0' style={{ height: '225px' }}>
			<Card className='h-100'>
				<Card.Body>
					<div className='row h-100 justify-content-center'>
						<div className='col-3 d-flex align-items-center'>
							<img src={loadingCover} alt='' className='img-fluid w-100 rounded' />
						</div>

						<div className='col-9'>
							<h5>
								<Placeholder as={Card.Text} animation='glow'>
									<Placeholder xs={8} />
								</Placeholder>
							</h5>

							<h6 className='text-secondary'>
								<Placeholder as={Card.Text} animation='glow'>
									<Placeholder xs={5} />
								</Placeholder>
							</h6>

							<div className='mt-4'>
								<Placeholder as={Card.Text} animation='glow'>
									<img src={iconLoading} className='img-fluid rounded me-3 border search-provider-icon' />
									<Placeholder xs={4} />
								</Placeholder>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)

}

export default SubscriptionSearchLoading