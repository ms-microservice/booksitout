import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'

import { BsFillPersonFill as BookIcon } from 'react-icons/bs'

import { Post } from './PostType'
import urls from '../../../settings/urls'

import PostListGroup from './PostListGroup'
import AddButton from '../../common/AddButton'
import AllButton from '../../common/AllButton'
import Loading from '../../common/Loading';
import Error from '../../common/Error';

const PostMyBook = () => {
	const [initialFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const [myBookPost, setMyBookPost] = useState<Post[]>([])
	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 300)

		axios
			.get(`${urls.api.base}/v4/forum/post?sort=relevant&size=5`)
			.then((res) => setMyBookPost(res.data))
			.catch((e) => {
				setError(true)
			})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])


	return (
		<a href='/community/post/all/relevant' className='text-decoration-none text-black'>
			<Card className='h-100' style={{ minHeight: '480px' }}>
				<a href='/community/post/add'>
					<AddButton size='30' color='book' top='15px' right='15px' />
				</a>

				<Card.Body>
					<h3 className='mb-3'>
						<BookIcon className='me-2 text-book h2' />내 책 관련 게시글
					</h3>
					{initialFetch ? (
						<></>
					) : loading ? (
						<Loading mt='125px' message='' />
					) : error ? (
						<Error mt='0px' mb='100px' />
					) : (
					<PostListGroup postList={myBookPost} />
					)}

					<AllButton url='/community/post/all/relevant' />
				</Card.Body>
			</Card>
		</a>
	)
}

export default PostMyBook