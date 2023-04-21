import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, Button, Card, Form } from 'react-bootstrap'
// Functions
import { deleteMemo, editMemo } from '../../../functions/memo'
// Settings
import uiSettings from '../../../settings/ui'
// Resources
import '../../../resources/css/input.css'
// Messages
import messages from '../../../settings/messages'

const MemoDetailModal = ({ isModalOpen, setIsModalOpen, memo, setMemo, memoList, setMemoList }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	const [editedPage, setEditedPage] = useState(null)
	const [editedContent, setEditedContent] = useState(null)

	const handleEditMemo = () => {
		if ((editedPage === null && editedContent === null) || (editedPage == memo.page && editedContent == memo.content)) {
			toast.error('수정사항이 없어요')
			setIsEditMode(false)
			return
		}

		const editedMemo = {
			memoId: memo.memoId,
			page: editedPage == null ? memo.page : editedPage,
			content: editedContent == null ? memo.content : editedContent,
		}

		editMemo(editedMemo).then((success) => {
			if (success) {
				toast.success('메모를 수정했어요')

				setMemo(editedMemo)
				setMemoList(
					memoList.map((m) => {
						if (m.memoId == memo.memoId) {
							return editedMemo
						} else {
							return m
						}
					})
				)
			} else {
				toast.error(messages.error)
			}
		})
	}
	const handleDeleteMemo = () => {
		const confirm = window.confirm('메모를 지울까요?')

		if (confirm) {
			deleteMemo(memo.memoId).then((success) => {
				if (success) {
					toast.success('메모를 지웠어요')
					setIsModalOpen(false)
					setMemoList(memoList.filter((m) => m.memoId !== memo.memoId))
				} 
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
		}
	}

	return (
		<Modal
			show={isModalOpen}
			size='lg'
			onHide={() => {
				setIsEditMode(false)
				setIsModalOpen(false)
				setEditedPage(null)
				setEditedContent(null)
			}}
			centered
			fullscreen='md-down'>
			{memo != null && (
				<>
					<Modal.Header closeButton className='text-center'>
						<h4 className='w-100'>📋 메모 자세히 보기</h4>
					</Modal.Header>

					<Modal.Body>
						{isEditMode ? (
							<Form onSubmit={(e) => handleEditMemo(e)}>
								<Card style={{ backgroundColor: uiSettings.color.memo }}>
									<Card.Header>
										<Form.Control
											type='number'
											inputMode='numeric'
											pattern='[0-9]*'
											onChange={(e) => setEditedPage(e.target.value)}
											defaultValue={memo.page}
											value={editedPage}
										/>
									</Card.Header>

									<Card.Body>
										<Form.Control
											as='textarea'
											style={{ height: '200px' }}
											onChange={(e) => setEditedContent(e.target.value)}
											defaultValue={memo.content}
										/>
									</Card.Body>
								</Card>
							</Form>
						) : (
							<Card className='text-center' style={{ backgroundColor: uiSettings.color.memo }}>
								<Card.Header>{memo.page} P</Card.Header>
								<Card.Body>{memo.content}</Card.Body>
							</Card>
						)}

						<div className='row mt-3'>
							<div className='col-6'>
								{isEditMode ? (
									<Button variant='book-danger' className='w-100' onClick={() => setIsEditMode(false)}>
										수정 취소
									</Button>
								) : (
									<Button variant='book-danger' className='w-100' onClick={() => handleDeleteMemo()}>
										메모 삭제하기
									</Button>
								)}
							</div>

							<div className='col-6'>
								{isEditMode ? (
									<Button variant='book' className='w-100' onClick={() => handleEditMemo()}>
										수정 완료
									</Button>
								) : (
									<Button
										variant='book'
										className='w-100'
										onClick={() => {
											setIsEditMode(!isEditMode)
										}}>
										메모 수정하기
									</Button>
								)}
							</div>
						</div>
					</Modal.Body>
				</>
			)}
		</Modal>
	)
}

export default MemoDetailModal
