const QUOTE_API_URL = `http://localhost/v1/quotation/all/`

const getQuotation = (bookId, token, setQuotationList) => {
	fetch(QUOTE_API_URL + bookId, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((quotationList) => setQuotationList(quotationList))
}

export { getQuotation }
