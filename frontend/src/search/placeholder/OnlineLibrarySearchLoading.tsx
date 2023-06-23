import React from 'react'
import loadingCover from '../../resources/images/common/loading-default-book-cover.png'
import { Card, Placeholder } from 'react-bootstrap'
import libraryIconLoading from '../../resources/images/common/library-loading.png'

const OnlineLibrarySearchLoading = () => {
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

							<div className='mt-4 position-absolute' style={{ bottom: '40px' }}>
								<img src={libraryIconLoading} alt='' className='img-fluid rounded me-3 border search-provider-icon' />
							</div>

							<div className='row mt-2 position-absolute bottom-0 w-100'>
								<div className='col-5 col-lg-4'>
									<Placeholder as={Card.Text} animation='glow'>
										<Placeholder xs={6} />
									</Placeholder>
								</div>

								<div className='col-5 col-lg-4 ps-0'>
									<Placeholder as={Card.Text} animation='glow'>
										<Placeholder xs={6} />
									</Placeholder>
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default OnlineLibrarySearchLoading