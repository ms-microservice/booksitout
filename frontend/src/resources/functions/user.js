import { JOIN_API_URL, LOGIN_API_URL } from '../data/apiUrl'

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
			alert(data.message)

			if (data.status.toString().startsWith(2)) {
				navigate('/login')
			}
		})
		.catch((err) => console.log(err))
}

const login = (e, navigate, setToken, email, password, stayLogin) => {
	e.preventDefault()
	setToken('')

	if (password === '') {
		alert('비밀번호를 입력해 주세요')
		return
	}

	if (password.length < 6) {
		alert('비밀번호는 6자 이상이에요')
		return
	}

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
			alert(data.message)
			navigate('/')
		})
		.catch(() => {
			localStorage.setItem('login-token', '')
			localStorage.setItem('user-name', '')
		})
}

export { join, login }
