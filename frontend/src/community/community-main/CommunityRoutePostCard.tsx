import React from 'react'
import { Card } from "react-bootstrap"
import axios from 'axios'

import PostListGroup from '../post/PostListGroup'
import AddButton from '../../common/AddButton'
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import AllButton from '../../common/AllButton'

import urls from '../../settings/urls'

import { PostType } from '../post/PostType'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const CommunityRoutePostCard = () => {
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

	const [popularPost, setPopularPost] = React.useState<PostType[]>([])
	React.useEffect(() => {
		setTimeout(() => setInitialFetch(false), 300)

		axios
			.get(`${urls.api.base}/v4/forum/post?sort=popular&size=10`)
			.then((res) => setPopularPost(res.data.content))
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
						<booksitoutIcon.popular className='me-2 text-book h2' />
						인기글
					</h3>

					<div className='h-100'>
						{initialFetch ? (
							<></>
						) : loading ? (
							<Loading mt='125px' message='' />
						) : error ? (
							<Error move={30}/>
						) : (
							<PostListGroup postList={popularPost} col1='col-12 col-md-6' col2='col-12 col-md-6' />
						)}
					</div>
				</Card.Body>

				<div className='mt-3' />

				<AllButton url='/community/post/all/popular' col='col-12 col-md-8' />
			</Card>
		</a>
	)
}

export default CommunityRoutePostCard