import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import NoContent from '../common/NoContent'
// Functions
import { addQuotation, getQuotation } from '../../functions/quotation'

const QuotationCard = ({ bookId, currentPage }) => {
	const [quoteList, setQuoteList] = useState(null)

	const [page, setPage] = useState(currentPage)
	const [content, setContent] = useState('')
	const [fromWho, setFromWho] = useState('')

	const handleAdd = (e) => {
		e.preventDefault()

		if (content === '') {
			toast.error('내용을 입력해 주세요')
		}

		const quotation = {
			page: page,
			content: content,
			fromWho: fromWho,
		}

		addQuotation(bookId, quotation).then((isSuccess) => {
			if (isSuccess) {
				setQuoteList([...quoteList, quotation])
				setContent('')
				setFromWho('')
			}
		})
	}

	useEffect(() => {
		getQuotation(bookId).then((quotes) => setQuoteList(quotes))
	}, [])

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>인용</h4>

				<div className='row row-eq-height'>
					{quoteList == null || quoteList.length == 0 ? (
						<NoContent message={`인용이 없어요`} style={{ width: '100px' }} />
					) : (
						quoteList.map((record) => {
							return (
								<div className='col-12 col-md-6'>
									<Card className='h-100'>
										<Card.Header>{record.page}</Card.Header>

										<Card.Body className='d-flex align-items-center justify-content-center'>{record.content}</Card.Body>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={(e) => handleAdd(e)}>
					<div className='row'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='text'
								placeholder='Page'
								className='h-100'
								required
								onChange={(e) => setPage(e.target.value)}
								value={page}
							/>
						</div>

						<div className='col-9 col-sm-5'>
							<Form.Control
								type='text'
								placeholder={`인용을 입력해 주세요`}
								required
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>
						</div>

						<div className='col-8 col-sm-3 mt-2 mt-sm-0'>
							<Form.Control type='text' placeholder='누가 말했나요?' onChange={(e) => setFromWho(e.target.value)} value={fromWho} />
						</div>

						<div className='col-4 col-sm-2 mt-2 mt-sm-0'>
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
