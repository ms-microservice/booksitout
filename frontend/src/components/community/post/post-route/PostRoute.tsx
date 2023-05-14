import { useEffect, useState } from 'react'
import { ButtonGroup, Card, ToggleButton } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Post } from '../PostType'
import PostRoutePost from './PostRoutePost'
import NoContent from '../../../common/NoContent'
import Error from '../../../common/Error';
import axios from 'axios'
import urls from '../../../../settings/urls'
import Loading from '../../../common/Loading'

const PostRoute = () => {
	const { sortBy } = useParams()

	const [initialFetch, setIntialFetch] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<boolean>(false)

	const [postList, setPostList] = useState<Post[]>([])
	useEffect(() => {
		setTimeout(() => {
			setIntialFetch(false)
		}, 500)

		axios
			.get(`${urls.api.base}/v4/forum/post?sort=${sortBy}`)
			.then((res) => {
				if (res.status === 200) {
					setPostList(res.data)
				}
			})
			.catch((e) => {
				setError(true)
			})
			.finally(() => {
				setIntialFetch(false)
				setLoading(false)
			})
	}, [])

	return (
		<div className='container-xl'>
			<PostRouteButton sortBy={sortBy} />

			<div className='mt-3'>
				{initialFetch ? (
					<></>
				) : loading ? (
					<Loading />
				) : error ? (
					<Error />
				) : postList.length === 0 ? (
					<NoContent mt='50px' />
				) : (
					postList.map((post) => {
						return <PostRoutePost post={post} />
					})
				)}
			</div>
		</div>
	)
}

const PostRouteButton = ({sortBy}) => {
	return (
		<Card>
			<Card.Body>
				<ButtonGroup className='w-100'>
					<a href='/community/post/all/popular' className='w-100'>
						<ToggleButton
							variant={sortBy === 'popular' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'not-done'}>
							인기 글
						</ToggleButton>
					</a>

					<a href='/community/post/all/recent' className='w-100'>
						<ToggleButton variant={sortBy === 'recent' ? 'book' : 'light'} type='radio' checked={false} className='w-100' value={'done'}>
							최근 글
						</ToggleButton>
					</a>

					<a href='/community/post/all/relevant' className='w-100'>
						<ToggleButton
							variant={sortBy === 'relevant' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'give-up'}>
							내 책 관련
						</ToggleButton>
					</a>
				</ButtonGroup>
			</Card.Body>
		</Card>
	)
}

export default PostRoute
