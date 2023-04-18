import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, Button, Form, ToggleButton, ButtonGroup, Modal, Placeholder } from 'react-bootstrap'
import toast from 'react-hot-toast'
import axios from 'axios'
// Images
import defaultBookCover from '../../resources/images/common/default-book-cover.png'
import defaultLoadingBookCover from '../../resources/images/common/loading-default-book-cover.png'
import ImageSearchModal from './ImageSearchModal'
// Functions
import { addBook } from '../..//functions/book'
// Setttings
import messages from '../../settings/messages'
import urls from '../../settings/urls';
import NoContent from '../common/NoContent'
import Error from '../common/Error'
import utils from '../../functions/utils'

const BookAddForm = () => {
	const [selectedMethod, setSelectedMethod] = useState('SEARCH')

	return (
		<div className='container mb-5'>
			<ButtonGroup className='w-100'>
				<ToggleButton
					className='w-100'
					value={'SEARCH'}
					type='radio'
					checked={false}
					onClick={() => setSelectedMethod('SEARCH')}
					variant={selectedMethod === 'SEARCH' ? 'book' : 'light'}>
					검색으로 추가하기
				</ToggleButton>

				<ToggleButton
					className='w-100'
					value={'MANUAL'}
					type='radio'
					checked={false}
					onClick={() => setSelectedMethod('MANUAL')}
					variant={selectedMethod === 'MANUAL' ? 'book' : 'light'}>
					직접 추가하기
				</ToggleButton>
			</ButtonGroup>

			{selectedMethod === 'SEARCH' ? <AddBookSearchCard /> : <AddBookManualCard />}
		</div>
	)
}

const AddBookSearchCard = () => {
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	
	const [query, setQuery] = useState('')
	const [searchResult, setSearchResult] = useState([])
	
	const [selectedBook, setSelectedBook] = useState(null)
	const [endPage, setEndPage] = useState(null)
	const [form, setForm] = useState('PHYSICAL')
	const [source, setSource] = useState('NOT_PROVIDED')
	const [sharing, setSharing] = useState(false)

	const addBook = () => {
		const book = {
			title: selectedBook.title,
			author: selectedBook.author,
			isbn: selectedBook.isbn,
			cover: selectedBook.cover,
			page: endPage,
			form: form,
			source: source,
			sharing: sharing,
		}

		axios
			.post(`${urls.api.base}/v3/book`, book, { headers: { Authorization: utils.getToken() } })
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

	useEffect(() => {
		setLoading(query !== '')

		const typingTimer = setTimeout(() => {
			if (query !== '') {
				axios
					.get(`${urls.api.base}/v3/search/new/naver?query=${query}`)
					.then((res) => setSearchResult(res.data))
					.catch(() => setError(true))
					.finally(() => setLoading(false))
			}
		}, 1000)

		return () => clearTimeout(typingTimer)
	}, [query])

	return (
		<>
			<Modal
				show={modalOpen}
				size='lg'
				fullscreen='sm-down'
				onHide={() => {
					setModalOpen(false)
				}}>
				{selectedBook == null ? (
					<Error />
				) : (
					<>
						<Modal.Header closeButton>
							<h4>{selectedBook.title}</h4>
							<h5 className='text-secondary ms-3'>{selectedBook.author}</h5>
						</Modal.Header>

						<Modal.Body>
							<div className='row justify-content-center'>
								<div className='col-5 col-lg-4'>
									<img src={selectedBook.cover} alt='' className='img-fluid border rounded' />
								</div>

								<div className='col-12 col-lg-8'>
									<Form onSubmit={(e) => handleAddBook(e)}>
										<div className='row'>
											<div className='col-6'>
												<Form.Group className='mb-3' onChange={(e) => setEndPage(e.target.value)}>
													<Form.Label>총 페이지 수</Form.Label>
													<Form.Control
														type='number'
														inputMode='numeric'
														pattern='[0-9]*'
														placeholder={messages.book.placeholder.page}
														required
														autoFocus
													/>
												</Form.Group>
											</div>

											<div className='col-6'>
												<Form.Group className='mb-3' onChange={(e) => setForm(e.target.value)}>
													<Form.Label>책 형태</Form.Label>
													<Form.Select>
														<option value='PHYSICAL'>📄 종이책</option>
														<option value='EBOOK'>🔋 전자책</option>
														<option value='AUDIO'>🎧 오디오북</option>
													</Form.Select>
												</Form.Group>
											</div>

											<div className='col-12'>
												<Form.Group className='mb-3' onChange={(e) => setSource(e.target.value)}>
													<Form.Label>책은 어디서 얻었나요?</Form.Label>
													<Form.Select>
														<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

														<option value='BUY_NEW_OFFLINE'>새 책 - 온라인 서점</option>
														<option value='BUY_NEW_ONLINE'>새 책 - 오프라인 서점</option>

														<option value='BUY_USED_OFFLINE'>중고책 - 오프라인 서점</option>
														<option value='BUY_USED_ONLINE'>중고책 - 온라인 서점</option>

														<option value='LIBRARY'>도서관</option>
														<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
														<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

														<option value='SUBSCRIPTION'>구독</option>

														<opton value='OTHERS'>기타</opton>
													</Form.Select>
												</Form.Group>
											</div>
										</div>

										<Form.Group className='mb-3' controlId='formBasicCheckbox'>
											<Form.Check
												type='checkbox'
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
											<BookAddSearchResultLoading />
										</div>
									)
								})}
						</div>
					) : searchResult.length === 0 ? (
						<div className='row'>
							<div className='mt-1 mt-md-5' />
							<div className='mt-1 mt-md-5' />

							<NoContent message='검색 결과가 없어요' />
						</div>
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
										<BookAddSearchResult book={book} />
									</div>
								)
							})}
						</div>
					)}
				</>
			</div>
		</>
	)
}

const BookAddSearchResult = ({book}) => {
	return (
		<Card className='text-center mt-2 mb-2' style={{height: '250px'}}>
			<Card.Body>
				<img src={book.cover} alt='book cover' className='img-fluid border' style={{ height: '100px' }} />

				<div className='mt-4'>
					<h6>{book.title}</h6>
					<h6 className='text-secondary'>{book.author}</h6>
				</div>
			</Card.Body>
		</Card>
	)
}

const BookAddSearchResultLoading = () => {
	return (
		<Card className='text-center mt-2 mb-2' style={{ height: '250px' }}>
			<Card.Body>
				<img src={defaultLoadingBookCover} alt='book cover' className='img-fluid border mt-4 rounded' style={{ height: '100px' }} />

				<div className='mt-4'>
					<Placeholder as={Card.Text} animation='glow'>
						<Placeholder xs='8' />
						<br />
						<Placeholder xs='5' />
					</Placeholder>
				</div>
			</Card.Body>
		</Card>
	)
}

const AddBookManualCard = () => {
	const navigate = useNavigate()

	// Book Info
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [cover, setCover] = useState('')
	const [endPage, setEndPage] = useState(0)
	const [language, setLanguage] = useState('KOREAN')
	const [category, setCategory] = useState('LITERATURE')
	const [isSharing, setIsSharing] = useState(false)
	const [form, setForm] = useState('PHYSICAL')
	const [source, setSource] = useState('NOT_PROVIDED')

	const [showModal, setShowModal] = useState(false)
	const openModal = () => {
		if (title !== '') {
			setShowModal(true)
		} else {
			toast.error('표지를 검색하기 위해 책 제목을 입력해 주세요')
		}
	}

	const handleAddBook = (e) => {
		e.preventDefault()
		toast.loading('책을 추가하고 있어요')

		if (endPage == 0) {
			toast.error('0은 페이지로 입력할 수 없어요')
			return
		}

		const book = {
			title: title,
			author: author,
			cover: cover,
			language: language,
			endPage: endPage,
			category: category,
			form: form,
			source: source,
			isSharing: isSharing,
		}

		addBook(book).then((success) => {
			if (success) {
				toast.success('책을 추가했어요')
				navigate('/book/not-done/all')
			} else {
				toast.error(messages.error)
			}
		})
	}	

	const handleReset = () => {
		setTitle('')
		setAuthor('')
	}

return (
	<div className='row justify-content-center mt-4'>
		<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

		<Card className='col-12 col-md-8'>
			<Card.Body>
				<Form onSubmit={(e) => handleAddBook(e)} className='h-100 container mt-3 mb-3 text-start' onReset={handleReset}>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<Form.Group className='mb-3'>
								<Form.Label>책 제목</Form.Label>
								<Form.Control
									type='text'
									placeholder={messages.book.placeholder.title}
									required
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>
						</div>

						<div className='col-12 col-md-6'>
							<Form.Group className='mb-3'>
								<Form.Label>저자</Form.Label>
								<Form.Control
									type='text'
									placeholder={messages.book.placeholder.author}
									required
									onChange={(e) => setAuthor(e.target.value)}
								/>
							</Form.Group>
						</div>
					</div>

					<Button className='w-100 mt-2 mb-3' onClick={openModal} variant={title !== '' ? 'book' : 'secondary'}>
						책 표지 검색
					</Button>

					<hr />

					<div className='row'>
						<div className='col-6 col-md-4'>
							<Form.Group className='mb-3' onChange={(e) => setLanguage(e.target.value)}>
								<Form.Label>책 언어</Form.Label>
								<Form.Select>
									<option value='KOREAN'>🇰🇷 한국어</option>
									<option value='ENGLISH'>🇺🇸 영어</option>
									<option value='JAPANESE'>🇯🇵 일본어</option>
									<option value='CHINESE'>🇨🇳 중국어</option>

									<option value='FRENCH'>🇫🇷 프랑스어</option>
									<option value='SPANISH'>🇪🇸 스페인어 </option>
								</Form.Select>
							</Form.Group>
						</div>

						<div className='col-6 col-md-4'>
							<Form.Group>
								<Form.Label>장르</Form.Label>
								<Form.Select onChange={(e) => setCategory(e.target.value)}>
									<option value='LITERATURE'>문학</option>

									<option value='NATURAL_SCIENCE'>자연과학</option>
									<option value='SOCIAL_SCIENCE'>사회과학</option>
									<option value='TECHNOLOGY'>기술</option>

									<option value='PHILOSOPHY'>철학</option>
									<option value='LANGUAGE'>언어</option>
									<option value='ART'>예술</option>
									<option value='HISTORY'>역사</option>

									<option value='RELIGION'>종교</option>

									<option value='OTHERS'>기타</option>
								</Form.Select>
							</Form.Group>
						</div>

						<div className='col-6 col-md-4'>
							<Form.Group className='mb-3' onChange={(e) => setEndPage(e.target.value)}>
								<Form.Label>총 페이지 수</Form.Label>
								<Form.Control
									type='number'
									inputMode='numeric'
									pattern='[0-9]*'
									placeholder={messages.book.placeholder.page}
									required
								/>
							</Form.Group>
						</div>

						<div className='col-6'>
							<Form.Group className='mb-3' onChange={(e) => setForm(e.target.value)}>
								<Form.Label>책 형태</Form.Label>
								<Form.Select>
									<option value='PHYSICAL'>📄 종이책</option>
									<option value='EBOOK'>🔋 전자책</option>
									<option value='AUDIO'>🎧 오디오북</option>
								</Form.Select>
							</Form.Group>
						</div>

						<div className='col-12 col-md-6'>
							<Form.Group className='mb-3' onChange={(e) => setSource(e.target.value)}>
								<Form.Label>책은 어디서 얻었나요?</Form.Label>
								<Form.Select>
									<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

									<option value='BUY_NEW_OFFLINE'>새 책 - 온라인 서점</option>
									<option value='BUY_NEW_ONLINE'>새 책 - 오프라인 서점</option>

									<option value='BUY_USED_OFFLINE'>중고책 - 오프라인 서점</option>
									<option value='BUY_USED_ONLINE'>중고책 - 온라인 서점</option>

									<option value='LIBRARY'>도서관</option>
									<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
									<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

									<option value='SUBSCRIPTION'>구독</option>

									<opton value='OTHERS'>기타</opton>
								</Form.Select>
							</Form.Group>
						</div>
					</div>

					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
						<Form.Check
							type='checkbox'
							label='다른 사람이 내 독서활동을 볼 수 있도록 하기'
							onChange={() => setIsSharing(!isSharing)}
							style={{ whiteSpace: 'nowrap' }}
						/>
					</Form.Group>

					<div className='row justify-content-center align-items-end mt-1 mt-md-5'>
						<div className='mt-1 mt-md-5 d-block'></div>
						<div className='mt-3 mt-md-3 d-block'></div>

						<div className='col-6'>
							<Button variant='book-danger' type='reset' className='w-100'>
								다시 입력하기
							</Button>
						</div>

						<div className='col-6'>
							<Button variant='book' type='submit' className='w-100'>
								추가하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	</div>
)
}

export default BookAddForm
