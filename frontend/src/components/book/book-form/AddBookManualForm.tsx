import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'

import { addBook } from '../../../functions/book'
import messages from '../../../settings/messages'
import ImageSearchModal from '../ImageSearchModal'

const AddBookManualForm = () => {
	const navigate = useNavigate()

	// Book Info
	const [title, setTitle] = React.useState('')
	const [author, setAuthor] = React.useState('')
	const [cover, setCover] = React.useState('')
	const [endPage, setEndPage] = React.useState(0)
	const [language, setLanguage] = React.useState('KOREAN')
	const [category, setCategory] = React.useState('LITERATURE')
	const [isSharing, setIsSharing] = React.useState<boolean>(true)
	const [form, setForm] = React.useState('PHYSICAL')
	const [source, setSource] = React.useState('NOT_PROVIDED')

	const [showModal, setShowModal] = React.useState(false)
	const openModal = () => {
		if (title !== '') {
			setShowModal(true)
		} else {
			toast.error('표지를 찾기 위해 책 제목을 입력해 주세요')
		}
	}

	const handleAddBook = (e) => {
		e.preventDefault()
		toast.loading('책을 추가하고 있어요')

		if (endPage === 0) {
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
			sharing: isSharing,
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
		<div className='mt-4'>
			<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

			<div className='d-flex justify-content-center'>
				<Card className='col-12 col-md-8 p-0 p-md-1'>
					<Card.Body>
						<Form onSubmit={(e) => handleAddBook(e)} className='h-100 container mt-3 mb-3 text-start' onReset={handleReset}>
							<div className='row'>
								<div className='col-12 col-md-6'>
									<Form.Group className='mb-3'>
										<Form.Label>책 제목</Form.Label>
										<Form.Control
											type='text'
											placeholder={messages.book.placeholder.add.title}
											autoComplete='off'
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
											placeholder={messages.book.placeholder.add.author}
											autoComplete='off'
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
									<Form.Group className='mb-3'>
										<Form.Label>책 언어</Form.Label>
										<Form.Select onChange={(e) => setLanguage(e.target.value)}>
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
									<Form.Group className='mb-3'>
										<Form.Label>총 페이지 수</Form.Label>
										<Form.Control
											onChange={(e) => setEndPage(Number(e.target.value))}
											type='number'
											inputMode='numeric'
											pattern='[0-9]*'
											autoComplete='off'
											placeholder={messages.book.placeholder.add.page}
											required
										/>
									</Form.Group>
								</div>

								<p className='text-secondary text-center mb-4 d-none d-md-inline'>
									페이지를 추가하지 않으면 독서활동을 기록할 수 없어요
								</p>

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

								<p className='text-secondary text-center mb-4 d-md-none'>페이지를 추가하지 않으면 독서활동을 기록할 수 없어요</p>

								<div className='col-12 col-md-6'>
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

							<Form.Group className='mb-3 mt-3' controlId='formBasicCheckbox'>
								<Form.Check
									type='switch'
									label='내 책 정보 공개하기'
									checked={isSharing}
									onChange={() => setIsSharing(!isSharing)}
									className='force-1-line'
								/>
							</Form.Group>

							<div className='row justify-content-center align-items-end mt-1 mt-md-5'>
								<div className='mt-1 mt-md-5 d-block'></div>
								<div className='mt-3 mt-md-3 d-block'></div>

								<div className='col-12 col-md-7'>
									<Button variant='book' type='submit' className='w-100'>
										추가하기
									</Button>
								</div>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default AddBookManualForm