import { Card } from 'react-bootstrap';

import PostBookCard from '../PostBookCard';
import UserRightCard from '../UserRightCard';

const PostRoutePost = ({post}) => {
    return (
		<Card style={{ height: '210px' }} className='mb-4 h-100'>
			<Card.Body className='row'>
				<div className='col-12 col-md-8'>
					<a href={`/community/post/${post.postId}`}>
						<h3 style={{ maxHeight: '32px', overflowY: 'hidden' }}>
							{post.title.slice(0, 20)} {post.title.length > 20 && '...'} <span className='text-book'>[{post.commentCount}]</span>
						</h3>

						<p className='text-secondary' style={{ height: '50px', overflowY: 'hidden' }}>
							{post.content.replaceAll(/<[^>]+>/g, ' ')}
						</p>

						<div className='row mt-2 justify-content-end align-items-end'>
							<div className='col-6 col-md-7 col-xl-8'>
								<div className='text-secondary'>
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

											<span className='d-none d-md-block'>
												{`
													${post.createdDate.split('-')[0].slice(2)}년
													${post.createdDate.split('-')[1]}월 
													${post.createdDate.split('-')[2].slice(0, 2)}일 
												`}
											</span>
										</>
									)}
								</div>
							</div>

							<div className='col-6 col-md-5 col-xl-4'>
								<div className='row justify-content-end pe-2' style={{ zIndex: '5' }}>
									<UserRightCard user={post.user} />
								</div>
							</div>
						</div>
					</a>
				</div>

				<div className='col-6 col-md-4 d-none d-md-block'>
					<a href={`/book/info/${post.book.isbn}`}>
						<PostBookCard book={post.book} />
					</a>
				</div>
			</Card.Body>
		</Card>
	)
}

export default PostRoutePost