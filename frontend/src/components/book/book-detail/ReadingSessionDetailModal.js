import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { deleteReadingSession } from '../../../functions/reading'
import toast from 'react-hot-toast'

const ReadingSessionDetailModal = ({ isModalOpen, setIsModalOpen, readingSession, readingSessionList, setReadingSessionList, book, setBook }) => {
	const handleDeleteReadingSession = () => {
		if (book.currentPage != readingSession.endPage) {
			toast.error('가장 최근의 독서활동만 지울 수 있어요')
			return
		}

		const confirm = window.confirm('이 독서활동을 지울까요?')

		if (confirm) {
			deleteReadingSession(readingSession.readingSessionId).then((success) => {
				if (success) {
					toast.success('독서활동을 지웠어요')
					setReadingSessionList(readingSessionList.filter((reading) => reading.readingSessionId !== readingSession.readingSessionId))
					setBook({ ...book, currentPage: readingSession.startPage })
					setIsModalOpen(false)
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>독서활동 자세히 보기</h4>
			</Modal.Header>

			{readingSession != null && (
				<Modal.Body>
					<div className='row'>
						<h5 className='mb-3'>
							🗓️{' '}
							{readingSession.startTime
								.replace('-', '년 ')
								.replace('-', '월 ')
								.replace('T', '일 ')
								.replace(':', '시 ')
								.replace(':', '분 ')
								.substring(0, 21)}{' '}
							부터
						</h5>
						<h5 className='mb-3'>
							🗓️{' '}
							{readingSession.endTime
								.replace('-', '년 ')
								.replace('-', '월 ')
								.replace('T', '일 ')
								.replace(':', '시 ')
								.replace(':', '분 ')
								.substring(0, 21)}{' '}
							까지
						</h5>
						<h5 className='mb-3'>⏰ {readingSession.readTime}분 동안</h5>
						<h5 className='mb-3'>
							📃 {readingSession.startPage}P 부터 {readingSession.endPage}P 까지
						</h5>
						<h5 className='mb-3'>📃 {readingSession.endPage - readingSession.startPage + 1}P 읽었어요</h5>
					</div>
					<div className='row'>
						<div className='col-6'>
							<Button variant='warning' className='w-100' disabled>
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
