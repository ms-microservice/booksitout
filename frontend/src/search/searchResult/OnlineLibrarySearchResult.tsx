import React from 'react'
import search from '../../functions/search'
import BookSearchResult from '../BookSearchResult'
import LibraryOnlineLabel from '../label/OnlineLibraryLabel'
import LibraryOnlineCardComponent from '../cardComponent/LibraryOnlineCardComponent'
import OnlineLibrarySearchLoading from '../placeholder/OnlineLibrarySearchLoading'
import SearchResultInitialFetch from '../placeholder/SearchResultInitialFetch'
import BookSearchResultLoading from '../BookSearchResultLoading'

const OnlineLibrarySearchResult = ({query}) => {
	const [loading, setLoading] = React.useState(true)
	const [initialFetch, setInitialFetch] = React.useState(true)

	const [onlineLibraryList, setOnlineLibraryBookList] = React.useState([])
    React.useEffect(() => {
		setInitialFetch(true)
		setLoading(true)

		setTimeout(() => {
			setInitialFetch(false)
		}, 300)

		search.local.settings.onlineLibrary.isConfigured() &&
			search.api.search
				.libraryOnline(query || '', search.local.settings.onlineLibrary.api())
				.then((result) => setOnlineLibraryBookList(result))
				.finally(() => {
					setLoading(false)
					setInitialFetch(false)
				})
	}, [query])

	if (initialFetch) {
		return (
			<BookSearchResult
			label='전자도서관'
			labelComponent={<LibraryOnlineLabel />}
			bookList={[1, 2]}
			CardComponent={SearchResultInitialFetch}
			isConfigured={true}
		/>
		)
	}

	if (loading) {
		return <BookSearchResultLoading label='전자도서관' labelComponent={<LibraryOnlineLabel />} CardComponent={OnlineLibrarySearchLoading} />
	}

    return (
		<BookSearchResult
			label='전자도서관'
			labelComponent={<LibraryOnlineLabel />}
			bookList={onlineLibraryList}
			CardComponent={LibraryOnlineCardComponent}
			isConfigured={search.local.settings.onlineLibrary.isConfigured()}
		/>
	)
}

export default OnlineLibrarySearchResult