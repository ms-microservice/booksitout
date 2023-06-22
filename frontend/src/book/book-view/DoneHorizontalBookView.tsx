import { Card } from 'react-bootstrap'
import defaultBookCover from '../../images/placeholder/default-book-cover.png'
import '../bookCover.css'
import booksitoutIcon from '../../common/icons/booksitoutIcon';
import styled from 'styled-components';

const DoneHorizontalBookView = ({ book }) => {
	return (
		<Card className="h-100">
			<HorizontalBookDoneViewContainer href={`/book/detail/${book.id}`}>
				<Card.Body className="mb-5">
					<div className="d-flex justify-content-center">
						<img
							id="book-cover"
							src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover}
							alt=""
							className="img-fluid rounded border"
						/>
					</div>

					<div className="text-center mt-2">
						<h5 className="clamp-1-line">{book.title}</h5>
						<h6 className="text-secondary">{book.author}</h6>
					</div>

					<div className="row justify-content-center w-100" style={{ position: 'absolute', bottom: '0px' }}>
						{[1, 2, 3, 4, 5].map(rate => {
							return (
								<div
									className={`col-2 text-center text-warning ps-0 pe-0 ms-0 me-0 ${
										book.rating == null && 'text-muted'
									}`}
									style={{ opacity: book.rating == null ? '0.1' : '0.7' }}
								>
									<h1>
										{rate <= book.rating ? <booksitoutIcon.starFill /> : <booksitoutIcon.star />}
									</h1>
								</div>
							)
						})}
					</div>
				</Card.Body>
			</HorizontalBookDoneViewContainer>
		</Card>
	)
}

const HorizontalBookDoneViewContainer = styled.a`
	min-height: 350px;
	overflow-y: hidden;
`

export default DoneHorizontalBookView
