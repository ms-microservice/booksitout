import toast from 'react-hot-toast'
const QUOTATION_API_URL = `http://localhost/v1/quotation/`
const QUOTATION_ALL_API_URL = `http://localhost/v1/quotation/all/`

const getQuotation = (bookId, setQuotationList) => {
	const token = localStorage.getItem('login-token')

	fetch(QUOTATION_ALL_API_URL + bookId, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((quotationList) => setQuotationList(quotationList))
}

const addQuotation = (bookId, quotation) => {
	const token = localStorage.getItem('login-token')

	return fetch(QUOTATION_API_URL + bookId, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify(quotation),
	}).then((res) => {
		if (res.status.toString().startsWith(2)) {
			toast.success('인용을 추가했어요')
			return true
		} else {
			toast.error('오류가 났어요 잠시후 다시 시도해 주세요')
			return false
		}
	})
}

export { getQuotation, addQuotation }
