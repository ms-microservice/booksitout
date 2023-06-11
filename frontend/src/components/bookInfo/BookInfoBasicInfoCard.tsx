import { Card } from 'react-bootstrap'
import booksitoutIcon from '../../common/icons/booksitoutIcon'

import aladinLogo from '../../images/logo/square/aladin.png'
import yes24Logo from '../../images/logo/square/yes24.png'
import kyoboLogo from '../../images/logo/square/kyobo.jpg'
import naverLogo from '../../images/logo/square/naver.png'
import booksitoutLogo from '../../images/logo.png'

const BookInfoBasicInfoCard = ({ book }) => {
	return (
		<Card style={{ minHeight: '400px' }}>
			<Card.Body className=' row row-eq-height justify-content-center align-items-center h-100'>
				<div className='col-8 col-md-4 text-center'>
					<img src={book.cover} alt='' className='img-fluid border rounded' style={{ maxHeight: '300px' }} />
				</div>

				<div className='col-12 col-md-8 pt-2 ps-4'>
					<InfoText icon={<booksitoutIcon.title />} text={<h5>{book.title}</h5>} />
					<InfoText icon={<booksitoutIcon.author />} text={<h5 className='text-secondary'>{book.author ?? '-'}</h5>} />
					<InfoText icon={<booksitoutIcon.publishYear />} text={<h5 className='text-secondary'>{book.publishYear ?? '-'}</h5>} />
					<InfoText
						icon={<booksitoutIcon.page />}
						text={<h5 className='text-secondary'>{book.page == null ? '-' : `${book.page} 페이지`}</h5>}
					/>
					<InfoText icon={<booksitoutIcon.description />} text={<p className='clamp-2-line'>{book.description ?? '-'}</p>} />

					<div className='row justify-content-center mt-5'>
						<div className='col-12 col-md-6'>
							<div className='d-flex'>
								<SearchIcon image={booksitoutLogo} link={`/search/${book.title}`} />
								<SearchIcon image={aladinLogo} link={book.link.naver} />
								<SearchIcon image={yes24Logo} link={book.link.yes24} />
								<SearchIcon image={kyoboLogo} link={book.link.kyobo} />
								<SearchIcon image={naverLogo} link={book.link.naver} />
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const InfoText = ({ icon, text }) => {
	return (
		<div className='d-flex'>
			<h5 className='text-book'>{icon}</h5>

			<div className='me-3' />
			{text}
		</div>
	)
}

const SearchIcon = ({ image, link }) => {
	return (
		<a href={link} className={`ms-2 me-2 ${link == null ? 'opacity-25' : ''}`}>
			<img src={image} alt='' className='img-fluid rounded' style={{ width: '50px', height: '50px' }} />
		</a>
	)
}

export default BookInfoBasicInfoCard
