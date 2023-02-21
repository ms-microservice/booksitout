import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Images
import defaultBookCover from '../../resources/images/common/default-book-cover.png'
import ImageSearchModal from './ImageSearchModal'
// Functions
import { addBook } from '../..//functions/book'
// Setttings
import messages from '../../settings/messages'

const BookAddForm = () => {
	const navigate = useNavigate()

	// Book Info
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [endPage, setEndPage] = useState(0)
	const [cover, setCover] = useState('')
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

	return (
		<div className='container mb-5'>
			<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

			<Form onSubmit={(e) => handleAddBook(e)}>
				<div className='row row-eq-height text-center'>
					<div className='col-12 col-lg-4 mb-3'>
						<div className='row justify-content-center'>
							<div className='col-8 col-lg-12'>
								<img src={cover === '' ? defaultBookCover : cover} alt='' className='img-fluid rounded' />
							</div>
						</div>

						<div className='row mt-5 mt-md-4'>
							<div className='col-6'>
								<Button className='w-100' onClick={openModal}>
									책 표지 검색
								</Button>
							</div>
							<div className='col-6'>
								<Button className='w-100' disabled>
									직접 업로드
								</Button>
							</div>
						</div>
					</div>

					<div className='col-12 col-lg-8 mb-3 text-start'>
						<Form.Group className='mb-3'>
							<Form.Label>책 제목</Form.Label>
							<Form.Control
								type='text'
								placeholder={messages.book.placeholder.title}
								required
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>저자</Form.Label>
							<Form.Control
								type='text'
								placeholder={messages.book.placeholder.author}
								required
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</Form.Group>

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
									<Form.Control type='number' placeholder={messages.book.placeholder.page} required />
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
							/>
						</Form.Group>

						<div className='row justify-content-center mt-5'>
							<div className='col-12'>
								<Button variant='success' type='submit' className='w-100'>
									등록하기
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default BookAddForm
