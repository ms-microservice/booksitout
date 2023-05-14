import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Card, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Error from '../../common/Error'
import Loading from '../../common/Loading'

import { Post } from './PostType'

import axios from 'axios'
import parse from 'html-react-parser'

import NoContent from '../../common/NoContent'
import UserCard from './UserCard'

import { MdPeopleAlt as ProfileIcon } from 'react-icons/md'
import { AiFillLike as LikeIcon, AiFillDislike as DislikeIcon } from 'react-icons/ai'
import urls from '../../../settings/urls'
import PostBookCard from './PostBookCard'
import utils from '../../../functions/utils'
import toast from 'react-hot-toast'
import { RootState } from '../../../redux/store'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import CommentEditModal from '../comment/CommentEditModal'

const PostDetail = () => {
    const { postId } = useParams()

    const [post, setPost] = useState<Post | null>(null)
    const [commentList, setCommentList] = useState<Comment[]>([])

    const [initialFetch, setInitialFetch] = useState(true)
    const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const [isMyPost, setIsMyPost] = useState(false)
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

    useEffect(() => {
		setTimeout(() => setInitialFetch(false), 500)

		Promise.all([
			axios.get(`${urls.api.base}/v4/forum/post/${postId}`).then((res) => {
				setIsMyPost(isLogin && res.data?.user.appUserId === utils.getUserId())
				setPost(res.data)
			}),
			axios.get(`${urls.api.base}/v4/forum/post/${postId}/comments?user-id=${utils.getUserId()}`).then((res) => setCommentList(res.data)),
		])
			.catch((e) => {})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])

    if (initialFetch) return <></>
    if (loading) return <Loading/>
    if (error || post == null) return <Error />

    return (
		<div className='container-xl'>
			<PostDetailSummaryCard post={post} isMyPost={isMyPost} commentList={commentList} />
			<div className='mb-4' />

			<PostDetailContentCard post={post} />
			<div className='mb-4' />

			<PostDetailCommentCard post={post} setPost={setPost} commentList={commentList ?? []} setCommentList={setCommentList} />
			<div className='mb-5' />
		</div>
	)
}

const PostDetailSummaryCard = ({ post, isMyPost, commentList }) => {
	const navigate = useNavigate()

	const handleDeletePost = () => {
		if (commentList.length > 0) {
			toast.error('댓글이 달린 게시글은 삭제할 수 없어요')
			return
		}
		const confirm = window.confirm('게시글을 지울까요?')

		if (confirm) {
			axios
			.delete(`${urls.api.base}/v4/forum/post/${post.postId}`, {headers: {Authorization: utils.getToken()}})
			.then((res) => {
				if (res.status.toString().startsWith('2')) {
					toast.success('게시글을 지웠어요')
					navigate('/community/post/all/popular')
				}
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
		}
	}

	return (
		<Card>
			<Card.Body>
				<div className='row'>
					<div className='col-9 col-md-10'>
						<h3>{post.title}</h3>
					</div>

					<div className='col-3 col-md-2 text-end'>
						{isMyPost ? (
							<a href={`/community/post/edit/${post.postId}`} className='text-decoration-none text-black'>
								<Button variant='warning' className='mb-1 mb-md-0 me-md-1'>
									수정
								</Button>
							</a>
						) : (
							<Button variant='warning' className='mb-1 mb-md-0 me-md-1' disabled>
								수정
							</Button>
						)}

						<Button variant='book-danger' disabled={!isMyPost} onClick={handleDeletePost}>
							삭제
						</Button>
					</div>
				</div>

				<div className='mt-3 mt-md-2'>
					<div className='row'>
						<div className='col-md-4 col-12 mt-md-auto'>
							<div className='text-secondary h6'>
								{post.createdDate == null ? (
									<>-</>
								) : (
									<>
										<div className='d-md-none'>
											{`
												${post.createdDate.split('-')[1]}월 
												${post.createdDate.split('-')[2].slice(0, 2)}일
											`}
										</div>

										<div className='d-none d-md-block'>
											{`
												${post.createdDate.split('-')[0].slice(2)}년 
												${post.createdDate.split('-')[1]}월 
												${post.createdDate.split('-')[2].slice(0, 2)}일
											`}
										</div>
									</>
								)}
							</div>
						</div>

						<div className='col-12 col-md-8 mt-3'>
							<div className='row justify-content-end mb-3'>
								<div className='col-12 col-md-6'>
									<PostBookCard book={post.book} />
								</div>
							</div>

							<UserCard user={post.user} />
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const PostDetailContentCard = ({post}) => {
    return (
		<Card style={{ minHeight: '100px' }}>
			<Card.Body className='p-4'>
				<p className='m-0'>{parse(post.content)}</p>
			</Card.Body>
		</Card>
	)
}

const PostDetailCommentCard = ({post, setPost, commentList, setCommentList}) => {
	const loginUserId: number = utils.getUserId()
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

	const [content, setContent] = useState('')
	const handleAddComment = (e) => {
		e.preventDefault()

		if (content.length === 0) {
			document.getElementById('content-input')!!.focus()
			toast.error('댓글 내용을 입력해 주세요')
			return
		}

		const comment = { content: content.replaceAll('\n', '<br>') }

		axios
			.post(`${urls.api.base}/v4/forum/post/${post.postId}/comment`, comment, { headers: { Authorization: utils.getToken() } })
			.then((res) => {
				if (res.status.toString().startsWith('2')) {
					toast.success('댓글을 남겼어요')

					const addedComment = res.data.added

					setPost({ ...post, commentCount: post.commentCount + 1 })
					setCommentList([...commentList, addedComment])
					setContent('')
				}
			})
			.catch((e) => {
				toast.error(e.response.data.message)
			})
	}

	const handleDeleteComment = (commentId) => {
		const confirm = window.confirm('댓글을 지울까요?')

		if (confirm) {
			axios
				.delete(`${urls.api.base}/v4/forum/comment/${commentId}`, { headers: { Authorization: utils.getToken() } })
				.then((res) => {
					if (res.status.toString().startsWith('2')) {
						setCommentList(commentList.filter((comment) => comment.commentId !== commentId))
						setPost({ ...post, commentCount: post.commentCount - 1 })
						toast.success('댓글을 지웠어요')
					}
				})
				.catch(() => {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				})
		}
	}

	const [commentEditModalOpen, setCommentEditModalOpen] = useState(false)
	const [selectedComment, setSelectedComment] = useState(null)

	const addCommentLike = (commentId: number, score: number, userScore: number) => {
		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		axios
			.post(`${urls.api.base}/v4/forum/comment/like/${commentId}?score=${score}`, {}, { headers: { Authorization: utils.getToken() } })
			.then((res) => {
				toast.success(score === 1 ? '좋아요 했어요' : '싫어요 했어요')
				setCommentList(
					commentList.map((comment) =>
						comment.commentId === commentId
							? {
									...comment,
									userLikeScore: score,
									likeCount: score === 1 ? comment.likeCount + 1 : comment.likeCount - Math.abs(userScore),
									dislikeCount: score === -1 ? comment.dislikeCount + 1 : comment.dislikeCount - Math.abs(userScore),
							  }
							: comment
					)
				)
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

	const deleteCommentLike = (commentId: number, score: number) => {
		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		axios
			.delete(`${urls.api.base}/v4/forum/comment/like/${commentId}`, { headers: { Authorization: utils.getToken() } })
			.then((res) => {
				toast.success(`${score === 1 ? '좋아요' : '싫어요'} 취소 했어요`)
				setCommentList(
					commentList.map((comment) =>
						comment.commentId === commentId
							? {
									...comment,
									userLikeScore: 0,
									likeCount: score === 1 ? comment.likeCount - 1 : comment.likeCount,
									dislikeCount: score === -1 ? comment.dislikeCount - 1 : comment.dislikeCount,
							  }
							: comment
					)
				)
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

	return (
		<Card style={{ minHeight: '100px' }}>
			<CommentEditModal
				show={commentEditModalOpen}
				setShow={setCommentEditModalOpen}
				comment={selectedComment}
				commentList={commentList}
				setCommentList={setCommentList}
			/>

			<Card.Body>
				<h3 className='text-book'>댓글 {post.commentCount}개</h3>

				<Card style={{ minHeight: '50px' }} className='mt-4 mb-5'>
					<Card.Body>
						<Form onSubmit={handleAddComment}>
							<Form.Control
								id='content-input'
								as='textarea'
								placeholder='댓글을 입력해 주세요'
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>

							<div className='mt-3'>
								<div className='row justify-content-end'>
									<div className='col-6 col-md-4 col-xl-3'>
										<Button variant='book' type='submit' className='w-100'>
											댓글 등록하기
										</Button>
									</div>
								</div>
							</div>
						</Form>
					</Card.Body>
				</Card>

				{commentList.length === 0 ? (
					<NoContent useImage={false} mt='50px' mb='75px' message='댓글이 없어요' />
				) : (
					commentList.map((comment) => {
						return (
							<Card className='mt-3'>
								<Card.Body>
									{loginUserId === comment.user.appUserId && (
										<>
											<div
												style={{ position: 'absolute', top: '-10px', right: '35px', zIndex: 10 }}
												onClick={() => {
													setCommentEditModalOpen(true)
													setSelectedComment(comment)
												}}>
												<EditButton />
											</div>

											<div
												style={{ position: 'absolute', top: '-10px', right: '0px', zIndex: 10 }}
												onClick={() => handleDeleteComment(comment.commentId)}>
												<DeleteButton />
											</div>
										</>
									)}

									<div className='row'>
										<div className='col-3 col-md-1'>
											<div className='text-center'>
												{comment.user.profileImage == null || comment.user.profileImage === '' ? (
													<ProfileIcon className='text-book h1 m-0' />
												) : (
													<img
														src={comment.user.profileImage}
														alt='user profile'
														className='img-fluid rounded'
														style={{ height: '30px' }}
													/>
												)}

												<h5>{comment.user.name}</h5>
											</div>
										</div>

										<div className='col-9 col-md-9'>
											<p>{parse(comment.content)}</p>
										</div>

										<div className='col-12 col-md-2 d-flex align-items-center justify-content-center mt-3 mt-md-0'>
											<div className='row w-100'>
												<div
													className='col-6 p-1'
													onClick={() => {
														comment.userLikeScore === 1
															? deleteCommentLike(comment.commentId, 1)
															: addCommentLike(comment.commentId, 1, comment.userLikeScore)
													}}>
													<Badge
														bg='book'
														style={{ height: '30px' }}
														className={`w-100 d-flex align-items-center justify-content-center clickable ${
															comment.userLikeScore === 1 && 'opacity-50'
														}`}>
														<LikeIcon /> {comment.likeCount}
													</Badge>
												</div>

												<div
													className='col-6 p-1'
													onClick={() => {
														comment.userLikeScore === -1
															? deleteCommentLike(comment.commentId, -1)
															: addCommentLike(comment.commentId, -1, comment.userLikeScore)
													}}>
													<Badge
														bg='danger'
														style={{ height: '30px' }}
														className={`w-100 d-flex align-items-center justify-content-center clickable ${
															comment.userLikeScore === -1 && 'opacity-50'
														}`}>
														<DislikeIcon /> {comment.dislikeCount}
													</Badge>
												</div>
											</div>
										</div>
									</div>
								</Card.Body>
							</Card>
						)
					})
				)}
			</Card.Body>
		</Card>
	)
}

export default PostDetail