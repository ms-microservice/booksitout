import { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, Form, Button } from 'react-bootstrap'

import { addMemo } from '../../../functions/memo'
import '../../../resources/css/input.css'

const AddMemoModal = ({ modalOpen, setModalOpen, book, memoList, setMemoList }) => {
	const [page, setPage] = useState(null)
	const [content, setContent] = useState(null)

	const handleAddMemo = (e) => {
		e.preventDefault()

		if (page < 0) {
			document.getElementById('page-input').focus()
			toast.error('페이지는 0보다 작을 수 없어요')
			return
		}

		if (page > book.endPage) {
			document.getElementById('page-input').focus()
			toast.error('메모의 페이지가 책의 마지막 페이지보다 커요')
			return
		}

		if (content == null || content === '') {
			document.getElementById('content-input').focus()
			toast.error('내용을 입력해 주세요')
			return
		}

		const newMemo = {
			page: page,
			content: content,
		}

		addMemo(newMemo, book.bookId).then((success) => {
			if (success) {
				toast.success('메모를 추가했어요')
				setMemoList([...memoList, newMemo])
				setPage(null)
				setContent(null)
				setModalOpen(false)
			} else {
				toast.error('오류가 났어요 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Modal show={modalOpen} onHide={() => setModalOpen(false)} fullscreen='md-down' centered>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>📋 메모 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddMemo(e)}>
					<Form.Label type='number'>페이지</Form.Label>
					<Form.Control type='number' inputMode='numeric' pattern='[0-9]*' onChange={(e) => setPage(e.target.value)} id='page-input' />

					<Form.Label className='mt-2'>내용</Form.Label>
					<Form.Control as='textarea' type='textarea' onChange={(e) => setContent(e.target.value)} autoFocus id='content-input' />

					<div className='row'>
						<div className='col-12 col-md-6'>
							<Button variant='book-danger' className='w-100 mt-3' onClick={() => setModalOpen(false)}>
								취소
							</Button>
						</div>

						<div className='col-12 col-md-6'>
							<Button variant='book' type='submit' className='w-100 mt-3'>
								추가하기
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddMemoModal
