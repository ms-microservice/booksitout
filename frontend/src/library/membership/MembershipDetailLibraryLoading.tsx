import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import CardTitle from '../../common/CardTitle'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const MembershipDetailLibraryLoading = () => {
    return (
		<Card style={{ minHeight: '450px' }}>
			<Card.Body>
				<CardTitle
					icon={<booksitoutIcon.library />}
					title={
						<Placeholder as={Card.Text} animation='glow' className='mb-0'>
							<div className='d-flex force-1-line'>
								<div>사용할 수 있는 도서관 (</div>
								<Placeholder xs={1} />
								<div>곳)</div>
							</div>
						</Placeholder>
					}
					subTitle={undefined}
					textSize={2}
				/>

				<div className='row'>
					{Array.from({ length: 6 }).map((library) => {
						return (
							<div className='col-12 col-sm-6 col-md-4 col-xl-3'>
								<Card className='mb-3' style={{ minHeight: '125px' }}>
									<Card.Body>
										<div className='row'>
											<div className='col-8'>
												<h4 className='clamp-1-line'>
													<Placeholder as={Card.Text} animation='glow' className='mb-0'>
														<Placeholder xs={8} />
													</Placeholder>
												</h4>
											</div>

											<div className='col-4'>
												<h5 className='text-end text-secondary'>
													<Placeholder as={Card.Text} animation='glow' className='mb-0'>
														<Placeholder xs={3} />
														km
													</Placeholder>
												</h5>
											</div>
										</div>

										<div className='ms-4'>
											<Placeholder as={Card.Text} animation='glow' className='mb-0'>
												<h5>
													<span className='text-book me-2'>
														<booksitoutIcon.location />
													</span>

													<Placeholder xs={8} />
												</h5>
											</Placeholder>
										</div>

										<div className='ms-4'>
											<Placeholder as={Card.Text} animation='glow' className='mb-0'>
												<h5>
													<span className='text-book me-2'>
														<booksitoutIcon.book />
													</span>
													<Placeholder xs={3} />권
												</h5>
											</Placeholder>
										</div>
									</Card.Body>
								</Card>
							</div>
						)
					})}
				</div>
			</Card.Body>
		</Card>
	)
}

export default MembershipDetailLibraryLoading