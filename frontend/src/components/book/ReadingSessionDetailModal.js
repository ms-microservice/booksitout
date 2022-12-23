import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { deleteReadingSession } from '../../functions/reading'
import toast from 'react-hot-toast'

const ReadingSessionDetailModal = ({ isModalOpen, setIsModalOpen, readingSession, readingSessionList, setReadingSessionList }) => {
	const handleDeleteReadingSession = () => {
		const confirm = window.confirm('이 독서활동을 지울까요?')

		if (confirm) {
			deleteReadingSession(readingSession.readingSessionId).then((success) => {
				if (success) {
					toast.success('독서활동을 지웠어요')
					setReadingSessionList(readingSessionList.filter((reading) => reading.readingSessionId !== readingSession.readingSessionId))
					setIsModalOpen(false)
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header closeButton></Modal.Header>

			{readingSession != null && (
				<Modal.Body>
					<div className='row'>
						<h5>
							🗓️{' '}
							{readingSession.startTime
								.replace('-', '년 ')
								.replace('-', '월 ')
								.replace('T', '일 ')
								.replace(':', '시 ')
								.replace(':', '분 ')}
						</h5>
						<h5>
							🗓️{' '}
							{readingSession.endTime
								.replace('-', '년 ')
								.replace('-', '월 ')
								.replace('T', '일 ')
								.replace(':', '시 ')
								.replace(':', '분 ')}
						</h5>
						<h5>⏰ {readingSession.readTime}</h5>
						<h5>📃 {readingSession.startPage}</h5>
						<h5>📃 {readingSession.endPage}</h5>
					</div>
					<div className='row'>
						<div className='col-6'>
							<Button variant='warning' className='w-100'>
								수정하기
							</Button>
						</div>
						<div className='col-6' onClick={() => handleDeleteReadingSession()}>
							<Button variant='danger' className='w-100'>
								삭제하기
							</Button>
						</div>
					</div>
				</Modal.Body>
			)}
		</Modal>
	)
}

export default ReadingSessionDetailModal
