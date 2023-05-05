import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { BsFire as FireIcon } from 'react-icons/bs'

import PostListGroup from './PostListGroup'

import { Post } from './Post'
import AddButton from '../../common/AddButton'

const PostPopular = () => {
    const [popularPost, setPopularPost] = useState<Post[]>([])

	return (
		<a href='/forum/post/all/popular' className='text-decoration-none text-black'>
			<Card className='h-100' style={{ minHeight: '400px' }}>
				<a href='/forum/post/add'>
					<AddButton size='30' color='book' top='15px' right='15px' />
				</a>

				<Card.Body>
					<h3 className='mb-3'>
						<FireIcon className='me-2 text-book h2' />
						지금 인기있는 게시글
					</h3>

					<PostListGroup postList={popularPost} />
				</Card.Body>
			</Card>
		</a>
	)
}

export default PostPopular