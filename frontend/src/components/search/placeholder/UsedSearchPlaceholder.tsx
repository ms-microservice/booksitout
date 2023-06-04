import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import loadingCover from '../../../resources/images/common/loading-default-book-cover.png'
import loadingIcon from '../../../resources/images/common/library-loading.png'

const UsedSearchPlaceholder = () => {
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

							<div className='mt-4' style={{ whiteSpace: 'nowrap' }}>
								<Placeholder as={Card.Text} animation='glow'>
									<img src={loadingIcon} alt='' className='img-fluid rounded me-3 border search-provider-icon' />
									재고 : <Placeholder xs={1} />개 (₩
									<Placeholder xs={2} />)
								</Placeholder>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default UsedSearchPlaceholder