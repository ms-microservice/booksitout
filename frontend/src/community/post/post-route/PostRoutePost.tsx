import React from 'react'
import { Card } from 'react-bootstrap'

import PostBookCard from '../PostBookCard';
import UserRightCard from '../UserRightCard';

const PostRoutePost = ({post}) => {
	const [isHovered, setIsHovered] = React.useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

    return (
		<Card style={{ height: '210px' }} className='mb-4 h-100'>
			<Card.Body className='row'>
				<div className='col-12 col-md-8'>
					<a href={`/community/post/${post.postId}`} className={isHovered ? 'text-book' : ''}>
						<div className='d-flex'>
							<h3 className='clamp-1-line'>{post.title}</h3>
							<h4 className='text-book ps-2'>[{post.commentCount}]</h4>
						</div>

						<p className='text-secondary mb-0' style={{ height: '50px', overflowY: 'hidden' }}>
							{post.content.replaceAll(/<[^>]+>/g, ' ')}
						</p>
					</a>

					<div className='row mt-2 justify-content-end align-items-end'>
						<a
							href={`/community/post/${post.postId}`}
							className='col-6 col-md-7 col-xl-8'
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}>
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
						</a>

						<div className='col-6 col-md-5 col-xl-4'>
							<div className='row justify-content-end pe-2'>
								<UserRightCard user={post.user} />
							</div>
						</div>
					</div>
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