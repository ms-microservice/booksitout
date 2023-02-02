import { Card } from 'react-bootstrap'
import { BsFillCartFill as CartIcon } from 'react-icons/bs'
import uiSettings from '../../../settings/ui'

import aladinIcon from '../../../resources/images/search/aladin.png'
import yes24Icon from '../../../resources/images/search/yes24.png'

const UsedBookCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6 mb-3 mb-lg-0' style={{ height: '225px' }}>
			<a href={book.link} target='_blank' className='text-decoration-none text-black' rel='noreferrer'>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100 justify-content-center'>
							<div className='col-3 d-flex align-items-center'>
								<img src={book.cover} alt='' className='img-fluid w-100' />
							</div>

							<div className='col-9'>
								<h5>{book.title.slice(0, 50)}</h5>
								<h6 className='text-secondary'>{book.author}</h6>
								<div className='mt-4'>
									<img
										src={
											book.provider === 'ONLINE_ALADIN' || book.provider === 'OFFLINE_ALADIN'
												? aladinIcon
												: book.provider === 'ONLINE_YES24' || book.provider === 'OFFLINE_YES24'
												? yes24Icon
												: ''
										}
										alt=''
										className='img-fluid rounded me-3 border'
										style={{ width: '50px' }}
									/>
									재고 : {book.stockCount}개 ({book.minPrice}원)
									{book.locationList.length !== 0 && (
										<div className='mt-2 text-secondary'>
											{book.locationList.map((location) => {
												return (
													<div>
														<CartIcon className='me-2 mb-1' style={{ color: uiSettings.color.theme }} />
														{location}
													</div>
												)
											})}
										</div>
									)}
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default UsedBookCardComponent
