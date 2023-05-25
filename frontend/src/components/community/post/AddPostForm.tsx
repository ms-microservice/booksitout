import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, FormGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import toast from 'react-hot-toast'
import Error from '../../common/Error'

import '../../../resources/css/customCarousel.css'
import AddIsbnCard from './AddIsbnCard'
import BookSearchModal from '../BookSearchModal'

import { RecentBookType } from '../../../types/PostType'
import { booksitoutServer } from '../../../functions/axios'

const AddPostForm = () => {
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

	const navigate = useNavigate()

	const [title, setTitle] = React.useState('')
	const [content, setContent] = React.useState('')
	const [isbn, setIsbn] = React.useState(null)

	const handlePostAdd = (e) => {
		e.preventDefault()

		if (title === '') {
			toast.error('제목을 입력해주세요')
			document.getElementById('title-input')!!.focus()
			return
		}

		if (content === '') {
			toast.error('내용을 입력해주세요')
			document.getElementById('content-input')!!.focus()
			return
		}

		if (isbn === null || isbn === '') {
			toast.error('책을 지정해 주세요')
			return
		}

		const post = {
			title: title,
			content: content.replaceAll('\n', '<br>'),
			isbn: isbn,
		}

		booksitoutServer
			.post('/v4/forum/post', post)
			.then((res) => {
				toast.success('게시글을 추가했어요')
				navigate(`/community/post/${res.data.id}`)
			})
			.catch((e) => {
				if (e.response.status === 401) {
					toast.error('로그인이 필요해요')
					return
				}

				toast.error(e.response.data.message)
			})
	}

	const [recentBookList, setRecentBookList] = React.useState<RecentBookType[]>([])
	const [modalShow, setModalShow] = React.useState(false)

	if (!isLogin) return <Error message='게시글을 추가하기 위해서 로그인 해 주세요' />

    return (
		<Card style={{ minHeight: '500px' }}>
			<BookSearchModal
				show={modalShow}
				setShow={setModalShow}
				isbn={isbn}
				setIsbn={setIsbn}
				recentBookList={recentBookList}
				setRecentBookList={setRecentBookList}
			/>

			<Card.Body>
				<Form className='mt-3' onSubmit={handlePostAdd}>
					<FormGroup>
						<Form.Label>제목</Form.Label>
						<Form.Control id='title-input' type='text' className='mb-3' onChange={(e) => setTitle(e.target.value)} value={title} />
					</FormGroup>

					<Form.Group>
						<Form.Label>내용</Form.Label>
						<Form.Control
							id='content-input'
							as='textarea'
							rows={12}
							className='mb-3'
							onChange={(e) => setContent(e.target.value)}
							value={content}
						/>
					</Form.Group>

					<FormGroup>
						<Form.Label>게시글을 추가할 책</Form.Label>
						<AddIsbnCard
							isbn={isbn}
							setIsbn={setIsbn}
							setShow={setModalShow}
							recentBookList={recentBookList}
							setRecentBookList={setRecentBookList}
						/>
					</FormGroup>

					<div className='row justify-content-center mt-5'>
						<div className='col-12 col-md-6'>
							<Button variant='book' type='submit' className='w-100 mb-2'>
								등록하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default AddPostForm