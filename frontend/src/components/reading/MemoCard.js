import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
// Components
import NoContent from '../common/NoContent'
// Functions
import { getMemoListOfBook, addMemo } from '../../functions/memo'
import { MEMO_CONTENT_PLACEHOLDER, MEMO_EMPTY } from '../../messages/readingMessages'

const MemoCard = ({ bookId, currentPage: bookCurrentPage }) => {
	const [memoList, setMemoList] = useState(null)
	useEffect(() => {
		getMemoListOfBook(bookId).then((memos) => setMemoList(memos))
	}, [])

	const [page, setPage] = useState(bookCurrentPage)
	const [content, setContent] = useState('')

	const addMemoFunction = (e) => {
		e.preventDefault()

		const memo = {
			content: content,
			page: page === 0 || page === '' ? null : page,
		}

		addMemo(memo, bookId).then((isSuccess) => {
			if (isSuccess) {
				setMemoList([...memoList, memo])
				setContent('')
			}
		})
	}

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>메모</h4>

				<div className='row row-eq-height'>
					{memoList == null || memoList.length === 0 ? (
						<NoContent message={MEMO_EMPTY} style={{ width: '100px' }} />
					) : (
						memoList.map((record) => {
							return (
								<div className='col-12 col-md-6'>
									<Card className='h-100'>
										<Card.Header>{record.page}</Card.Header>
										<Card.Body className='d-flex align-items-center justify-content-center'>{record.content}</Card.Body>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={addMemoFunction}>
					<div className='row justify-content-end'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='text'
								placeholder='Page'
								className='h-100'
								required
								onChange={(e) => setPage(e.target.value)}
								value={page}
							/>
						</div>

						<div className='col-9 col-sm-8'>
							<Form.Control
								type='text'
								placeholder={MEMO_CONTENT_PLACEHOLDER}
								required
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>
						</div>

						<div className='col-4 col-sm-2 mt-2 mt-sm-0'>
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
