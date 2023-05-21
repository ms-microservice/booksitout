import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Common
import Loading from '../../common/Loading'
import Error from '../../common/Error'
import NoContent from '../../common/NoContent'
// Components
import ImageSearchModal from '../ImageSearchModal'
// Resources
import defaultBookCover from '../../../resources/images/common/default-book-cover.png'
// Functions
import { editBook } from '../../../functions/book'
import urls from '../../../settings/urls'
import utils from '../../../functions/utils'

const BookEditForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const TITLE_MESSAGE = `책 제목을 알려 주세요`
	const AUTHOR_MESSAGE = `책의 저자를 알려 주세요`
	const PAGE_MESSAGE = `마지막 페이지를 알려 주세요`
	const EDIT_SUCCESS_MESSAGE = `책을 수정했어요`

	const [initalFetch, setInitialFetch] = useState(true)
	const [loading, setIsLoading] = useState(true)
	const [error, setIsError] = useState(false)
	const [notFound, setNotFound] = useState(false)

	const [showModal, setShowModal] = useState(false)
	const openModal = () => {
		title !== '' ? setShowModal(true) : alert('표지를 검색하기 위해 책 제목을 입력해 주세요')
	}

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [endPage, setEndPage] = useState(0)
	const [cover, setCover] = useState('')
	const [language, setLanguage] = useState('KOREAN')
	const [category, setCategory] = useState('LITERATURE')
	const [sharing, setSharing] = useState<boolean>(true)
	const [form, setForm] = useState('PHYSICAL')
	const [source, setSource] = useState('NOT_PROVIDED')

	useEffect(() => {
		const BOOK_GET_API_URL = `${urls.api.base}/v1/book/${id}`

		setTimeout(() => {
			setInitialFetch(false)
		}, 5000)

		fetch(BOOK_GET_API_URL, {
			method: 'GET',
			headers: { Authorization: utils.getToken() ?? '' },
		})
			.then((res) => {
				if (!res.status.toString().startsWith('2')) {
					setNotFound(true)
					return
				}

				return res.json()
			})
			.then((book) => {
				setTitle(book.title)
				setAuthor(book.author)
				setLanguage(book.language)
				setCategory(book.category)
				setEndPage(book.endPage)
				setForm(book.form)
				setSource(book.source)
				setCover(book.cover)
				setSharing(book.sharing)
			})
			.catch(() => setIsError(true))
			.finally(() => {
				setIsLoading(false)
				setInitialFetch(false)
			})
	}, [id])

	const handleEdit = (e) => {
		e.preventDefault()

		const editedBook = {
			bookId: id,
			title: title,
			author: author,
			language: language,
			category: category,
			endPage: endPage,
			form: form,
			soruce: source,
			cover: cover,
			isSharing: sharing,
		}

		editBook(editedBook).then((result) => {
			if (result) {
				toast.success(EDIT_SUCCESS_MESSAGE)
				navigate(`/book/detail/${id}`)
			} else {
				toast.error('책을 수정할 수 없었어요. 잠시 후 다시 시도해 주세요')
			}
		})
	}

	if (initalFetch) return <></>
	if (loading) return <Loading />
	if (error)return <Error />
	if (notFound) return <NoContent />

	return (
		<div className='container mb-5'>
			<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

			<Card>
				<Card.Body>
					<Form onSubmit={handleEdit} className='h-100 container mt-3 mb-3 text-start'>
						<div className='row row-eq-height text-center'>
							<div className='col-12 col-lg-4 mb-3 mt-md-4'>
								<img src={cover === '' ? defaultBookCover : cover} alt='' className='img-fluid rounded border' />
							</div>

							<div className='col-12 col-lg-8 mb-3 text-start'>
								<div className='row'>
									<div className='col-12 col-md-6'>
										<Form.Group className='mb-3'>
											<Form.Label>책 제목</Form.Label>
											<Form.Control
												type='text'
												placeholder={TITLE_MESSAGE}
												required
												onChange={(e) => setTitle(e.target.value)}
												value={title}
											/>
										</Form.Group>
									</div>

									<div className='col-12 col-md-6'>
										<Form.Group className='mb-3'>
											<Form.Label>저자</Form.Label>
											<Form.Control
												type='text'
												placeholder={AUTHOR_MESSAGE}
												onChange={(e) => setAuthor(e.target.value)}
												value={author}
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
										<Form.Group className='mb-3'>
											<Form.Label>책 언어</Form.Label>
											<Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
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
											<Form.Select onChange={(e) => setCategory(e.target.value)} value={category}>
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
										<Form.Group className='mb-3'>
											<Form.Label>총 페이지 수</Form.Label>
											<Form.Control
												type='number'
												inputMode='numeric'
												pattern='[0-9]*'
												placeholder={PAGE_MESSAGE}
												required
												autoComplete='off'
												value={endPage}
												onChange={(e) => setEndPage(Number(e.target.value))}
											/>
										</Form.Group>
									</div>

									<div className='col-6'>
										<Form.Group className='mb-3'>
											<Form.Label>책 형태</Form.Label>
											<Form.Select value={form} onChange={(e) => setForm(e.target.value)}>
												<option value='PHYSICAL'>📃 종이책</option>
												<option value='EBOOK'>🔋 전자책</option>
												<option value='AUDIO'>🎧 오디오북</option>
											</Form.Select>
										</Form.Group>
									</div>

									<div className='col-12 col-md-6'>
										<Form.Group className='mb-3'>
											<Form.Label>책은 어디서 얻었나요?</Form.Label>
											<Form.Select value={source} onChange={(e) => setSource(e.target.value)}>
												<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

												<option value='BUY_NEW_OFFLINE'>새 책 - 온라인 서점</option>
												<option value='BIY_NEW_ONLINE'>새 책 - 오프라인 서점</option>
												<option value='BUY_USED_OFFLINE'>중고책 - 오프라인 서점 (알라딘 등)</option>
												<option value='BUY_USED_ONLINE'>중고책 - 온라인 서점</option>

												<option value='LIBRARY'>도서관</option>
												<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
												<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

												<option value='SUBSCRIPTION'>구독 (밀리의 서재 등)</option>

												<option value='OTHERS'>기타</option>
											</Form.Select>
										</Form.Group>
									</div>
								</div>

								<Form.Group className='mb-5' controlId='formBasicCheckbox'>
									<Form.Check
										type='switch'
										label='내 책 정보 공개하기'
										checked={sharing}
										onChange={() => setSharing(!sharing)}
										className='force-1-line'
									/>
								</Form.Group>

								<div className='row justify-content-center'>
									<div className='col-12 col-md-6 mb-2 mb-md-0'>
										<Button variant='book-danger' type='reset' className='w-100'>
											다시 입력하기
										</Button>
									</div>

									<div className='col-12 col-md-6 mb-2 mb-md-0'>
										<Button variant='book' type='submit' className='w-100'>
											수정하기
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

export default BookEditForm
