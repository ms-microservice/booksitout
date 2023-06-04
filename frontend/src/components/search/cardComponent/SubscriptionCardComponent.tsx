import { Card } from 'react-bootstrap'

import yes24Icon from '../../../resources/images/search/yes24.png'
import kyoboIcon from '../../../resources/images/search/kyobo.jpg'
import millieIcon from '../../../resources/images/search/millie.png'
import ridiIcon from '../../../resources/images/search/ridi.png'

import defaultBookCover from '../../../resources/images/common/default-book-cover.png'

import '../../../resources/css/bookSearchCard.css'

const SubscriptionCardComponent = ({ book }) => {

	if (book == null || book.title === undefined) return <></>

	return (
		<div className='col-12 col-lg-6 mb-3 mb-lg-0' style={{ height: '225px' }}>
			<a href={book.link} target='_blank' className='text-decoration-none text-black' rel='noreferrer'>
				<Card className='h-100'>
					<Card.Body>
						<div className='row h-100 justify-content-center'>
							<div className='col-3 d-flex align-items-center'>
								<img src={book.cover === '' || book.cover == null ? defaultBookCover : book.cover} alt='' className='img-fluid w-100' />
							</div>

							<div className='col-9'>
								<h5>{book.title.slice(0, 50)}</h5>
								<h6 className='text-secondary'>{book.author}</h6>
								<div className='mt-4'>
									<img
										src={
											book.provider === 'YES24'
												? yes24Icon
												: book.provider === 'RIDI'
												? ridiIcon
												: book.provider === 'KYOBO'
												? kyoboIcon
												: book.provider === 'MILLIE'
												? millieIcon
												: '?'
										}
										alt={book.provider}
										className='img-fluid rounded me-3 border search-provider-icon'
									/>
									{book.provider === 'YES24'
										? 'YES24 북클럽'
										: book.provider === 'RIDI'
										? '리디 셀렉트'
										: book.provider === 'KYOBO'
										? '교보문고 Sam'
										: book.provider === 'MILLIE'
										? '밀리의 서재'
										: '?'}
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</a>
		</div>
	)
}

export default SubscriptionCardComponent
