import axios from 'axios'
import toast from 'react-hot-toast'

import urls from '../settings/urls'
import messages from '../settings/messages'
import apiSettings from '../settings/api'
import utils from './utils'

const verifyEmail = (email) => {
	toast.loading('잠시만 기다려 주세요')
	return axios.post(urls.api.user.email(email), null, { headers: apiSettings.headers }).then((res) => {
		if (res.status === 409) {
			toast.error(messages.user.join.verfiyEmail.fail.alreadyRegistered)
			return false
		} else if (res.status === 200) {
			toast.success(messages.user.join.verfiyEmail.success.sent)
			return true
		} else if (res.status === 202) {
			toast.success(messages.user.join.verfiyEmail.success.alreadySent)
			return true
		} else {
			toast.error(messages.error)
			return false
		}
	})
}

const join = (joinRequest) => {
	return axios.post(urls.api.user.join, joinRequest, { headers: apiSettings.headers }).then((res) => res.status)
}

const login = (loginRequest) => {
	return axios
		.post(urls.api.user.login.basic, loginRequest, { headers: apiSettings.headers })
		.then((res) => {
			if (res.status !== 200) throw new Error()
			return res.data
		})
		.catch(() => {
			localStorage.setItem('login-token', '')
			localStorage.setItem('user-name', '')
			return false
		})
		.then((data) => {
			localStorage.setItem('login-token', data.token)
			localStorage.setItem('user-name', data.name)
			// localStorage.setItem('register-year', data.registerDate[0])
			localStorage.setItem('login-date', new Date().toString())
			toast.dismiss()
			toast(data.message, { icon: '✋' })
			return true
		})
}

const isLogoutPossible = () => {
	return localStorage.getItem('reading-session-time') == null
}

const getIsLoggedIn = () => {
	const token = utils.getToken()
	return !(token == null || token === '' || typeof token == 'undefined')
}

const changeName = (name) => {
	return axios
		.post(urls.api.user.change.name, { name: name }, { headers: apiSettings.headers })
		.then((res) => res.status.toString().startsWith('2'))
}

const updateLocalStorageName = (name) => {
	localStorage.setItem('user-name', name)
}

const requestChangePasswordVerificationCode = () => {
	return axios
		.post(urls.api.user.change.password.verify, null, { headers: apiSettings.headers })
		.then((res) => res.status.toString().startsWith('2'))
}

const changePassword = (verificationCode, oldPassword, newPassword) => {
	const body = { code: verificationCode, oldPassword: oldPassword, newPassword: newPassword }
	return axios.post(urls.api.user.change.password.change, body, { headers: apiSettings.headers }).then((res) => res.status.toString())
}

const getProfileImage = () => {
	localStorage.getItem('profile-image')
}

export {
	join,
	login,
	isLogoutPossible,
	getIsLoggedIn,
	verifyEmail,
	changeName,
	updateLocalStorageName,
	requestChangePasswordVerificationCode,
	changePassword,
	getProfileImage,
}
