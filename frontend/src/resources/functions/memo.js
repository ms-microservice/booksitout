const MEMO_API_URL = `http://localhost/v1/memo/all/`

const getMemo = (bookId, token, setMemoList) => {
	fetch(MEMO_API_URL + bookId, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((memoList) => setMemoList(memoList))
}

export { getMemo }
