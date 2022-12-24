import React from 'react'
import toast from 'react-hot-toast'
import { Modal, Button, Card } from 'react-bootstrap'
import { deleteMemo } from '../../../functions/memo'
import { MEMO_BACKGROUND_COLOR } from '../../../settings/color'

const MemoDetailModal = ({ isModalOpen, setIsModalOpen, memo, memoList, setMemoList }) => {
	const handleEditMemo = () => {}
	const handleDeleteMemo = () => {
		const confirm = window.confirm('메모를 지울까요?')

		if (confirm) {
			deleteMemo(memo.memoId).then((success) => {
				if (success) {
					setIsModalOpen(false)
					setMemoList(memoList.filter((m) => m.memoId !== memo.memoId))
					toast.error('메모를 지웠어요')
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			{memo != null && (
				<>
					<Modal.Header closeButton className='text-center'>
						<h4 className='w-100'>📋 메모 자세히 보기</h4>
					</Modal.Header>

					<Modal.Body>
						<Card className='text-center' style={{ backgroundColor: MEMO_BACKGROUND_COLOR }}>
							<Card.Header>{memo.page} P</Card.Header>

							<Card.Body>{memo.content}</Card.Body>
						</Card>

						<div className='row mt-3'>
							<div className='col-6'>
								<Button variant='warning' className='w-100' onClick={() => handleEditMemo()} disabled>
									메모 수정하기
								</Button>
							</div>

							<div className='col-6'>
								<Button variant='danger' className='w-100' onClick={() => handleDeleteMemo()}>
									메모 삭제하기
								</Button>
							</div>
						</div>
					</Modal.Body>
				</>
			)}
		</Modal>
	)
}

export default MemoDetailModal
