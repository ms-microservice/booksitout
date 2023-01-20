import axios from 'axios'
import urls from '../settings/urls'
import utils from './utils'

const getQuotationListOfBook = (bookId) => {
	return axios.get(urls.api.quotation.get.all(bookId), { headers: { Authorization: utils.getToken() } }).then((res) => res.data)
}

const addQuotation = (bookId, quotation) => {
	return axios
		.post(urls.api.quotation.add(bookId), quotation, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const editQuotation = (editedQuotation) => {
	return axios
		.put(urls.api.quotation.edit(editedQuotation.quotationId), editQuotation, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const deleteQuotation = (quotationId) => {
	return axios
		.delete(urls.api.quotation.delete(quotationId), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

export { getQuotationListOfBook, addQuotation, editQuotation, deleteQuotation }
