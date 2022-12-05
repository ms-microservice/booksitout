import { API_BASE_URL, GIVE_UP_BOOK_API_URL, ADD_BOOK_API_URL, BOOK_DELETE_API_URL } from '../data/apiUrl'
import toast from 'react-hot-toast'

const getBookList = (token, range, setBookList, setError, setLoading, setInitialFetch) => {
	fetch(`${API_BASE_URL}/v1/book/all/${range}`, {
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}
			return res.json()
		})
		.then((data) => {
			setBookList(data)
		})
		.catch(() => setError(true))
		.finally(() => {
			setLoading(false)
			setInitialFetch(false)
		})
}

const addBook = (e, token, navigate, title, author, cover, language, endPage, category, form, source, isSharing) => {
	e.preventDefault()

	if (endPage == 0) {
		toast.error('0은 페이지로 입력할 수 없어요')
		return
	}

	fetch(ADD_BOOK_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			title: title,
			author: author,
			cover: cover,
			language: language,

			endPage: endPage,
			category: category,

			form: form,
			source: source,

			isSharing: isSharing,
		}),
	})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			if (data.status.toString().startsWith(2)) {
				toast.success(data.message)
				navigate('/book/not-done')
			}
		})
		.catch((e) => {
			console.log(e)
		})
}

const giveUpBook = (bookId, token, navigate) => {
	fetch(GIVE_UP_BOOK_API_URL + bookId, {
		method: 'PUT',
		headers: { Authorization: token },
	}).then((res) => {
		if (res.status.toString().startsWith(2)) {
			alert('책을 포기했어요. 마음이 언제든지 다시 시작하실 수 있어요!')
			navigate('/book/give-up')
		} else {
			alert('오류가 났어요 다시 시도해 주세요')
		}
	})
}

const deleteBook = (bookId, token, navigate) => {
	const confirmation = window.confirm('정말 책을 삭제할까요?')

	if (confirmation) {
		fetch(BOOK_DELETE_API_URL + bookId, {
			method: 'DELETE',
			headers: { Authorization: token },
		}).then((res) => {
			if (res.status.toString().startsWith(2)) {
				toast.success('책을 삭제 했어요')
				navigate('/book/not-done')
			} else {
				toast.error('알 수 없는 이유로 실패했어요 다시 시도해 주세요')
			}
		})
	}
}

export { giveUpBook, getBookList, addBook, deleteBook }
