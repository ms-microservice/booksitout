import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { AiOutlineStar as StarIcon, AiFillStar as StarFillIcon } from 'react-icons/ai'

import toast from 'react-hot-toast'

import { addBookRating } from '../../functions/book'

const AddRatingModal = ({ book, setBook, isShowingModal, setIsShowingModal }) => {
	const [rating, setRating] = useState(0)

	const addRating = (e) => {
		e.preventDefault()

		if (rating === 0) {
			toast.error('별점을 입력해 주세요')
			return
		}

		const success = addBookRating(book.bookId, rating)
		if (success) {
			let newBook = { ...book }
			newBook.rating = rating
			setBook(newBook)

			setIsShowingModal(false)
		}
	}

	return (
		<Modal show={isShowingModal} centered fullscreen='md-down'>
			<Modal.Header
				closeButton
				onHide={() => {
					setIsShowingModal(false)
					setRating(0)
				}}>
				<h3>별점 추가하기</h3>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={addRating}>
					<div className='mt-4 mt-md-0 row justify-content-center'>
						{[1, 2, 3, 4, 5].map((starCount) => {
							return (
								<div className='col-2 col-md-1'>
									<h1
										className='text-warning'
										onClick={() => {
											setRating(starCount)
										}}>
										{starCount <= rating ? <StarFillIcon /> : <StarIcon />}
									</h1>
								</div>
							)
						})}
					</div>

					<Button type='submit' variant='warning' className='mt-5 mt-md-3 w-100'>
						추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddRatingModal
