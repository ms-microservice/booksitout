import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Card, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Error from '../../common/Error'
import Loading from '../../common/Loading'

import { PostType } from '../../../types/PostType'

import parse from 'html-react-parser'

import NoContent from '../../common/NoContent'

import { MdPeopleAlt as ProfileIcon } from 'react-icons/md'
import { AiFillLike as LikeIcon, AiFillDislike as DislikeIcon } from 'react-icons/ai'
import PostBookCard from './PostBookCard'
import utils from '../../../functions/utils'
import toast from 'react-hot-toast'
import { RootState } from '../../../redux/store'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import EditCommentModal from '../comment/EditCommentModal' 
import { booksitoutServer } from '../../../functions/axios'
import UserRightCard from './UserRightCard'

const PostDetail = () => {
    const { postId } = useParams()

    const [post, setPost] = React.useState<PostType | null>(null)
    const [commentList, setCommentList] = React.useState<Comment[]>([])

    const [initialFetch, setInitialFetch] = React.useState(true)
    const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

	const [isMyPost, setIsMyPost] = React.useState(false)

	const isLogin = useSelector((state: RootState) => state.user.isLogin)

    React.useEffect(() => {
		setTimeout(() => setInitialFetch(false), 500)

		Promise.all([
			booksitoutServer
				.get(`/v4/forum/post/${postId}?user-id=${utils.getUserId()}`)
				.then((res) => {
					setIsMyPost(isLogin && res.data?.user.appUserId === utils.getUserId())
					setPost(res.data)
				}),
			booksitoutServer
				.get(`/v4/forum/post/${postId}/comments?user-id=${utils.getUserId()}`)
				.then((res) => setCommentList(res.data)),
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

			<PostDetailContentCard post={post} setPost={setPost} isLogin={isLogin}/>
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
			booksitoutServer
				.delete(`/v4/forum/post/${post.postId}`)
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
							<>
								<a href={`/community/post/edit/${post.postId}`} className='text-decoration-none text-black'>
									<Button variant='warning' className='mb-1 mb-md-0 me-md-1'>
										수정
									</Button>
								</a>

								<Button variant='book-danger' disabled={!isMyPost} onClick={handleDeletePost}>
									삭제
								</Button>
							</>
						) : (
							<></>
						)}
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
									<a href={`/book/info/${post.book.isbn}`}>
										<PostBookCard book={post.book} />
									</a>
								</div>
							</div>

							<UserRightCard user={post.user} />
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const PostDetailContentCard = ({post, setPost, isLogin}) => {

	const addPostLike = (postId: number, score: number, userScore: number) => {
		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		booksitoutServer
			.post(`/v4/forum/post/like/${postId}?score=${score}`, {})
			.then((res) => {
				toast.success(score === 1 ? '좋아요 했어요' : '싫어요 했어요')
				setPost({
					...post,
					userLikeScore: score,
					likeCount: score === 1 ? post.likeCount + 1 : post.likeCount - Math.abs(userScore),
					dislikeCount: score === -1 ? post.dislikeCount + 1 : post.dislikeCount - Math.abs(userScore),
				})
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

	const deletePostLike = (postId: number, score: number) => {
		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		booksitoutServer
			.delete(`/v4/forum/post/like/${postId}`)
			.then((res) => {
				toast.success(`${score === 1 ? '좋아요' : '싫어요'} 취소 했어요`)
				setPost({
					...post,
					userLikeScore: 0,
					likeCount: score === 1 ? post.likeCount - 1 : post.likeCount,
					dislikeCount: score === -1 ? post.dislikeCount - 1 : post.dislikeCount,
				})
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

    return (
		<Card style={{ minHeight: '200px' }}>
			<Card.Body className='p-4' style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
				<p className='m-0 pb-5' style={{ fontSize: '20px' }}>
					{parse(post.content)}
				</p>

				<div className='row justify-content-center'>
					<div className='col-6 col-md-3 p-1' onClick={() => {
						post.userLikeScore === 1 ? deletePostLike(post.postId, 1) : addPostLike(post.postId, 1, post.userLikeScore)
					}}>
						<Badge
							bg='book'
							style={{ height: '30px' }}
							className={`w-100 d-flex align-items-center justify-content-center clickable ${post.userLikeScore === 1 && 'state-active'}`}>
							<LikeIcon /> {post.likeCount}
						</Badge>
					</div>

					<div className='col-6 col-md-3 p-1' onClick={() => {
						post.userLikeScore === -1 ? deletePostLike(post.postId, -1) : addPostLike(post.postId, -1, post.userLikeScore)
					}}>
						<Badge
							bg='danger'
							style={{ height: '30px' }}
							className={`w-100 d-flex align-items-center justify-content-center clickable ${post.userLikeScore === -1 && 'state-active'}`}>
							<DislikeIcon /> {post.dislikeCount}
						</Badge>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const PostDetailCommentCard = ({post, setPost, commentList, setCommentList}) => {
	const loginUserId: number = utils.getUserId()
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

	const [content, setContent] = React.useState('')
	const handleAddComment = (e) => {
		e.preventDefault()

		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		if (content.length === 0) {
			document.getElementById('content-input')!!.focus()
			toast.error('댓글 내용을 입력해 주세요')
			return
		}

		const comment = { content: content.replaceAll('\n', '<br>') }

		booksitoutServer
			.post(`/v4/forum/post/${post.postId}/comment`, comment)
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

		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		if (confirm) {
			booksitoutServer
				.delete(`/v4/forum/comment/${commentId}`)
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

	const [commentEditModalOpen, setCommentEditModalOpen] = React.useState(false)
	const [selectedComment, setSelectedComment] = React.useState(null)

	const addCommentLike = (commentId: number, score: number, userScore: number) => {
		if (!isLogin) {
			toast.error('로그인 해 주세요')
			return
		}

		booksitoutServer
			.post(`/v4/forum/comment/like/${commentId}?score=${score}`, {})
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

		booksitoutServer
			.delete(`/v4/forum/comment/like/${commentId}`)
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
		<Card style={{ minHeight: '475px' }}>
			<EditCommentModal
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
					<NoContent message='댓글이 없어요' move={0} />
				) : (
					commentList.map((comment) => {
						return (
							<Card className='mt-3'>
								<Card.Body>
									{loginUserId === comment.user.appUserId && (
										<div>
											<div
												style={{ position: 'absolute', top: '-10px', right: '35px' }}
												onClick={() => {
													setCommentEditModalOpen(true)
													setSelectedComment(comment)
												}}>
												<EditButton />
											</div>

											<div
												style={{ position: 'absolute', top: '-10px', right: '0px' }}
												onClick={() => handleDeleteComment(comment.commentId)}>
												<DeleteButton />
											</div>
										</div>
									)}

									<div className='row'>
										<div className='col-3 col-md-2'>
											<a href={`/user/${comment.user.name}`}>
												<div className='text-center'>
													{comment.user.profileImage == null || comment.user.profileImage === '' ? (
														<ProfileIcon className='text-book h1 m-0' />
													) : (
														<img
															src={comment.user.profileImage}
															alt='user profile'
															className='img-fluid rounded'
															style={{ height: '30px', width: '30px' }}
														/>
													)}

													<h6 className='pt-2'>{comment.user.name}</h6>
												</div>
											</a>
										</div>

										<div className='col-9 col-md-8'>
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
															comment.userLikeScore === 1 && 'state-active'
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
															comment.userLikeScore === -1 && 'state-active'
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