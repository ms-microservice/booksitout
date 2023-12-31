import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import NoContent from '../common/NoContent'
import { addMemo } from '../functions/memo'
import messages from '../settings/messages'
import uiSettings from '../settings/ui';
import EditorForm from '../common/editor/EditorForm'

const MemoCard = ({ book, memoList, setMemoList, setSelectedMemo, setIsModalOpen }) => {
	const [page, setPage] = React.useState<number>(book.currentPage)
	const [content, setContent] = React.useState<string>('')

	const addMemoFunction = (e) => {
		e.preventDefault()

		if (content === '') {
			document.getElementById('content-input')!!.focus()
			toast.error('메모 내용을 입력해 주세요')
			return
		}

		const memo = {
			content: content,
			page: page === 0 ? null : page,
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
						<NoContent message={messages.memo.noContent} move={0} />
					) : (
						memoList.map((memo) => {
							return (
								<div className='col-12 mb-3'>
									<Card
										style={{ backgroundColor: uiSettings.color.memo }}
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
					<EditorForm placeholder={messages.memo.placeholder.content} setContent={setContent}/>

					<div className='row justify-content-end mt-2'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='number'
								inputMode='numeric'
								pattern='[0-9]*'
								placeholder='PAGE'
								className='h-100'
								onChange={(e) => setPage(Number(e.target.value))}
								value={page === 0 ? '' : page}
							/>
						</div>

						<div className='col-4 col-sm-4'>
							<Button type='submit' variant='book' className='w-100 h-100'>
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
