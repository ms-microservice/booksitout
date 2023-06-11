import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import loadingCover from '../../resources/images/common/loading-default-book-cover.png'
import libraryIcon from '../../resources/images/book-classifications/sources/library.png'

const LibrarySearchLoading = () => {
    return (
		<div className='col-12 col-lg-6 mb-3 mb-lg-0' style={{ height: '225px' }}>
			<Card className='w-100 h-100' style={{ overflow: 'hidden' }}>
				<Card.Body>
					<div className='row w-100 h-100'>
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

							<div className='mt-4' style={{ whiteSpace: 'nowrap' }}>
								{Array.from({ length: 4 }).map(() => {
									return (
										<h6>
											<div className='row'>
												<div className='col-2'>
													<img src={libraryIcon} alt='' className='img-fluid me-2' style={{ width: '20px' }} />
												</div>

												<div className='col-10'>
													<span className='mt-2'>
														<Placeholder as={Card.Text} animation='glow'>
															<Placeholder xs={8} />
														</Placeholder>
													</span>
												</div>
											</div>
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

export default LibrarySearchLoading