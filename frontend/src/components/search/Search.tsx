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
			search.myBook(query || '').then((result) => setMyBookList(result)),
			search.settings.library.isConfigured() && search.library(query || '', search.settings.library.api.region(), search.settings.library.api.regionDetail()).then((result) => setLibraryBookList(result)),

			(search.settings.usedOnline.isConfigured() || search.settings.usedOffline.isConfigured()) &&
				search.used(query || '', 'ALADIN,YES24').then((result) => {
					setOnlineUsedBookList(result.online)
					setOfflineUsedBookList(result.offline)
				}),

			search.settings.subscription.isConfigured() && search.subscription(query || '', search.settings.subscription.api()).then((result) => setSubscriptionBookList(result)),
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
			<BookSearchResult label='도서관' labelComponent={<LibraryLabel />} bookList={libraryList} CardComponent={LibraryComponent} isConfigured={search.settings.library.isConfigured()} />
			<BookSearchResult label='전자도서관' labelComponent={<LibraryOnlineLabel />} bookList={onlineLibraryList} CardComponent={<></>} isConfigured={search.settings.onlineLibrary.isConfigured()} />
			<BookSearchResult label='구독' labelComponent={<SubscriptionLabel />} bookList={subscriptionList} CardComponent={SubscriptionComponent} isConfigured={search.settings.subscription.isConfigured()} />
			<BookSearchResult label='중고책 (온라인)' labelComponent={<UsedOnlineLabel />} bookList={onlineUsedList} CardComponent={UsedBookComponent} isConfigured={search.settings.usedOnline.isConfigured()} />
			<BookSearchResult label='중고책 (매장)' labelComponent={<UsedOfflineLabel />} bookList={offlineUsedList} CardComponent={UsedBookComponent} isConfigured={search.settings.usedOffline.isConfigured()} />
		</div>
	)
}

export default Search
