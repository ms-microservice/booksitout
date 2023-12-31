import React from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

import LibraryDetailModal from './LibraryDetailModal'
import MyBookSearchResult from './searchResult/MyBookSearchResult'
import LibrarySearchResult from './searchResult/LibrarySearchResult'
import OnlineLibrarySearchResult from './searchResult/OnlineLibrarySearchResult'
import SubscriptionSearchResult from './searchResult/SubscriptionSearchResult'
import OnlineUsedSearchResult from './searchResult/OnlineUsedSearchResult'

import search from '../functions/search'
import * as BookType from '../types/BookType'
import OfflineUsedSearchResult from './searchResult/OfflineUsedSearchResult'
import RouteTitle from '../common/RouteTitle'
import booksitoutIcon from '../common/icons/booksitoutIcon';
import ScrollToTop from '../common/topnav/ScrollToTop'
import BooksitoutSearchResultCard from './BooksitoutSearchResultCard'

const SearchRoute = () => {
	const { query } = useParams()
	document.title = `검색 : ${query} | 책잇아웃`

	const [onlineUsedList, setOnlineUsedBookList] = React.useState<BookType.UsedBook[] | undefined | null>(undefined)
	const [offlineUsedList, setOfflineUsedBookList] = React.useState<BookType.UsedBook[] | undefined | null>(undefined)
	React.useEffect(() => {
		(search.local.settings.usedOnline.isConfigured() || search.local.settings.usedOffline.isConfigured()) &&
			search.api.search.used(query || '', search.local.settings.usedOnline.api(), search.local.settings.usedOffline.api()).then((result) => {
				setOnlineUsedBookList(result.online)
				setOfflineUsedBookList(result.offline)
			})
			.catch(() => {
				setOnlineUsedBookList(null)
				setOfflineUsedBookList(null)
			})
	}, [query])

	return (
		<div className='container-xl mt-5'>
			<ScrollToTop />
			<LibraryDetailModal />

			<RouteTitle icon={<booksitoutIcon.search />} title={'검색 결과'} />

			<Alert variant='success' className='text-center'>
				클릭하면 책을 볼 수 있는 곳으로 이동해요
			</Alert>

			<MyBookSearchResult query={query} />
			<BooksitoutSearchResultCard query={query} />
			<LibrarySearchResult query={query} />
			<OnlineLibrarySearchResult query={query} />
			<SubscriptionSearchResult query={query} />
			<OnlineUsedSearchResult onlineUsedList={onlineUsedList} />
			<OfflineUsedSearchResult offlineUsedList={offlineUsedList} />
		</div>
	)
}

export default SearchRoute
