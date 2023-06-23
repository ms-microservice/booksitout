import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const MainTipsListGroup = () => {
    return (
		<ListGroup className='d-flex'>
			{Array.from({ length: 4 }).map(() => {
				return (
					<ListGroup.Item className='pe-0 p-3'>
						<div className='row'>
							<div className='row w-100'>
								<div className='col-12 col-lg-9'>
									<div className='text-book'>
										<Placeholder as={Card.Text} animation='glow' className='mb-0'>
											<booksitoutIcon.time className='mb-1' /> 약 <Placeholder xs={1} />분
										</Placeholder>
									</div>

									<h5>
										<Placeholder as={Card.Text} animation='glow' className='mb-0'>
											<Placeholder xs={7} />
										</Placeholder>
									</h5>
								</div>

								<div className='col-12 col-lg-3'>
									<p className='text-secondary text-end mt-2 mt-md-0 mb-0'>
										<Placeholder as={Card.Text} animation='glow' className='mb-0'>
											<Placeholder xs={2} />년
											<Placeholder xs={2} />월
										</Placeholder>
									</p>
								</div>
							</div>
						</div>
					</ListGroup.Item>
				)
			})}
		</ListGroup>
	)
}

export default MainTipsListGroup