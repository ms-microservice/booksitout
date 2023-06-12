import { useLoaderData, useParams, useSearchParams } from 'react-router-dom'
import { ButtonGroup, Card, ToggleButton } from 'react-bootstrap'
import PostRoutePost from './PostRoutePost'
import NoContent from '../../../common/NoContent'
import { PostType } from '../PostType'
import { booksitoutServer } from '../../../functions/axios'
import Page from '../../../common/Page';
import { PageType } from '../../../types/PageType'
import RouteTitle from '../../../common/RouteTitle'
import booksitoutIcon from '../../../common/icons/booksitoutIcon';

export async function loader({ params }) {
	const sortBy = params.sortBy

	return booksitoutServer
		.get(`/v4/forum/post?sort=${sortBy}`)
		.then((res) => res.data)
		.catch((e) => {
			throw e
		})
}

const PostRoute = () => {
	const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? 1) ?? 1

	const { sortBy } = useParams()
	const pagedPost = useLoaderData() as PageType<PostType[]>

	document.title = `${sortBy === 'popular' ? '인기' : ' 최근'} 글 | 책잇아웃`

	return (
		<div className='container-xl'>
			<RouteTitle icon={<booksitoutIcon.post />} title={'전체 게시글'} />

			<div className='mb-3'>
				<PostRouteButton sortBy={sortBy} />
			</div>

			<div>
				{pagedPost.content.length === 0 ? (
					<NoContent />
				) : (
					pagedPost.content.map((post) => {
						return <PostRoutePost post={post} />
					})
				)}
			</div>

			<Page paged={pagedPost} currentPage={currentPage} url={`/community/post/${sortBy}`}></Page>
		</div>
	)
}

const PostRouteButton = ({ sortBy }) => {
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

					{/* <a href='/community/post/all/relevant' className='w-100'> */}
						<ToggleButton
							variant={sortBy === 'relevant' ? 'book' : 'light'}
							disabled
							type='radio'
							checked={false}
							className='w-100'
							value={'give-up'}>
							내 책 관련
						</ToggleButton>
					{/* </a> */}
				</ButtonGroup>
			</Card.Body>
		</Card>
	)
}

export default PostRoute
