import React from 'react'
import BookSearchResult from '../BookSearchResult'
import LibraryLabel from '../label/LibraryLabel'
import LibraryComponent from '../cardComponent/LibraryCardComponent'
import search from '../../functions/search'
import { LibraryBook } from '../../types/BookType'
import LibrarySearchLoading from '../placeholder/LibrarySearchLoading'
import { booksitoutServer } from '../../functions/axios'
import urls from '../../settings/urls'
import BookSearchResultLoading from '../BookSearchResultLoading'

const LibrarySearchResult = ({query}) => {
	const [loading, setLoading] = React.useState<boolean>(true)

	const [libraryList, setLibraryBookList] = React.useState<LibraryBook[]>([])
    React.useEffect(() => {
		setLoading(true)

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
				})
		}
    }, [query])

	if (loading) {
		return <BookSearchResultLoading label='도서관' labelComponent={<LibraryLabel />} CardComponent={LibrarySearchLoading} />
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