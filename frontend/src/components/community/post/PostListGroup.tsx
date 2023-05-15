import { Badge, ListGroup } from 'react-bootstrap'

import { AiFillLike as LikeIcon, AiFillDislike as DislikeIcon } from 'react-icons/ai'
import { BsBookFill as BookIcon } from 'react-icons/bs'

import NoContent from '../../common/NoContent'
import Error from '../../common/Error'

const PostListGroup = ({postList, col1='col-12 col-md-8', col2='col-12 col-md-4'}) => {

    if (postList == null) return <Error/>
    if (postList.length === 0) return <NoContent message='게시글이 없어요' mb='50px' useImage={false}/>

    return (
		<ListGroup>
			{postList.map((post) => {
				return (
					<a href={`community/post/${post.postId}`} className='text-decoration-none w-100'>
						<ListGroup.Item as='li' className='d-flex w-100 pe-0'>
							<div className='row w-100'>
								<div className={`${col1}`}>
									<div>
										{post.title} <span className='text-book'>[{post.commentCount}]</span>
									</div>

									<div className='text-secondary'>{post.user.name}</div>
								</div>

								<div
									className={`${col2} d-flex align-items-start justify-content-between p-0 pe-md-1 mt-3 mt-md-0 align-items-center`}>
									<div className='d-flex align-items-center' style={{ width: '400px', paddingLeft: '12px' }}>
										{post.book != null ? (
											<>
												<BookIcon className='text-book me-2' />

												<div className='d-block'>
													{post.book.title.slice(0, 10)} <span className="text-secondary">{post.book.title.length > 10 ? '...' : ''}</span>
													<br />
													<span className='text-secondary'>{post.book.author}</span>
												</div>
											</>
										) : (
											<>-</>
										)}
									</div>

									<Badge bg='book' style={{ width: '65px' }}>
										<LikeIcon /> {post.likeCount}
									</Badge>

									<div className='ms-2' />

									<Badge bg='danger' style={{ width: '65px' }}>
										<DislikeIcon /> {post.dislikeCount}
									</Badge>
								</div>
							</div>
						</ListGroup.Item>
					</a>
				)
			})}
		</ListGroup>
	)
}

export default PostListGroup