import React, { useEffect, useState } from 'react'
import NoContent from '../../common/NoContent'
import { Card, Button, Form } from 'react-bootstrap'
import { getMemo, addMemo } from '../../resources/functions/memo'

const MemoCard = ({ bookId }) => {
	const [memoList, setMemoList] = useState(null)
	useEffect(() => {
		getMemo(bookId, setMemoList)
	}, [])

	const [page, setPage] = useState(0)
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
					<div className='row'>
						<div className='col-3 col-md-2'>
							<Form.Control
								type='number'
								placeholder='Page'
								className='h-100'
								required
								onChange={(e) => setPage(e.target.value)}
								value={page}
							/>
						</div>

						<div className='col-7 col-md-8'>
							<Form.Control
								type='text'
								placeholder={`메모를 입력해 주세요`}
								required
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>
						</div>

						<div className='col-2'>
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
