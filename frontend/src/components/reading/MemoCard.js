import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import NoContent from '../common/NoContent'
// Functions
import { addMemo } from '../../functions/memo'
import messages from '../../settings/messages'

const MemoCard = ({ book, memoList, setMemoList, setSelectedMemo, setIsModalOpen }) => {
	const [page, setPage] = useState(book.currentPage)
	const [content, setContent] = useState('')

	const addMemoFunction = (e) => {
		e.preventDefault()

		const memo = {
			content: content,
			page: page === 0 || page === '' ? null : page,
		}

		addMemo(memo, book.bookId).then((isSuccess) => {
			if (isSuccess) {
				toast.success('메모를 추가했어요')
				setMemoList([...memoList, memo])
				setContent('')
			} else {
				toast.error('오류가 났어요 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>📋 메모</h4>

				<div className='row row-eq-height'>
					{memoList == null || memoList.length === 0 ? (
						<NoContent message={messages.memo.noContent} style={{ width: '100px' }} />
					) : (
						memoList.map((memo) => {
							return (
								<div className='col-12 mb-3'>
									<Card
										className='h-100'
										onClick={() => {
											setIsModalOpen(true)
											setSelectedMemo(memo)
										}}>
										<Card.Header>{memo.page}P</Card.Header>
										<Card.Body className='d-flex align-items-center justify-content-center'>{memo.content}</Card.Body>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={addMemoFunction}>
					<Form.Control
						as='textarea'
						rows='3'
						type='text'
						placeholder={messages.memo.placeholder.content}
						required
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>

					<div className='row justify-content-end mt-2'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='text'
								placeholder='PAGE'
								className='h-100'
								required
								onChange={(e) => setPage(e.target.value)}
								value={page == 0 ? '' : page}
							/>
						</div>

						<div className='col-4 col-sm-4'>
							<Button type='submit' variant='success' className='w-100 h-100'>
								등록
							</Button>
						</div>
					</div>
				</Form>
			</Card.Footer>
		</Card>
	)
}

export default MemoCard
