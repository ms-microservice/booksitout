import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"

import { PostType, RecentBookType } from '../../../types/PostType'
import Loading from '../../common/Loading';
import Error from "../../common/Error"
import AddIsbnCard from "./AddIsbnCard"
import toast from "react-hot-toast"
import BookSearchModal from "../../../book/BookSearchModal"
import { booksitoutServer } from "../../../functions/axios";

const EditPostForm = () => {
    const navigate = useNavigate()

    const [initialFetch, setInitalFetch] = React.useState(true)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    const { postId } = useParams()
    const [post, setPost] = React.useState<PostType | null>(null)
    React.useEffect(() => {
        setTimeout(() => setInitalFetch(false), 500)

        booksitoutServer
			.get(`/v4/forum/post/${postId}`)
			.then((res) => {
				setPost(res.data)
				setTitle(res.data?.title ?? '')
				setContent(res.data?.content ?? '')
				setIsbn(res.data?.book.isbn ?? 0)
			})
			.catch(() => {})
			.finally(() => {
				setInitalFetch(false)
				setLoading(false)
			})

            console.log(post)
    }, [postId])

    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [isbn, setIsbn] = React.useState<string>('')
    const handleEditPost = (e) => {
        e.preventDefault()

        if (title === post?.title && content === post?.content && isbn === post?.book?.isbn) {
            toast.error('수정 사항이 없어요')
            return
        }

        if (title === '') {
            toast.error('제목을 입력해주세요')
            document.getElementById('title-input')!!.focus()
            return
        }

        if (content === '')  {
			toast.error('내용을 입력해주세요')
			document.getElementById('content-input')!!.focus()
			return
		}

        const editedPost = {
            title: title,
            content: content,
            isbn: isbn
        }

        booksitoutServer
			.put(`/v4/forum/post/${postId}`, editedPost)
			.then((res) => navigate(`/community/post/${res.data.id}`))
			.catch(() => toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요'))
    }

	const [recentBookList, setRecentBookList] = React.useState<RecentBookType[]>([])
	const [modalShow, setModalShow] = React.useState(false)

    if (initialFetch) return<></>    
    if (loading) return <Loading />
    if (error || post == null) return <Error />

    return (
		<div className='container-xl'>
			<BookSearchModal
				show={modalShow}
				setShow={setModalShow}
				isbn={isbn}
				setIsbn={setIsbn}
				recentBookList={recentBookList}
				setRecentBookList={setRecentBookList}
			/>

			<Card style={{ minHeight: '500px' }}>
				<Card.Body>
					<h2 className='mb-4'>게시글 수정하기</h2>

					<Form className='mt-4' onSubmit={handleEditPost}>
						<Form.Label>제목</Form.Label>
						<Form.Control
							id='title-input'
							type='text'
							className='mb-3'
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							defaultValue={post.title}
						/>

						<Form.Label>내용</Form.Label>
						<Form.Control
							id='content-input'
							as='textarea'
							rows={10}
							className='mb-3'
							onChange={(e) => setContent(e.target.value)}
							value={content}
						/>

						<Form.Label>게시글을 추가할 책</Form.Label>
						<AddIsbnCard
							isbn={isbn}
							setIsbn={setIsbn}
							setShow={setModalShow}
							recentBookList={recentBookList}
							setRecentBookList={setRecentBookList}
						/>

						<div className='row mt-5'>
							<div className='col-12 col-md-6'>
								<Button variant='book-danger' type='reset' className='w-100 mb-2'>
									다시 입력
								</Button>
							</div>

							<div className='col-12 col-md-6'>
								<Button variant='book' type='submit' className='w-100 mb-2'>
									등록하기
								</Button>
							</div>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

export default EditPostForm