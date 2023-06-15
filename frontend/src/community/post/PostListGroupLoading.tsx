import React from 'react'
import { Badge, Card, ListGroup, Placeholder } from 'react-bootstrap'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const PostListGroupLoading = ({ col1 = 'col-12 col-md-8', col2 = 'col-12 col-md-4' }) => {
	return (
		<ListGroup>
			{Array.from({ length: 5 }).map(() => {
				return (
					<ListGroup.Item as='li' className='d-flex w-100 pe-0'>
						<div className='row w-100'>
							<div className={`${col1}`}>
								<div className='clamp-1-line'>
									<Placeholder as={Card.Text} animation='glow' className='mb-0'>
										<Placeholder xs={8} />
										<span className='text-book'>
											[<Placeholder xs={1} />]
										</span>
									</Placeholder>
								</div>

								<div className='text-secondary'>
									<Placeholder as={Card.Text} animation='glow' className='mb-0'>
										<Placeholder xs={2} />
									</Placeholder>
								</div>
							</div>

							<div className={`${col2} d-flex align-items-start justify-content-between p-0 pe-md-1 mt-3 mt-md-0`}>
								<div className='d-flex align-items-center' style={{ width: '400px', paddingLeft: '12px' }}>
									<booksitoutIcon.book className='text-book me-2' />

									<div className='d-block clamp-1-line' style={{ width: '140px' }}>
										<span>
											<Placeholder as={Card.Text} animation='glow' className='mb-0'>
												<Placeholder xs={8} />

												<br />

												<span className='text-secondary'>
													<Placeholder xs={3} />
												</span>
											</Placeholder>
										</span>
									</div>
								</div>

								<div className='ms-0 ms-xl-5' />

								<div>
									<Badge bg='book' style={{ width: '65px' }}>
										<Placeholder as={Card.Text} animation='glow' className='mb-0'>
											<booksitoutIcon.like /> <Placeholder xs={4} />
										</Placeholder>
									</Badge>

									<div className='ms-2 ms-xl-2' />

									<Badge bg='danger' style={{ width: '65px' }}>
										<Placeholder as={Card.Text} animation='glow' className='mb-0'>
											<booksitoutIcon.dislike /> <Placeholder xs={4} />
										</Placeholder>
									</Badge>
								</div>
							</div>
						</div>
					</ListGroup.Item>
				)
			})}
		</ListGroup>
	)
}

export default PostListGroupLoading