import React from 'react'
import BookSearchResult from '../BookSearchResult'
import { MyBook } from '../../../types/BookType'
import search from '../../../functions/search'
import MyBookComponent from '../cardComponent/MyBookCardComponent'
import MyBookSearchLoading from '../placeholder/MyBookSearchPlaceholder'
import SearchResultInitialFetch from '../placeholder/SearchResultInitialFetch'

const MyBookSearchResult = ({query}) => {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [initialFetch, setInitialFetch] = React.useState<boolean>(true)

	const [myBookList, setMyBookList] = React.useState<MyBook[]>([])
    React.useEffect(() => {
		// setInitialFetch(true)
		setLoading(true)

		setTimeout(() => {
			setInitialFetch(false)
		}, 300)

		search.api.search
			.myBook(query || '')
			.then((result) => setMyBookList(result))
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})
	}, [query])

    if (initialFetch) {
        return <BookSearchResult label='내 책' labelComponent={<></>} bookList={[1, 2]} CardComponent={SearchResultInitialFetch} isConfigured={true} />
    }

    if (loading) {
		return <BookSearchResult label='내 책' labelComponent={<></>} bookList={[1, 2]} CardComponent={MyBookSearchLoading} isConfigured={true} />
    }

    return <BookSearchResult label='내 책' labelComponent={<></>} bookList={myBookList} CardComponent={MyBookComponent} isConfigured={true} />
}

export default MyBookSearchResult