import { Card } from "react-bootstrap"
import NoContent from "../../common/NoContent"
import defaultBookCover from '../../../resources/images/common/default-book-cover.png'

const PostBookCard = ({book}) => {
    return (
		<Card className='h-100'>
			<Card.Body>
				{book == null ? (
					<NoContent message='책 정보가 없어요' textSize={5} iconSize={5} mBetween={2} />
				) : (
					<div className='row h-100 align-items-center'>
						<div className='col-4'>
							<img src={book.cover ?? defaultBookCover} alt='' className='img-fluid rounded border' style={{ maxHeight: '135px' }} />
						</div>

						<div className='col-8'>
							<div className='w-100'>
								<h5 className='text-center'>{book.title}</h5>
								<h6 className='text-secondary text-center'>{book.author}</h6>
							</div>
						</div>
					</div>
				)}
			</Card.Body>
		</Card>
	)

}

export default PostBookCard