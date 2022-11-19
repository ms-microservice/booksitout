import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button, ProgressBar } from 'react-bootstrap'
// Classification Icons
import LanguageIcon from './info/LanguageIcon'
import CategoryIcon from './info/CategoryIcon'
import SourceIcon from './info/SourceIcon'
import FormIcon from './info/FormIcon'
// Common
import Error from '../common/Error'
import Loading from '../common/Loading'
import NoContent from '../common/NoContent'

const BookDetail = ({ token }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const BOOK_DELETE_API_URL = `http://localhost/v1/book/${id}`
	const BOOK_DETAIL_API_URL = `http://localhost/v1/book/${id}`

	const [notFound, setNotFound] = useState(false)
	const [loading, setLoading] = useState(true)
	const [book, setBook] = useState(null)

	const handleDelete = () => {
		const confirmation = window.confirm('정말 책을 삭제할까요?')

		if (confirmation) {
			fetch(BOOK_DELETE_API_URL, {
				method: 'DELETE',
				headers: { Authorization: token },
			}).then((res) => {
				if (res.status.toString().startsWith(2)) {
					alert('책을 삭제 했어요')
					navigate('/book/done')
				} else {
					alert('알 수 없는 이유로 실패했어요 다시 시도해 주세요')
				}
			})
		}
	}

	useEffect(() => {
		fetch(BOOK_DETAIL_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(4)) {
					setNotFound(true)
				}
				return res.json()
			})
			.then((data) => setBook(data))
			.catch((e) => console.log(e))
			.finally(() => setLoading(false))
	}, [])

	return (
		<div className='container'>
			{notFound ? (
				<Error />
			) : loading ? (
				<Loading message='' />
			) : (
				<div className='row text-center'>
					<div className='col-12 col-md-4 mb-5'>
						<img src={book.cover} alt='' className='img-fluid rounded border' />

						<div className='row mt-3'>
							<div className='col-6'>
								<Button variant='warning' className='w-100'>
									수정하기
								</Button>
							</div>

							<div className='col-6'>
								<Button variant='danger' className='w-100' onClick={handleDelete}>
									삭제하기
								</Button>
							</div>

							<div className='col-12 mt-3'>
								<Button variant='success' className='w-100'>
									이어서 읽기
								</Button>
							</div>
						</div>
					</div>

					<div className='col-12 col-md-8 mb-5'>
						<div className='row mb-4'>
							<h2>{book.title}</h2>
							<h4 className='text-muted'>{book.author == null ? '-' : book.author}</h4>

							<div className='row justify-content-center align-items-center'>
								<div className='col-9'>
									<div className='progress mt-3 mb-3'>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width: ((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100 + '%',
											}}
											aria-valuenow={book.currentPage}
											aria-valuemin={0}
											aria-valuemax={book.endPage}></div>
									</div>
								</div>
								<div className='col-2 align-middle'>
									<span className='align-middle'>{`${book.currentPage == null ? 0 : book.currentPage} / ${book.endPage}`}</span>
								</div>
							</div>
						</div>

						<div className='row justify-content-center'>
							<div className='col-3 col-xl-2'>
								<LanguageIcon language={book.language} />
							</div>
							<div className='col-3 col-xl-2'>
								<CategoryIcon category={book.category} />
							</div>
							<div className='col-3 col-xl-2'>
								<FormIcon form={book.form} />
							</div>
							<div className='col-3 col-xl-2'>
								<SourceIcon source={book.source} />
							</div>
						</div>

						<Card className='mt-3'>
							<Card.Body>
								<h4>독서활동</h4>

								<div className='row justify-content-center'>
									<div className='col-6'>
										<NoContent />
									</div>
								</div>
							</Card.Body>
						</Card>

						<div className='row'>
							<div className='col-12 col-md-6'>
								<Card className='mt-3'>
									<Card.Body>
										<h4>메모</h4>

										<div className='row justify-content-center'>
											<div className='col-12'>
												<NoContent />
											</div>
										</div>
									</Card.Body>
								</Card>
							</div>
							<div className='col-12 col-md-6'>
								<Card className='mt-3'>
									<Card.Body>
										<h4>인용</h4>

										<div className='row justify-content-center'>
											<div className='col-12'>
												<NoContent />
											</div>
										</div>
									</Card.Body>
								</Card>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BookDetail
