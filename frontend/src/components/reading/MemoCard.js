import React, { useEffect, useState } from 'react'
import NoContent from '../common/NoContent'
import { Card, Button, Form } from 'react-bootstrap'
import { getMemo, addMemo } from '../../functions/memo'

const MemoCard = ({ bookId, currentPage }) => {
	const [memoList, setMemoList] = useState(null)
	useEffect(() => {
		getMemo(bookId).then((memos) => setMemoList(memos))
	}, [])

	const [page, setPage] = useState(currentPage)
	const [content, setContent] = useState('')

	const addMemoFunction = (e) => {
		e.preventDefault()

		const memo = {
			content: content,
			page: page,
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
					{memoList == null || memoList.length == 0 ? (
						<NoContent message={`메모가 없어요`} style={{ width: '100px' }} />
					) : (
						memoList.map((record) => {
							return (
								<div className='col-6 col-md-4 mb-3'>
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
								placeholder={`메모를 입력해 주세요`}
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
