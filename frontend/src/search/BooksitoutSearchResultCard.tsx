import React from 'react'
import BookSearchResult from './BookSearchResult'
import { BookType } from '../types/BookType'
import { booksitoutServer } from '../functions/axios'
import BooksitoutCardComponent from './searchResult/BooksitoutSearchResult'
import BooksitoutSearchResultLoading from './placeholder/BooksitoutSearchResultLoading'
import BookSearchResultLoading from './BookSearchResultLoading'

const BooksitoutSearchResultCard = ({ query }) => {
	const [loading, setLoading] = React.useState<boolean>(true)

	const [bookList, setBookList] = React.useState<BookType[]>([])
	React.useEffect(() => {
		setLoading(true)

        booksitoutServer
			.get(`v5/book-isbn?query=${query}&size=10`)
			.then((res) => setBookList(res.data))
			.finally(() => setLoading(false))
	}, [query])

	if (loading) {
		return (
			<BookSearchResultLoading
				label="책잇아웃 책"
				labelComponent={<></>}
				CardComponent={BooksitoutSearchResultLoading}
			/>
		)
	}

	return (
		<BookSearchResult
			label='책잇아웃 책'
			labelComponent={<></>}
			bookList={bookList}
			CardComponent={BooksitoutCardComponent}
			isConfigured={true}
		/>
	)
}

export default BooksitoutSearchResultCard