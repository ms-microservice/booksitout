import React from 'react'
import toast from 'react-hot-toast'
import { Modal, Form, Button } from 'react-bootstrap'

import { addMemo } from '../../../functions/memo'
import '../../../resources/css/input.css'

const AddMemoModal = ({ modalOpen, setModalOpen, book, memoList, setMemoList }) => {
	const [page, setPage] = React.useState<number | null>(null)
	const [content, setContent] = React.useState<string | null>(null)

	const handleAddMemo = (e) => {
		e.preventDefault()

		if ((page ?? 1) < 0) {
			document.getElementById('page-input')!!.focus()
			toast.error('페이지는 0보다 작을 수 없어요')
			return
		}

		if ((page ?? 0) > book.endPage) {
			document.getElementById('page-input')!!.focus()
			toast.error('메모의 페이지가 책의 마지막 페이지보다 커요')
			return
		}

		if (content == null || content === '') {
			document.getElementById('content-input')!!.focus()
			toast.error('내용을 입력해 주세요')
			return
		}

		const newMemo = {
			page: page ?? null,
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
					<Form.Label>내용</Form.Label>
					<Form.Control as='textarea' type='textarea' onChange={(e) => setContent(e.target.value)} autoFocus id='content-input' />
					<div className='mb-2' />

					<Form.Label type='number'>페이지</Form.Label>
					<Form.Control
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						onChange={(e) => setPage(Number(e.target.value))}
						id='page-input'
					/>
					<div className='mb-2' />

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
