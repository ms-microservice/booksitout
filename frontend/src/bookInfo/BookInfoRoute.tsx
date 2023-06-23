import { useLoaderData } from 'react-router-dom'
import { BookType } from '../types/BookType'
import BookInfoBasicInfoCard from './BookInfoBasicInfoCard'
import BookInfoPostCard from './BookInfoPostCard'
import BookInfoStatisticsCard from './BookInfoStatisticsCard'
import BookInfoCoverCard from './BookInfoCoverCard'
import BookInfoQuizCard from './BookInfoQuizCard'
import { PostType } from '../community/post/PostType'
import axios from 'axios'
import urls from '../settings/urls'
import RouteTitle from '../common/RouteTitle'
import booksitoutIcon from '../common/icons/booksitoutIcon';

interface LoaderData {
	book: BookType
	postList: PostType[]
}

export async function loader({ params }) {
	const isbn = params.isbn

	const fetchBook = axios.get(`${urls.api.base}/v4/book-isbn/${isbn}`).then((res) => res.data)
	const fetchPostList = axios.get(`${urls.api.base}/v4/forum/post/by-isbn?isbn=${isbn}`).then((res) => res.data)

	const [book, postList] = await Promise.all([fetchBook, fetchPostList])

	return { book: book, postList: postList }
}

const BookInfoRoute = () => {
	const { book, postList } = useLoaderData() as LoaderData

	return (
		<div className='container-xl'>
			<RouteTitle icon={<booksitoutIcon.book />} title={'책 정보'} />

			<BookInfoBasicInfoCard book={book} />
			<div className='mb-4' />

			<BookInfoPostCard postList={postList} />
			<div className='mb-4' />

			<BookInfoQuizCard />
			<div className='mb-4' />

			<BookInfoStatisticsCard />
			<div className='mb-4' />

			<BookInfoCoverCard />
			<div className='mb-4' />
		</div>
	)
}

export default BookInfoRoute
