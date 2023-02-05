import { Card } from 'react-bootstrap'
import search from '../../../functions/search'

import {MdEventAvailable as ReservationPossibleIcon, MdOutlineDoNotDisturb as NotAvailableIcon} from 'react-icons/md'
import {TbCalendarOff as ReservationNotPossibleIcon} from 'react-icons/tb'
import {AiFillCheckCircle as AvailableIcon} from 'react-icons/ai'

const LibraryOnlineCardComponent = ({book}) => {
    const libraryData = search.data.onlineLibrary.find((r) => r.key === book.provider)

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
									<img src={libraryData?.icon ?? ''} alt='' className='img-fluid rounded me-3 border' style={{ width: '50px' }} />

									{libraryData?.name ?? '?'}
								</div>

								<div className='row mt-2 position-absolute bottom-0 w-100'>
									<div className='col-5 col-lg-4'>
										{book.loanPossible ? (
											<div>
												<AvailableIcon className='h4 text-success mt-1' />
												<span className='ms-2'>대출가능</span>
											</div>
										) : (
											<div>
												<NotAvailableIcon className='h4 text-danger mt-1' />
												<span className='ms-2'>대출불가</span>
											</div>
										)}
									</div>

									<div className='col-5 col-lg-4'>
										{!book.loadPossible && book.reservationPossible ? (
											<div>
												<ReservationPossibleIcon className='h4 text-success mt-1' />
												<span className='ms-2'>예약가능</span>
											</div>
										) : (
											<div>
												<ReservationNotPossibleIcon className='h4 text-danger mt-1' />
												<span className='ms-2'>예약불가</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default LibraryOnlineCardComponent