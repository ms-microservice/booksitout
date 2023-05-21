import { Card } from "react-bootstrap"
import PageProgressBar from "../common/PageProgressBar"
import defaultBookCover from '../../resources/images/common/default-book-cover.png'


const SharingBookCard = ({book}) => {
    return (
		<a href={`/book/info/${book.isbn}`} className='text-decoration-none text-black'>
			<Card>
				<Card.Body>
					<div className='row row-eq-height'>
						<div className='col-4 text-center'>
							<img src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover} alt='' className='img-fluid rounded border w-100' style={{ maxHeight: '200px' }} />
						</div>

						<div className='col-8' style={{ position: 'relative' }}>
							<h5>{book.title}</h5>
							<h5 className='text-secondary pb-5'>{book.author}</h5>

							<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} className='pb-0 ps-3 pe-5'>
								<PageProgressBar book={book} />
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default SharingBookCard