import { Card } from 'react-bootstrap'
import aladinIcon from '../../../resources/images/search/aladin.png'

const UsedBookCardComponent = ({ book }) => {
	return (
		<div className='col-12 col-lg-6' style={{ height: '225px' }}>
			<a href={book.link} target='_blank' className='text-decoration-none text-black' rel='noreferrer'>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100 justify-content-center'>
							<div className='col-3'>
								<img src={book.cover} alt='' className='img-fluid h-100' />
							</div>

							<div className='col-9'>
								<h5>{book.title}</h5>
								<h6 className='text-secondary'>{book.author}</h6>
								<div className='mt-4'>
									<img src={aladinIcon} alt='' className='img-fluid rounded me-3' style={{ width: '50px' }} />
									재고 : {book.stockCount}개 ({book.minPrice}원)
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
