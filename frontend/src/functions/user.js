import { JOIN_API_URL, LOGIN_API_URL } from '../url/apiUrl'
import toast from 'react-hot-toast'

const join = (e, navigate, email, emailVerification, password, name) => {
	e.preventDefault()

	fetch(JOIN_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			toast.success(data.message)

			if (data.status.toString().startsWith(2)) {
				navigate('/login')
			}
		})
		.catch((err) => toast.error(err))
}

const login = (e, navigate, setToken, email, password, stayLogin) => {
	e.preventDefault()
	toast.dismiss()
	setToken('')

	if (password === '') {
		alert('비밀번호를 입력해 주세요')
		return
	}

	if (password.length < 6) {
		alert('비밀번호는 6자 이상이에요')
		return
	}

	toast.loading('로그인하고 있어요')

	fetch(LOGIN_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email,
			password: password,
			stayLogin: stayLogin,
		}),
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}
			return res.json()
		})
		.then((data) => {
			localStorage.setItem('login-token', data.token)
			localStorage.setItem('user-name', data.name)
			setToken(data.token)

			toast.dismiss()
			toast(data.message, { icon: '✋' })
			navigate('/')
		})
		.catch(() => {
			localStorage.setItem('login-token', '')
			localStorage.setItem('user-name', '')
			toast.dismiss()
			toast.error('이메일이나 비밀번호가 틀려요. 다시 확인해 주세요')
		})
}

const logout = (e, setToken, navigate) => {
	e.preventDefault()
	localStorage.setItem('login-token', '')
	localStorage.setItem('user-name', '')
	setToken('')
	toast.success('로그아웃했어요')
	navigate('/login')
}

const getToken = () => {
	return localStorage.getItem('login-token')
}

const getIsLoggedIn = () => {
	const token = getToken()

	return !(token == null || token == '' || typeof token == 'undefined')
}

export { join, login, logout, getToken, getIsLoggedIn }
