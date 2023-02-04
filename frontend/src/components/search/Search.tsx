import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
import BookSearchResult from './BookSearchResult'
import MyBookComponent from './cardComponent/MyBookCardComponent'
import UsedBookComponent from './cardComponent/UsedBookCardComponent'
import UsedOnlineLabel from './label/UsedOnlineLabel'
import UsedOfflineLabel from './label/UsedOfflineLabel'
import SubscriptionComponent from './cardComponent/SubscriptionCardComponent'
import SubscriptionLabel from './label/SubscriptionLabel'
import LibraryComponent from './cardComponent/LibraryCardComponent'
import LibraryLabel from './label/LibraryLabel'
import LibraryOnlineLabel from './label/OnlineLibraryLabel'
import LibraryDetailModal from './LibraryDetailModal'
// Functions
import search from '../../functions/search'
import uiSettings from '../../settings/ui'
// Types
import { UsedBook, MyBook, LibraryBook, SubscriptionBook } from './BookType'

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
	const [libraryList, setLibraryBookList] = useState<LibraryBook[]>([])
	const [onlineLibraryList, setOnlineLibraryBookList] = useState([])
	const [onlineUsedList, setOnlineUsedBookList] = useState<UsedBook[]>([])
	const [offlineUsedList, setOfflineUsedBookList] = useState<UsedBook[]>([])
	const [subscriptionList, setSubscriptionBookList] = useState<SubscriptionBook[]>([])
	useEffect(() => {
		setLoading(true)

		Promise.all([
			
			search.api.search.myBook(query || '')
				.then((result) => setMyBookList(result)),

			search.local.settings.library.isConfigured() && 
				search.api.search.library(query || '', search.local.settings.library.api.region(), search.local.settings.library.api.regionDetail())
					.then((result) => setLibraryBookList(result)),

			search.local.settings.subscription.isConfigured() && 
				search.api.search.subscription(query || '', search.local.settings.subscription.api())
					.then((result) => setSubscriptionBookList(result)),

			(search.local.settings.usedOnline.isConfigured() || search.local.settings.usedOffline.isConfigured()) &&
				search.api.search.used(query || '', search.local.settings.usedOnline.api(), search.local.settings.usedOffline.api())
					.then((result) => {	setOnlineUsedBookList(result.online)
													setOfflineUsedBookList(result.offline)
					}
			),

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

			<BookSearchResult label='내 책' labelComponent={<></>} bookList={myBookList} CardComponent={MyBookComponent} isConfigured={true} />
			<BookSearchResult label='도서관' labelComponent={<LibraryLabel />} bookList={libraryList} CardComponent={LibraryComponent} isConfigured={search.local.settings.library.isConfigured()} />
			<BookSearchResult label='전자도서관' labelComponent={<LibraryOnlineLabel />} bookList={onlineLibraryList} CardComponent={<></>} isConfigured={search.local.settings.onlineLibrary.isConfigured()} />
			<BookSearchResult label='구독' labelComponent={<SubscriptionLabel />} bookList={subscriptionList} CardComponent={SubscriptionComponent} isConfigured={search.local.settings.subscription.isConfigured()} />
			<BookSearchResult label='중고 온라인' labelComponent={<UsedOnlineLabel />} bookList={onlineUsedList} CardComponent={UsedBookComponent} isConfigured={search.local.settings.usedOnline.isConfigured()} />
			<BookSearchResult label='중고 매장' labelComponent={<UsedOfflineLabel />} bookList={offlineUsedList} CardComponent={UsedBookComponent} isConfigured={search.local.settings.usedOffline.isConfigured()} />
		</div>
	)
}

export default Search
