import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Form, Modal } from 'react-bootstrap'
import messages from '../../settings/messages'
import NoContent from '../../common/NoContent'
import Error from '../../common/Error'
import './addBookModal.css'
import AddBookSearchResult from '../../search/AddBookSearchResult';
import AddBookSearchResultLoading from '../../search/AddBookSearchResultLoading';
import { BookAddSearchResult } from '../../types/BookType'
import { booksitoutServer } from '../../functions/axios'
import AddBookSearchInfoCard from './AddBookSearchInfoCard'
import booksitoutIcon from '../../common/icons/booksitoutIcon';
import { getLanguageKoreanLabel } from '../../functions/language'
import defaultBookCover from '../../images/placeholder/default-book-cover.png'

const AddBookSearchForm = () => {
	const navigate = useNavigate()

	const [error, setError] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
	const [modalOpen, setModalOpen] = React.useState<boolean>(false)

	const [query, setQuery] = React.useState<string>('')
	const [searchResult, setSearchResult] = React.useState<BookAddSearchResult[]>([])
	const [selectedBook, setSelectedBook] = React.useState<BookAddSearchResult | null>(null)

	const [userAddedPage, setUserAddedPage] = React.useState<number | null>(null)
	const [form, setForm] = React.useState<string>('PHYSICAL')
	const [sharing, setSharing] = React.useState<boolean>(true)
	const [source, setSource] = React.useState<string>('NOT_PROVIDED')

	const [additionalSearch, setAdditionalSearch] = React.useState<boolean>(false)

	const addBook = () => {
		let page: number | null = userAddedPage

		if (page === null || page === 0) {
			if (selectedBook?.page == null) {
				toast.error('페이지 정보가 없어요. 페이지를 입력해 주세요')
				document.getElementById('page-input')!!.focus()
				return
			} else {
				page = selectedBook.page
			}
		}

		const book = {
			title: selectedBook?.title,
			author: selectedBook?.author.replaceAll('^', ', '),
			isbn: selectedBook?.isbn,
			cover: selectedBook?.cover,
			page: page,
			form: form,
			source: source,
			sharing: sharing,
		}

		booksitoutServer
			.post(`/v4/book`, book)
			.then(() => {
				toast.success('책을 추가했어요')
				navigate('/book/not-done/all')
			})
			.catch((e) => toast.error(`오류가 났어요. 잠시 후 다시 시도해 주세요 (${e})`))
	}

	// const addNaverBook = () => {
	// 	const lastBracketIndex = selectedBook?.title.lastIndexOf('(') === -1 ? selectedBook?.title.length : selectedBook?.title.lastIndexOf('(') ?? 0

	// 	const book = {
	// 		title: selectedBook?.title.slice(0, lastBracketIndex),
	// 		author: selectedBook?.author.replaceAll('^', ', '),
	// 		isbn: selectedBook?.isbn,
	// 		cover: selectedBook?.cover,
	// 		page: userAddedPage,
	// 		form: form,
	// 		source: source,
	// 		sharing: sharing,
	// 	}

	// 	booksitoutServer
	// 		.post(`/v4/book`, book)
	// 		.then(() => {
	// 			toast.success('책을 추가했어요')
	// 			navigate('/book/not-done/all')
	// 		})
	// 		.catch((e) => toast.error(`오류가 났어요. 잠시 후 다시 시도해 주세요 (${e})`))
	// 	}

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
				setAdditionalSearch(false)

				booksitoutServer
					.get(`v5/book-isbn?query=${query}&size=12`)
					.then((res) =>
						setSearchResult(
							res.data.map((b) => {
								return { ...b, from: 'BOOKSITOUT' }
							})
						)
					)
					.catch(() => setError(true))
					.finally(() => setLoading(false))
			}
		}, 500)

		return () => clearTimeout(typingTimer)
	}, [query])

	const searchNaver = () => {
		toast.loading('네이버에서 검색하고 있어요')

		booksitoutServer
			.get(`v3/search/new/naver?query=${query}`)
			.then((res) =>
				setSearchResult([
					...searchResult,
					...res.data.map((b) => {
						return { ...b, from: 'NAVER' }
					}),
				])
			)
			.catch(() => toast.error('네이버에서 검색하는 도중 오류가 났어요'))
			.finally(() => {
				setAdditionalSearch(true)
				toast.success('네이버에서 추가로 검색했어요')
			})
	}

	return (
		<div className='pb-5'>
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
									<img
										src={selectedBook.cover == null || selectedBook.cover === '' ? defaultBookCover : selectedBook.cover}
										alt=''
										className='img-fluid border rounded'
									/>
								</div>

								<div className='col-12 col-lg-8 mt-3 mt-lg-0'>
									<Form onSubmit={(e) => handleAddBook(e)}>
										<div className='row row-eq-height'>
											<div className='col-6 mb-3'>
												<AddBookSearchInfoCard icon={<booksitoutIcon.page />} label={`${selectedBook.page ?? '?'} 페이지`} />
											</div>

											<div className='col-6 mb-3'>
												<AddBookSearchInfoCard
													icon={<booksitoutIcon.language />}
													label={getLanguageKoreanLabel(selectedBook.language)}
												/>
											</div>

											<div className='col-6 mb-3'>
												<AddBookSearchInfoCard icon={<booksitoutIcon.category />} label={selectedBook.category ?? '기타'} />
											</div>

											<div className='col-6 mb-3'>
												<AddBookSearchInfoCard
													icon={<booksitoutIcon.publishYear />}
													label={`${selectedBook.publicationYear ?? '? '}년 출판`}
												/>
											</div>
										</div>

										<div className='mt-3' />

										<div className='row'>
											<div className='col-6'>
												<Form.Group className='mb-3'>
													<Form.Label>총 페이지 수</Form.Label>
													<Form.Control
														type='number'
														inputMode='numeric'
														id='page-input'
														defaultValue={selectedBook.page}
														pattern='[0-9]*'
														onChange={(e) => setUserAddedPage(Number(e.target.value))}
														placeholder={messages.book.placeholder.add.page}
														autoFocus={selectedBook.page == null}
														autoComplete='off'
														autoCapitalize='off'
														autoCorrect='off'
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

											<div className='col-12'>
												<Form.Check
													type='switch'
													label='내 책 정보 공개하기'
													checked={sharing}
													onChange={() => setSharing(!sharing)}
													className='force-1-line'
												/>
											</div>
										</div>

										<div className='row mt-4'>
											<div className='col-6'>
												<Button variant='book-danger' className='w-100' onClick={() => setModalOpen(false)}>
													취소
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
				<div className='row justify-content-center mb-4'>
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
					<NoContent message='검색 결과가 없어요' iconSize={10} textSize={2} mt={100} />
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

				{query !== '' && !loading && !additionalSearch && (
					<div className='row justify-content-center mt-5'>
						<div className='col-12 col-md-6'>
							<Button variant='book' className='w-100' onClick={searchNaver}>
								찾는 결과가 없어요
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)}

export default AddBookSearchForm