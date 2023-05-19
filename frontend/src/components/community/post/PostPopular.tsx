import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { BsFire as FireIcon } from 'react-icons/bs'
import axios from 'axios'

import { Post } from '../../../types/PostType'
import urls from '../../../settings/urls'

import PostListGroup from './PostListGroup'
import AddButton from '../../common/AddButton'
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import AllButton from '../../common/AllButton'

const PostPopular = () => {
	const [initialFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

    const [popularPost, setPopularPost] = useState<Post[]>([])
	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 300)

		axios
			.get(`${urls.api.base}/v4/forum/post?sort=popular&size=5`)
			.then((res) => setPopularPost(res.data))
			.catch((e) => {
				setError(true)
			})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])

	return (
		<a href='/community/post/all/popular' className='text-decoration-none text-black'>
			<Card className='h-100' style={{ minHeight: '480px' }}>
				<a href='/community/post/add'>
					<AddButton size='30' color='book' top='15px' right='15px' />
				</a>

				<Card.Body>
					<h3 className='mb-3'>
						<FireIcon className='me-2 text-book h2' />
						지금 인기있는 게시글
					</h3>

					{initialFetch ? (
						<></>
					) : loading ? (
						<Loading mt='125px' message='' />
					) : error ? (
						<Error mt='0px' mb='100px' />
					) : (
						<PostListGroup postList={popularPost} />
					)}

					<AllButton url='/community/post/all/popular' />
				</Card.Body>
			</Card>
		</a>
	)
}

export default PostPopular