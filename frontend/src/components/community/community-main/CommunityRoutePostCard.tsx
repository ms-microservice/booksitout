import { useEffect, useState } from 'react'
import { Card } from "react-bootstrap"
import axios from 'axios'

import { BsFire as FireIcon } from 'react-icons/bs'

import PostListGroup from '../post/PostListGroup'
import AddButton from '../../common/AddButton'
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import AllButton from '../../common/AllButton'

import urls from '../../../settings/urls'

import { PostType } from '../../../types/PostType'

const CommunityRoutePostCard = () => {
	const [initialFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const [popularPost, setPopularPost] = useState<PostType[]>([])
	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 300)

		axios
			.get(`${urls.api.base}/v4/forum/post?sort=popular&size=10`)
			.then((res) => setPopularPost(res.data))
			.catch((e) => setError(true))
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])


    return (
		<a href='/community/post/all/popular' className='h-100'>
			<Card style={{ minHeight: '550px' }} className='mb-4 h-100'>
				<Card.Body>
					<a href='/community/post/add'>
						<AddButton size='30' color='book' top='15px' right='15px' />
					</a>

					<h3 className='mb-3'>
						<FireIcon className='me-2 text-book h2' />
						인기글
					</h3>

					<div className='border'>
						{initialFetch ? (
							<></>
						) : loading ? (
							<Loading mt='125px' message='' />
						) : error ? (
							<Error mt='125px' mb='100px' />
						) : (
							<PostListGroup postList={popularPost} col1='col-12 col-md-6' col2='col-12 col-md-6' />
						)}
					</div>
				</Card.Body>

				<div className='mt-3' />

				<AllButton url='/community/post/all/popular' label='더 보기' col='col-12 col-md-8' />
			</Card>
		</a>
	)
}

export default CommunityRoutePostCard