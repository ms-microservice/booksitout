import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import AddBookSearchResultLoading from '../search/AddBookSearchResultLoading'
import NoContent from '../common/NoContent'
import AddBookSearchResult from '../search/AddBookSearchResult'

import { NewBookSearchResult } from '../../types/BookType'

import { AiFillCheckCircle as CheckIcon } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { booksitoutServer } from '../../functions/axios'

import '../../resources/css/addBookModal.css'

const BookSearchModal = ({ show, setShow, isbn, setIsbn, recentBookList, setRecentBookList }) => {
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(false)

	const [query, setQuery] = React.useState('')
	const [searchResult, setSearchResult] = React.useState<NewBookSearchResult[]>([])
	React.useEffect(() => {
		setLoading(query !== '')

		if (query === '') {
			setSearchResult([])
			return
		}

		const typingTimer = setTimeout(() => {
			if (query !== '') {
				booksitoutServer
					.get(`/v3/search/new/naver?query=${query}&size=12`)
					.then((res) => setSearchResult(res.data))
					.catch(() => setError(true))
					.finally(() => setLoading(false))
			}
		}, 500)

		return () => clearTimeout(typingTimer)
	}, [query])

	const getSelectedBook = () => {
		return searchResult.find((book) => book.isbn == isbn) ?? null
	}

	const handleSelect = () => {
		const selectedBook = getSelectedBook()
		if (selectedBook === null) {
			toast.error('사용할 책을 선택해 주세요')
			return
		}

		setRecentBookList([
			{
				title: selectedBook.title,
				author: selectedBook.author,
				cover: selectedBook.cover,
				isbn: Number(selectedBook.isbn),
			},
			...recentBookList,
		])

		setShow(false)
	}

	return (
		<Modal show={show} onHide={() => setShow(false)} size='lg' backdrop='static' fullscreen='md-down' centered>
			<Modal.Header className='text-center' closeButton>
				<h3 className='w-100'>직접 검색해서 지정하기</h3>
			</Modal.Header>

			<Modal.Body style={{ height: '1000px', overflowY: 'scroll', overflowX: 'hidden' }}>
				<Form>
					<Form.Control
						placeholder='책 제목 / 저자를 검색해 주세요'
						onChange={(e) => setQuery(e.target.value)}
						autoComplete='off'
						autoFocus
					/>

					{loading ? (
						<div className='row'>
							{Array(12)
								.fill(0)
								.map(() => {
									return (
										<div className='col-6 col-md-3'>
											<AddBookSearchResultLoading />
										</div>
									)
								})}
						</div>
					) : searchResult.length === 0 ? (
						<NoContent message='검색 결과가 없어요' iconSize={10} textSize={2} />
					) : (
						<div className='row'>
							{searchResult.map((book) => {
								return (
									<div className='col-6 col-md-3' onClick={() => setIsbn(Number(book.isbn ?? 0))}>
										{book.isbn == isbn && (
											<CheckIcon className='text-book opacity-100 h1' style={{ zIndex: '200', position: 'absolute' }} />
										)}

										<span className={`${book.isbn == isbn && 'opacity-50'}`}>
											<AddBookSearchResult book={book} />
										</span>
									</div>
								)
							})}
						</div>
					)}

					<Button variant='book' onClick={handleSelect} id='search-modal-button' disabled={getSelectedBook() == null}>
						이 책 선택하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default BookSearchModal
