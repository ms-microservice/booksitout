import { Card } from "react-bootstrap"
import PageProgressBar from "../common/PageProgressBar"
import defaultBookCover from '../images/placeholder/default-book-cover-loading.png'
import BookRating from "../book/book-detail/BookRating"
import toast from "react-hot-toast"

const SharingBookCard = ({book}) => {
	if (book.isbn == null) return (
		<div onClick={() => toast.error('책에 관한 정보가 없어요')} className="clickable h-100">
			<SharingBookContent book={book} />
		</div>
	)

	return (
		<a href={`/book/info/${book.isbn}`} className="h-100">
			<SharingBookContent book={book} />
		</a>
	)
}

const SharingBookContent = ({ book }) => {
	return (
		<Card className="h-100">
			<Card.Body className="h-100">
				<div className="row row-eq-height h-100">
					<div className="d-flex col-4 text-center align-items-center">
						<img
							src={book.cover == null || book.cover === '' ? defaultBookCover : book.cover}
							alt=""
							className="img-fluid rounded border"
							style={{ maxHeight: '200px' }}
						/>
					</div>

					<div className="col-8" style={{ position: 'relative' }}>
						<h5 className="clamp-1-line">{book.title}</h5>
						<h5 className="text-secondary pb-5 clamp-1-line">{book.author}</h5>

						<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} className="pb-0 ps-3 pe-5">
							{book.currentPage >= book.endPage ? (
								<div className="not-clickable">
									<BookRating book={book} setBook={undefined} />
								</div>
							) : (
								<PageProgressBar book={book} />
							)}
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default SharingBookCard