import toast from 'react-hot-toast'
import axios from 'axios'
import urls from '../settings/urls'
import { getToken } from './user'

const getMemoListOfBook = (bookId) => {
	return axios.get(urls.api.memo.get.all(bookId), { headers: { Authorization: getToken() } }).then((res) => res.data)
}

const addMemo = (memo, bookId) => {
	return axios.post(urls.api.memo.add(bookId), memo, { headers: { Authorization: getToken() } }).then((res) => {
		res.status.toString().startsWith('2')
	})
}

const editMemo = (editedMemo) => {
	return axios
		.put(urls.api.memo.edit(editedMemo.memoId), editMemo, { headers: { Authorization: getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const deleteMemo = (memoId) => {
	return axios.delete(urls.api.memo.delete(memoId), { headers: { Authorization: getToken() } }).then((res) => res.status.toString().startsWith('2'))
}

export { getMemoListOfBook, addMemo, editMemo, deleteMemo }
