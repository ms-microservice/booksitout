import React from 'react'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'
import axios from 'axios'
import { Button, Form, ToggleButton, ButtonGroup, Modal } from 'react-bootstrap'


import messages from '../../../settings/messages'
import urls from '../../../settings/urls'
import NoContent from '../../common/NoContent'
import Error from '../../common/Error'
import utils from '../../../functions/utils'

import '../../../resources/css/addBookModal.css'
import AddBookSearchResult from '../../search/AddBookSearchResult';
import AddBookSearchResultLoading from '../../search/AddBookSearchResultLoading';
import { BookUserType } from '../../../types/BookType'


const AddBookSearchForm = () => {
	const navigate = useNavigate()

	const [error, setError] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
	const [modalOpen, setModalOpen] = React.useState<boolean>(false)

	const [query, setQuery] = React.useState<string>('')
	const [searchResult, setSearchResult] = React.useState([])

	const [selectedBook, setSelectedBook] = React.useState<BookUserType | null>(null)
	const [endPage, setEndPage] = React.useState<number | null>(null)
	const [form, setForm] = React.useState<string>('PHYSICAL')
	const [source, setSource] = React.useState<string>('NOT_PROVIDED')
	const [sharing, setSharing] = React.useState<boolean>(true)

	const addBook = () => {
		const lastBracketIndex = selectedBook?.title.lastIndexOf('(') === -1 ? selectedBook?.title.length : selectedBook?.title.lastIndexOf('(') ?? 0

		const book = {
			title: selectedBook?.title.slice(0, lastBracketIndex),
			author: selectedBook?.author.replaceAll('^', ', '),
			isbn: selectedBook?.isbn,
			cover: selectedBook?.cover,
			page: endPage,
			form: form,
			source: source,
			sharing: sharing,
		}

		axios
			.post(`${urls.api.base}/v4/book`, book, { headers: { Authorization: utils.getToken() } })
			.then((res) => {
				return res.status
			})
			.then((status) => {
				toast.success('책을 추가했어요')
				navigate('/book/not-done/all')
			})
			.catch((e) => {
				toast.error(`오류가 났어요. 잠시 후 다시 시도해 주세요 (${e})`)
			})
	}

	const handleAddBook = (e) => {
		e.preventDefault()
		addBook()
	}

	React.useEffect(() => {
		setLoading(query !== '')

		if (query === '') {
			setSearchResult([])
			return
		}

		const typingTimer = setTimeout(() => {
			if (query !== '') {
				axios
					.get(`${urls.api.base}/v3/search/new/naver?query=${query}`)
					.then((res) => setSearchResult(res.data))
					.catch(() => setError(true))
					.finally(() => setLoading(false))
			}
		}, 500)

		return () => clearTimeout(typingTimer)
	}, [query])

	return (
		<>
			<Modal id='add-book-modal' show={modalOpen} size='lg' fullscreen='sm-down' onHide={() => setModalOpen(false)} centered>
				{selectedBook == null ? (
					<Error />
				) : (
					<>
						<Modal.Header closeButton>
							<h4 className='mb-0'>
								{selectedBook.title}
								<br />
								<h5 className='text-secondary mb-0'>{selectedBook.author}</h5>
							</h4>
						</Modal.Header>

						<Modal.Body>
							<div className='row justify-content-center'>
								<div className='col-5 col-lg-4'>
									<img src={selectedBook.cover} alt='' className='img-fluid border rounded' />
								</div>

								<div className='col-12 col-lg-8 mt-3 mt-lg-0'>
									<Form onSubmit={(e) => handleAddBook(e)}>
										<div className='row'>
											<div className='col-6'>
												<Form.Group className='mb-3'>
													<Form.Label>총 페이지 수</Form.Label>
													<Form.Control
														type='number'
														inputMode='numeric'
														pattern='[0-9]*'
														onChange={(e) => setEndPage(Number(e.target.value))}
														placeholder={messages.book.placeholder.add.page}
														required
														autoComplete='off'
														autoFocus
													/>
												</Form.Group>
											</div>

											<div className='col-6'>
												<Form.Group className='mb-3'>
													<Form.Label>책 형태</Form.Label>
													<Form.Select onChange={(e) => setForm(e.target.value)}>
														<option value='PHYSICAL'>📄 종이책</option>
														<option value='EBOOK'>🔋 전자책</option>
														<option value='AUDIO'>🎧 오디오북</option>
													</Form.Select>
												</Form.Group>
											</div>

											<p className='text-secondary text-center mb-4'>페이지를 추가하지 않으면 독서활동을 기록할 수 없어요</p>

											<div className='col-12'>
												<Form.Group className='mb-3'>
													<Form.Label>책은 어디서 얻었나요?</Form.Label>
													<Form.Select onChange={(e) => setSource(e.target.value)}>
														<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

														<option value='BUY_NEW_OFFLINE'>새 책 - 온라인 서점</option>
														<option value='BUY_NEW_ONLINE'>새 책 - 오프라인 서점</option>

														<option value='BUY_USED_OFFLINE'>중고책 - 오프라인 서점</option>
														<option value='BUY_USED_ONLINE'>중고책 - 온라인 서점</option>

														<option value='LIBRARY'>도서관</option>
														<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
														<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

														<option value='SUBSCRIPTION'>구독</option>

														<option value='OTHERS'>기타</option>
													</Form.Select>
												</Form.Group>
											</div>
										</div>

										<Form.Group className='mb-3' controlId='formBasicCheckbox'>
											<Form.Check
												type='checkbox'
												checked={sharing}
												label='다른 사람이 내 독서활동을 볼 수 있도록 하기'
												onChange={() => setSharing(!sharing)}
											/>
										</Form.Group>

										<div className='row mt-5'>
											<div className='mt-1 mt-lg-5 d-block' />
											<div className='mt-1 mt-lg-5 d-block' />
											<div className='mt-1 mt-lg-3 d-block' />

											<div className='col-6'>
												<Button variant='book-danger' className='w-100' type='reset'>
													다시 입력
												</Button>
											</div>

											<div className='col-6'>
												<Button variant='book' className='w-100' type='submit'>
													추가하기
												</Button>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</Modal.Body>
					</>
				)}
			</Modal>

			<div className='container mt-3'>
				<div className='row justify-content-center'>
					<div className='col-12 col-md-8'>
						<Form.Control
							placeholder='책 제목 / 저자를 검색해 주세요'
							className='mb-3 mt-2'
							onChange={(e) => setQuery(e.target.value)}
							autoComplete='off'
							autoFocus
						/>
					</div>
				</div>

				<>
					{loading ? (
						<div className='row'>
							{Array(8)
								.fill(0)
								.map(() => {
									return (
										<div className='col-6 col-md-3'>
											<AddBookSearchResultLoading />
										</div>
									)
								})}
						</div>
					) : searchResult.length === 0 ? (
						<NoContent message='검색 결과가 없어요' useImage={false} iconSize='10em' textSize='h2' mt='50px' />
					) : (
						<div className='row'>
							{searchResult.map((book) => {
								return (
									<div
										className='col-6 col-md-3'
										onClick={() => {
											setModalOpen(true)
											setSelectedBook(book)
										}}>
										<AddBookSearchResult book={book} />
									</div>
								)
							})}
						</div>
					)}
				</>
			</div>
		</>
	)}

export default AddBookSearchForm