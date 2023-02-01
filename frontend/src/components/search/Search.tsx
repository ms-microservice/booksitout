import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
import BookSearchResult from './BookSearchResult'
import UsedBookCardComponent from './cardComponent/UsedBookCardComponent'
import MyBookCardComponent from './cardComponent/MyBookCardComponent'
import LibraryCardComponent from './cardComponent/LibraryCardComponent'
// Functions
import search from '../../functions/search'
import uiSettings from '../../settings/ui'
// Types
import { UsedBook, MyBook, LibraryBook } from './BookType'
import LibraryDetailModal from './LibraryDetailModal'

const Search = () => {
	const { query } = useParams()

	const [loading, setLoading] = useState(true)
	const [initial, setInitial] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setInitial(false)
		}, uiSettings.initalFetchTime)
	}, [])

	const [myBookList, setMyBookList] = useState<MyBook[]>([])
	const [libraryBookList, setLibraryBookList] = useState<LibraryBook>([])
	const [onlineLibraryBookList, setOnlineLibraryBookList] = useState([])
	const [onlineUsedBookList, setOnlineUsedBookList] = useState<UsedBook[]>([])
	const [offlineUsedBookList, setOfflineUsedBookList] = useState([])
	const [subscriptionBookList, setSubscriptionBookList] = useState([])
	useEffect(() => {
		setLoading(true)

		Promise.all([
			search.myBook(query).then((result) => setMyBookList(result)),
			search.used(query, 'ALADIN').then((result) => {
				setOnlineUsedBookList(result.online)
				setOfflineUsedBookList(result.offline)
			}),
			search.library(query, 'SEOUL', 'YEONGDEUNGPOGU').then((result) => setLibraryBookList(result)),
		]).finally(() => {
			setLoading(false)
			setInitial(false)
		})
	}, [query])

	if (initial) return <></>
	if (loading) return <Loading />

	return (
		<div className='container mt-5'>
			<LibraryDetailModal />

			<BookSearchResult label='내 책' bookList={myBookList} CardComponent={MyBookCardComponent} />
			<BookSearchResult label='도서관' bookList={libraryBookList} CardComponent={LibraryCardComponent} />

			<BookSearchResult label='전자도서관' bookList={onlineLibraryBookList} CardComponent={MyBookCardComponent} />
			<BookSearchResult label='구독 플레폼' bookList={subscriptionBookList} CardComponent={MyBookCardComponent} />

			<BookSearchResult label='중고책 (온라인)' bookList={onlineUsedBookList} CardComponent={UsedBookCardComponent} />
			<BookSearchResult label='중고책 (매장)' bookList={offlineUsedBookList} CardComponent={UsedBookCardComponent} />
		</div>
	)
}

export default Search
