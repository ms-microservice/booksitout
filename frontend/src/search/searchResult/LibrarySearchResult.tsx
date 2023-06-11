import React from 'react'
import BookSearchResult from '../BookSearchResult'
import LibraryLabel from '../label/LibraryLabel'
import LibraryComponent from '../cardComponent/LibraryCardComponent'
import search from '../../functions/search'
import { LibraryBook } from '../../types/BookType'
import LibrarySearchLoading from '../placeholder/LibrarySearchLoading'
import { booksitoutServer } from '../../functions/axios'
import urls from '../../settings/urls'
import SearchResultInitialFetch from '../placeholder/SearchResultInitialFetch'

const LibrarySearchResult = ({query}) => {
	const [loading, setLoading] = React.useState<boolean>(true)
	const [initialFetch, setInitialFetch] = React.useState<boolean>(true)

	const [libraryList, setLibraryBookList] = React.useState<LibraryBook[]>([])
    React.useEffect(() => {
		// setInitialFetch(true)
		setLoading(true)

		setTimeout(() => {
			setInitialFetch(false)
		}, 300)

        if (search.local.settings.library.isConfigured()) {
			booksitoutServer
				.get(
					urls.api.search.libraryByRegion(
						query || '',
						search.local.settings.library.api.region(),
						search.local.settings.library.api.regionDetail()
					)
				)
				.then((res) => setLibraryBookList(res.data))
				.catch(() => setLibraryBookList([]))
				.finally(() => {
					setLoading(false)
					setInitialFetch(false)
				})
		}
    }, [query])

	if (initialFetch) {
		return (
			<BookSearchResult
				label='도서관'
				labelComponent={<LibraryLabel />}
				bookList={[1, 2]}
				CardComponent={SearchResultInitialFetch}
				isConfigured={true}
				notConfiguredUrl=''
			/>
		)
	}

	if (loading) {
		return (
			<BookSearchResult
				label='도서관'
				labelComponent={<LibraryLabel />}
				bookList={[1, 2]}
				CardComponent={LibrarySearchLoading}
				isConfigured={true}
				notConfiguredUrl=''
			/>
		)
	}

    return (
		<BookSearchResult
			label='도서관'
			labelComponent={<LibraryLabel />}
			bookList={libraryList}
			CardComponent={LibraryComponent}
			isConfigured={search.local.settings.library.isConfigured()}
			notConfiguredUrl='/settings/search/library'
		/>
	)

}

export default LibrarySearchResult