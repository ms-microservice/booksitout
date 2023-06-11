import React from 'react'
import { Card, Placeholder, ProgressBar } from 'react-bootstrap'
import loadingCover from '../../resources/images/common/loading-default-book-cover.png'

const MyBookSearchLoading = () => {
	return (
		<div className='col-12 col-lg-6 mb-3' style={{ height: '225px' }}>
			<Card className='h-100'>
				<Card.Body>
					<div className='row h-100'>
						<div className='col-3 d-flex align-self-center'>
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

							<div className='row align-items-center'>
								<div className='col-8'>
									<ProgressBar
										variant='book'
										className='mt-3 mb-3'
										now={0}
										label={
											<Placeholder as={Card.Text} animation='glow' className='text-center'>
												<Placeholder xs={5} />
											</Placeholder>
										}
									/>
								</div>

								<div className='col-4'>
									<div className='row'>
										<div className='col-6'>
											<Placeholder as={Card.Text} animation='glow' className='p-0'>
												<b className='text-book'>
													<Placeholder xs={10} className='p-0' />
												</b>
											</Placeholder>
										</div>

										<div className='col-6'>
											<Placeholder as={Card.Text} animation='glow' className='p-0'>
												<Placeholder xs={10} className='p-0' />
											</Placeholder>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)

}

export default MyBookSearchLoading