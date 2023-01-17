import urls from '../settings/urls'
// import { API_BASE_URL, JOIN_API_URL, LOGIN_API_URL } from '../settings/urls/apiUrl'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE } from '../messages/commonMessages'
import userMessage from '../messages/userMessage'

const isEmailValid = (email) => {
	return email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}

const verifyEmail = (email) => {
	toast.loading('잠시만 기다려 주세요')

	return fetch(urls.api.user.email(email), {
		method: 'POST',
	}).then((res) => {
		const status = res.status

		if (status === 409) {
			toast.error(userMessage.verfiyEmail.fail.alreadyRegistered)
			return false
		} else if (status === 200) {
			toast.success(userMessage.verfiyEmail.success.sent)
			return true
		} else if (status === 202) {
			toast.success(userMessage.verfiyEmail.success.alreadySent)
			return true
		} else {
			toast.error(ERROR_MESSAGE)
			return false
		}
	})
}

const join = (e, navigate, email, emailVerificationCode, password, name) => {
	e.preventDefault()

	if (email === '') {
		toast.error(userMessage.join.error.email.null)
		return
	}

	if (
		!email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		toast.error(userMessage.join.error.email.invalid)
		return
	}

	if (emailVerificationCode === '') {
		toast.error(userMessage.join.error.email.notVerified)
		return
	}

	if (name === '') {
		toast.error(userMessage.join.error.name.null)
		return
	}

	if (password === '') {
		toast.error(userMessage.join.error.pw.null)
		return
	}

	if (password.length < 6) {
		toast.error(userMessage.join.error.pw.short)
		return
	}

	toast.loading(userMessage.join.loading)

	fetch(urls.api.user.join, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email,
			code: emailVerificationCode,
			password: password,
			name: name,
		}),
	})
		.then((res) => {
			const status = res.status.toString()
			if (!status.startsWith(2)) {
				throw new Error(status)
			}

			return res.json()
		})
		.then(() => {
			toast.success(`책-it-out에 오신걸 환영해요, ${name}님!`)
			navigate('/login')
		})
		.catch((err) => {
			const status = err.toString()

			if (status.includes('400')) {
				toast.error(userMessage.join.error.email.codeNotMatch)
			} else if (status.includes('412')) {
				toast.error(userMessage.join.error.email.notVerified)
			} else {
				toast.error(ERROR_MESSAGE)
			}
		})
}

const login = (e, navigate, setToken, email, password, stayLogin) => {
	e.preventDefault()
	toast.dismiss()
	setToken('')

	if (email === '') {
		toast.error('이메일을 입력해 주세요')
		return
	}

	if (!email.includes('@')) {
		toast.error('이메일 형식에 맞지 않아요')
		return
	}

	if (password === '') {
		toast.error('비밀번호를 입력해 주세요')
		return
	}

	if (password.length < 6) {
		toast.error('비밀번호는 6자 이상이에요')
		return
	}

	toast.loading('로그인하고 있어요')

	fetch(urls.api.user.login.basic, {
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
			localStorage.setItem('register-year', data.registerDate[0])
			localStorage.setItem('login-date', new Date())
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

	if (localStorage.getItem('reading-session-time') == null) {
		localStorage.setItem('login-token', '')
		localStorage.setItem('user-name', '')
		setToken('')
		toast.success('로그아웃했어요')
		navigate('/login')
	} else {
		toast.error('독서활동이 진행중이에요. 지금 로그아웃하면 독서활동이 사라져요. 독서활동을 먼저 끝내 주세요')
	}
}

const getToken = () => {
	return localStorage.getItem('login-token')
}

const getIsLoggedIn = () => {
	const token = getToken()

	return !(token == null || token == '' || typeof token == 'undefined')
}

const changeName = (name) => {
	const CHANGE_NAME_API_URL = `${urls.api.base}/v1/change-name`
	const token = getToken()

	return fetch(CHANGE_NAME_API_URL, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: name,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const updateLocalStorageName = (name) => {
	localStorage.setItem('user-name', name)
}

const requestChangePasswordVerificationCode = () => {
	const token = getToken()
	const CHANGE_PASSWORD_VERIFY_API_URL = `${urls.api.base}/v1/change-password/verification`

	return fetch(CHANGE_PASSWORD_VERIFY_API_URL, {
		method: 'POST',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const changePassword = (verificationCode, oldPassword, newPassword) => {
	const token = getToken()
	const CHANGE_PASSWORD_API_URL = `${urls.api.base}/v1/change-password`

	return fetch(CHANGE_PASSWORD_API_URL, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			code: verificationCode,
			oldPassword: oldPassword,
			newPassword: newPassword,
		}),
	}).then((res) => {
		return res.status.toString()
	})
}

export {
	join,
	login,
	logout,
	getToken,
	getIsLoggedIn,
	verifyEmail,
	isEmailValid,
	changeName,
	updateLocalStorageName,
	requestChangePasswordVerificationCode,
	changePassword,
}
