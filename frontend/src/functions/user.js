import { API_BASE_URL, JOIN_API_URL, LOGIN_API_URL } from '../settings/urls/apiUrl'
import toast from 'react-hot-toast'

const verifyEmail = (email) => {
	const EMAIL_VERIFICATION_API_URL = `${API_BASE_URL}/v1/join/email-verification/${email}`

	toast.loading('잠시만 기다려 주세요')

	return fetch(EMAIL_VERIFICATION_API_URL, {
		method: 'POST',
	}).then((res) => {
		const status = res.status.toString()
		toast.dismiss()

		if (status == 409) {
			toast.error('이미 가입된 이메일이에요')
			return false
		} else if (status == 200) {
			toast.success('인증번호를 보냈어요. 메일을 확인해 주세요')
			return true
		} else if (status == 202) {
			toast.success('가입중인 이메일이에요. 이미 보낸 인증번호를 입력해 주세요')
			return true
		} else {
			toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			return false
		}
	})
}

const join = (e, navigate, email, emailVerificationCode, password, name) => {
	e.preventDefault()

	if (email === '') {
		toast.error('아이디로 사용하실 이메일을 입력해 주세요')
		return
	}

	if (
		!email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		toast.error('올바른 이메일 형식이 아니에요')
		return
	}

	if (emailVerificationCode === '') {
		toast.error('이메일 인증을 진행해 주세요')
		return
	}

	if (name === '') {
		toast.error('이름을 입력해 주세요')
		return
	}

	if (password === '') {
		toast.error('비밀번호를 입력해 주세요')
		return
	}

	if (password.length < 6) {
		toast.error('6자리 이상의 비밀번호를 입력해 주세요')
		return
	}

	toast.loading('가입하고 있어요')

	fetch(JOIN_API_URL, {
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
			toast.dismiss()
			toast.success(`책-it-out에 오신걸 환영해요, ${name}님!`)
			navigate('/login')
		})
		.catch((err) => {
			const status = err.toString()
			toast.dismiss()

			if (status.includes('400')) {
				toast.error('이메일 인증번호가 일치하지 않아요. 다시 확인해 주세요')
			} else if (status.includes('412')) {
				toast.error('이메일 인증을 진행해 주세요')
			} else {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
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

export { join, login, logout, getToken, getIsLoggedIn, verifyEmail }
