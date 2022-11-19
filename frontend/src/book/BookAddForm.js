import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import defaultBookCover from '../resources/images/common/book.png'

import ImageSearchModal from './ImageSearchModal'

const BookAddForm = (props) => {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)

	// Messages
	const TITLE_MESSAGE = `책 제목을 알려 주세요`
	const AUTHOR_MESSAGE = `책의 저자를 알려 주세요`
	const PAGE_MESSAGE = `마지막 페이지는 몇 페이지 인가요?`

	// Book Info
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [endPage, setEndPage] = useState(0)
	const [cover, setCover] = useState('')
	const [language, setLanguage] = useState('KOREAN')
	const [source, setSource] = useState('NOT_PROVIDED')

	const [category, setCategory] = useState('NOVEL')
	const [publishedAt, setPublishedAt] = useState('')
	const [isSharing, setIsSharing] = useState(false)

	const addBook = (e) => {
		e.preventDefault()

		fetch(`http://localhost/v1/book`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: props.token,
			},
			body: JSON.stringify({
				title: title,
				author: author,
				cover: cover,
				language: language,

				endPage: endPage,
				source: source,
			}),
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				alert(data.message)

				if (data.status.toString().startsWith(2)) {
					navigate('/book/not-done')
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	const openModal = () => {
		if (title !== '') {
			setShowModal(true)
		} else {
			alert('표지를 검색하기 위해 책 제목을 입력해 주세요')
		}
	}

	return (
		<div className='container'>
			<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

			<Form onSubmit={addBook}>
				<div class='gcse-search'></div>
				<div className='row row-eq-height'>
					<div className='col-12 col-lg-4 mb-3'>
						<img src={cover === '' ? defaultBookCover : cover} alt='' className='img-fluid rounded' />

						<div className='row mt-5'>
							<div className='col-6'>
								<Button className='w-100' onClick={openModal}>
									이미지 검색
								</Button>
							</div>
							<div className='col-6'>
								<Button className='w-100' disabled>
									직접 업로드
								</Button>
							</div>
						</div>
					</div>

					<div className='col-12 col-lg-8 mb-3'>
						<Form.Group className='mb-3'>
							<Form.Label>책 제목</Form.Label>
							<Form.Control type='text' placeholder={TITLE_MESSAGE} required onChange={(e) => setTitle(e.target.value)} />
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>저자</Form.Label>
							<Form.Control type='text' placeholder={AUTHOR_MESSAGE} required onChange={(e) => setAuthor(e.target.value)} />
						</Form.Group>

						<div className='row'>
							<div className='col-4'>
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

							<div className='col-4'>
								<Form.Group>
									<Form.Label>장르</Form.Label>
									<Form.Select>
										<option>문학</option>
										<option>비문학</option>
									</Form.Select>
								</Form.Group>
							</div>

							<div className='col-4'>
								<Form.Group className='mb-3' onChange={(e) => setEndPage(e.target.value)} required>
									<Form.Label>총 페이지 수</Form.Label>
									<Form.Control type='number' placeholder={PAGE_MESSAGE} />
								</Form.Group>
							</div>
						</div>

						<div className='row mt-5'>
							<div className='col-6'>
								<Form.Group className='mb-3'>
									<Form.Label>책 형태</Form.Label>
									<Form.Select>
										<option>실물 책</option>
										<option>전자책</option>
										<option>오디오북</option>
									</Form.Select>
								</Form.Group>
							</div>

							<div className='col-6'>
								<Form.Group className='mb-3' onChange={(e) => setSource(e.target.value)}>
									<Form.Label>책은 어디서 얻었나요?</Form.Label>
									<Form.Select>
										<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

										<option value='BOUGHT_BOOKSTORE'>온라인 서점</option>
										<option value='BOUGHT_ONLINE'>오프라인 서점</option>
										<option value='BOUGHT_USED'>중고로 샀어요</option>

										<option value='BORROW_LIBRARY'>도서관에서 빌렸어요</option>
										<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
										<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

										<option value='EBOOK_SUBSCRIPTION'>구독했어요 (밀리의 서재 등)</option>
									</Form.Select>
								</Form.Group>
							</div>
						</div>

						<Form.Group className='mb-3' controlId='formBasicCheckbox'>
							<Form.Check type='checkbox' label='다른 사람이 내 독서활동을 볼 수 있도록 하기' />
						</Form.Group>

						<div className='row justify-content-center mt-5 container'>
							<Button variant='success' type='submit'>
								등록하기
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default BookAddForm
