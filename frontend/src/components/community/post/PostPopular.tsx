import React from 'react'
import { Card } from 'react-bootstrap'
import { BsFire as FireIcon } from 'react-icons/bs'

import { PostType } from '../../../types/PostType'

import PostListGroup from './PostListGroup'
import AddButton from '../../common/AddButton'
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import AllButton from '../../common/AllButton'
import { booksitoutServer } from '../../../functions/axios'

const PostPopular = () => {
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

    const [popularPost, setPopularPost] = React.useState<PostType[]>([])
	React.useEffect(() => {
		setTimeout(() => setInitialFetch(false), 300)

		booksitoutServer
			.get('/v4/forum/post?sort=popular&size=5')
			.then((res) => setPopularPost(res.data.content))
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
						<PostListGroup postList={popularPost} col1='col-12 col-md-8 col-xl-6' col2='col-12 col-md-4 col-xl-6' />
					)}

					<div className='pb-4' />

					<AllButton url='/community/post/all/popular' />
				</Card.Body>
			</Card>
		</a>
	)
}

export default PostPopular