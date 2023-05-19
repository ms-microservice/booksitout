import { Card } from "react-bootstrap"
import PageProgressBar from "../common/PageProgressBar"

const SharingBookCard = ({book}) => {
    return (
		<a href={`/book/info/${book.isbn}`} className='text-decoration-none text-black'>
			<Card>
				<Card.Body>
					<div className='row'>
						<div className='col-4 text-center'>
							<img src={book.cover} alt='' className='img-fluid rounded border' style={{ maxHeight: '150px' }} />
						</div>

						<div className='col-8' style={{ position: 'relative' }}>
							<h5>{book.title}</h5>
							<h5 className='text-secondary'>{book.author}</h5>

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