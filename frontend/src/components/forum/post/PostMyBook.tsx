import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { BsFillPersonFill as BookIcon } from 'react-icons/bs'

import PostListGroup from './PostListGroup'

import { Post } from './Post'
import AddButton from '../../common/AddButton'
import { useNavigate } from 'react-router-dom'

const PostMyBook = () => {
    const [myBookPost, setMyBookPost] = useState<Post[]>([])

	return (
		<a href='/forum/post/all/my-book' className='text-decoration-none text-black'>
			<Card className='h-100' style={{ minHeight: '400px' }}>
				<a href='/forum/post/add'>
					<AddButton size='30' color='book' top='15px' right='15px' />
				</a>

				<Card.Body>
					<h3 className='mb-3'>
						<BookIcon className='me-2 text-book h2' />
						내 책 관련 게시글
					</h3>

					<PostListGroup postList={myBookPost} />
				</Card.Body>
			</Card>
		</a>
	)
}

export default PostMyBook