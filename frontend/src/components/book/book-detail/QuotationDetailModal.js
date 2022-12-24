import React from 'react'
import toast from 'react-hot-toast'
import { Modal, Button, Card } from 'react-bootstrap'
import { deleteQuotation } from '../../../functions/quotation'

const QuotationDetailModal = ({ isModalOpen, setIsModalOpen, quotation, quotationList, setQuotationList }) => {
	const handleDeleteQuotation = () => {
		const confirm = window.confirm('이 인용을 지울까요?')

		if (confirm) {
			deleteQuotation(quotation.quotationId).then((success) => {
				if (success) {
					setQuotationList(quotationList.filter((q) => q.quotationId !== quotation.quotationId))
					setIsModalOpen(false)
					toast.success('인용을 삭제했어요')
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>인용 자세히보기</h4>
			</Modal.Header>

			<Modal.Body>
				{quotation != null && (
					<Card className='text-center'>
						<Card.Header>{quotation.page}</Card.Header>
						<Card.Body>{quotation.content}</Card.Body>
						<Card.Footer>{quotation.from_who == null || quotation.from_who === '' ? '-' : quotation.from_who}</Card.Footer>
					</Card>
				)}

				<div className='row mt-3'>
					<div className='col-6'>
						<Button variant='warning' className='w-100' disabled>
							수정하기
						</Button>
					</div>

					<div className='col-6'>
						<Button variant='danger' className='w-100' onClick={() => handleDeleteQuotation()}>
							삭제하기
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default QuotationDetailModal
