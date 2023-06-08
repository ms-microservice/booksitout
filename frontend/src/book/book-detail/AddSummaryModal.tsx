import React from 'react'
import toast from 'react-hot-toast'
import { Modal, Form, Button } from 'react-bootstrap'

import { addSummary } from '../../functions/book'

const AddSummaryModal = ({ isModalOpen, setIsModalOpen, book, setBook }) => {
	const [summary, setSummary] = React.useState('')

	const handleAddSummary = (e) => {
		e.preventDefault()

		if (summary === '') {
			toast.error('요약을 입력해 주세요')
			return
		}

		addSummary(book.bookId, summary).then((success) => {
			if (!success) return

			setBook({ ...book, summary: summary })
			setIsModalOpen(false)
			toast.success('요약을 추가했어요')
		})
	}

	return (
		<Modal show={isModalOpen} fullscreen='md-down' onHide={() => setIsModalOpen(false)} backdrop='static' centered>
			<Modal.Header closeButton onHide={() => setIsModalOpen(false)} className='text-center'>
				<h4 className='w-100'>요약 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddSummary(e)}>
					<Form.Control as='textarea' onChange={(e) => setSummary(e.target.value)} placeholder='여기에 요약을 입력해 주세요' autoFocus />

					<Button variant='book' type='submit' className='w-100 mt-3'>
						요약 추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddSummaryModal