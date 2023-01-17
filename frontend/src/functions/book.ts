import axios from 'axios'
import urls from '../settings/urls'
import { getToken } from './user'

const getBookList = (range, page) => {
	return axios.get(urls.api.book.get.all(range, page), { headers: { Authorization: getToken() } }).then((res) => res.data)
}

const getBook = (bookId) => {
	return axios.get(urls.api.book.get.detail(bookId), { headers: { Authorization: getToken() } }).then((res) => res.data)
}

const getLastBook = () => {
	return axios.get(urls.api.book.get.last, { headers: { Authorization: getToken() } }).then((res) => res.data)
}

const addBook = (book) => {
	return axios.post(urls.api.book.add, book, { headers: { Authorization: getToken() } }).then((res) => res.status.toString().startsWith('2'))
}

const editBook = (editedBook) => {
	return axios
		.put(urls.api.book.edit.all(editedBook.bookId), editedBook, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const giveUpBook = (bookId) => {
	return axios
		.put(urls.api.book.edit.giveup(bookId), null, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const unGiveUpBook = (bookId) => {
	return axios
		.put(urls.api.book.edit.unGiveup(bookId), null, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const deleteBook = (bookId) => {
	return axios.delete(urls.api.book.delete(bookId), { headers: { Authorization: getToken() } }).then((res) => res.status.toString().startsWith('2'))
}

const addRating = (bookId, rating) => {
	return axios
		.put(urls.api.book.edit.all(bookId), { rating: rating }, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const addReview = (bookId, review) => {
	return axios
		.put(urls.api.book.edit.all(bookId), { review: review }, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const addSummary = (bookId, summary) => {
	return axios
		.put(urls.api.book.edit.all(bookId), { summary: summary }, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

export { giveUpBook, getLastBook, getBookList, addBook, deleteBook, getBook, editBook, unGiveUpBook, addRating, addReview, addSummary }
