import React from 'react'
import BookSearchResult from '../BookSearchResult'
import { MyBook } from '../../types/BookType'
import search from '../../functions/search'
import MyBookComponent from '../cardComponent/MyBookCardComponent'
import MyBookSearchLoading from '../placeholder/MyBookSearchPlaceholder'
import { MyBookSearchRange } from '../myBookSearchRange'
import BookSearchResultLoading from '../BookSearchResultLoading'

const MyBookSearchResult = ({query}) => {
    const [loading, setLoading] = React.useState<boolean>(true)

	const [myBookList, setMyBookList] = React.useState<MyBook[]>([])
    React.useEffect(() => {
		setLoading(true)

		search.api.search
			.myBook(query || '')
			.then((result) => setMyBookList(result))
			.finally(() => setLoading(false))
	}, [query])

    if (loading) {
		return <BookSearchResultLoading label='내 책' labelComponent={MyBookSearchRange.getDisplayName()} CardComponent={MyBookSearchLoading} />
    }

    return <BookSearchResult label='내 책' labelComponent={MyBookSearchRange.getDisplayName()} bookList={myBookList} CardComponent={MyBookComponent} isConfigured={true} />
}

export default MyBookSearchResult