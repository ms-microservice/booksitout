import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import NoContent from '../common/NoContent'
// Functions
import { addQuotation } from '../../functions/quotation'
// Messages
import messages from '../../settings/messages'

const QuotationCard = ({ book, quotationList, setQuotationList, setSelectedQuotation, setIsModalOpen }) => {
	const [page, setPage] = useState(book.currentPage)
	const [content, setContent] = useState('')
	const [fromWho, setFromWho] = useState('')

	const handleAdd = (e) => {
		e.preventDefault()

		if (content === '') {
			toast.error(messages.quotation.add.fail.contentNull)
			return
		}

		const quotation = {
			page: page,
			content: content,
			fromWho: fromWho,
		}

		addQuotation(book.bookId, quotation).then((isSuccess) => {
			if (isSuccess) {
				setQuotationList([...quotationList, quotation])
				setContent('')
				setFromWho('')
				toast.success('인용을 추가했어요')
			} else {
				toast.error('오류가 났어요 잠시후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>🗣️ 인용</h4>

				<div className='row row-eq-height'>
					{quotationList == null || quotationList.length === 0 ? (
						<NoContent message={messages.quotation.noContent} style={{ width: '100px' }} />
					) : (
						quotationList.map((quotation) => {
							return (
								<div className='col-12 mb-3'>
									<Card
										className='h-100'
										onClick={() => {
											setIsModalOpen(true)
											setSelectedQuotation(quotation)
										}}>
										<Card.Header>{quotation.page}P</Card.Header>
										<Card.Body className='d-flex align-items-center justify-content-center'>{quotation.content}</Card.Body>
										<Card.Footer>{quotation.fromWho == null || quotation.fromWho === '' ? '-' : quotation.fromWho}</Card.Footer>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={(e) => handleAdd(e)}>
					<Form.Control
						as='textarea'
						rows='3'
						type='text'
						placeholder={messages.quotation.placeholder.content}
						required
						onChangeCapture={(e) => setContent(e.target.value)}
						value={content}
					/>
					<div className='row mt-2 justify-content-end'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='text'
								placeholder='PAGE'
								className='h-100'
								onChange={(e) => setPage(e.target.value)}
								value={page == 0 ? '' : page}
							/>
						</div>

						<div className='col-9 col-sm-6'>
							<Form.Control
								type='text'
								placeholder={messages.quotation.placeholder.fromWho}
								onChange={(e) => setFromWho(e.target.value)}
								value={fromWho}
							/>
						</div>

						<div className='col-4 col-sm-4 mt-4 mt-sm-0 text-end'>
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

export default QuotationCard
