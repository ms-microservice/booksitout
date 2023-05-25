import React from 'react'
import toast from 'react-hot-toast'
import { Button, Modal } from 'react-bootstrap'
import { AiFillStar as StarFillIcon, AiOutlineStar as StarIcon } from 'react-icons/ai'

import { addRating } from '../../../functions/book'

const BookRatingDetail = ({ book, setBook }) => {
	const [show, setShow] = React.useState(false)
	const [rating, setRating] = React.useState(book.rating || 0)

	const handleEditRating = () => {
		if ((book.rating || 0) == rating) {
			toast.error('별점을 수정하지 않으셨어요')
			return
		}

		addRating(book.bookId, rating).then((success) => {
			if (success) {
				setBook({
					...book,
					rating: rating,
				})
				toast.success('별점을 수정했어요')
				setShow(false)
			} else {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} centered fullscreen='md-down'>
				<Modal.Header closeButton className='text-center'>
					<h4 className='w-100'>별점 수정하기</h4>
				</Modal.Header>

				<Modal.Body>
					<div className='row justify-content-center'>
						{[1, 2, 3, 4, 5].map((starCount) => {
							return (
								<div className='col-2 text-center'>
									<h1 onClick={() => setRating(starCount)} className='clickable'>
										{starCount <= rating ? <StarFillIcon className='text-warning' /> : <StarIcon />}
									</h1>
								</div>
							)
						})}

						<div className='col-12 col-md-6 mt-3 mt-md-4'>
							<Button variant='book-danger' className='w-100' onClick={() => setShow(false)}>
								취소
							</Button>
						</div>

						<div className='col-12 col-md-6 mt-3 mt-md-4'>
							<Button variant='book' className='w-100' onClick={() => handleEditRating()}>
								별점 수정하기
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<div className='row justify-content-center mt-4 mb-2' onClick={() => setShow(true)}>
				{[1, 2, 3, 4, 5].map((rate) => {
					return (
						<div className='col-2 text-center text-warning clickable'>
							<h1>{rate <= book.rating ? <StarFillIcon /> : <StarIcon />}</h1>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default BookRatingDetail