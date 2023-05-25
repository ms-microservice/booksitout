import axios from 'axios'
import urls from '../settings/urls'
import utils from './utils'

const getBookList = (range, page, size = 10) => {
	return axios
		.get(urls.api.book.get.all(range, page, size), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.data)
		.catch(() => { return null })
}

const getBook = (bookId) => {
	return axios
		.get(urls.api.book.get.detail(bookId), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.data)
		.catch(() => { return null })
}

const getLastBook = () => {
	return axios
		.get(urls.api.book.get.last, { headers: { Authorization: utils.getToken() } })
		.then((res) => res)
}

const addBook = (book) => {
	return axios
		.post(urls.api.book.add, book, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const editBook = (editedBook) => {
	return axios
		.put(urls.api.book.edit.all(editedBook.bookId), editedBook, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const giveUpBook = (bookId) => {
	return axios
		.put(urls.api.book.edit.giveup(bookId), null, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const unGiveUpBook = (bookId) => {
	return axios
		.put(urls.api.book.edit.unGiveup(bookId), null, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const deleteBook = (bookId) => {
	return axios
		.delete(urls.api.book.delete(bookId), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const addRating = (bookId, rating) => {
	return axios
		.put(urls.api.book.edit.all(bookId), { rating: rating }, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const addReview = (bookId, review) => {
	return axios
		.put(urls.api.book.edit.all(bookId), { review: review }, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

const addSummary = (bookId, summary) => {
	return axios
		.put(urls.api.book.edit.all(bookId), { summary: summary }, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
		.catch(() => { return false })
}

export { giveUpBook, getLastBook, getBookList, addBook, deleteBook, getBook, editBook, unGiveUpBook, addRating, addReview, addSummary }
