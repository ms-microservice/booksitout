import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import urls from '../../../settings/urls'
import { useQuery } from '../../../functions/useQuery'
import { ERROR_MESSAGE } from '../../../messages/commonMessages'
import Loading from '../../common/Loading'
import { useDispatch } from 'react-redux'
import { login } from '../../../functions/user'

const OAuthNaver = () => {
	const navigate = useNavigate()
	const query = useQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		const code = query.get('code')
		const state = query.get('state')

		axios
			.get(urls.api.user.login.oauth.naver.api(code, state))
			.then((res) => {
				if (res.status !== 200) throw new Error()

				dispatch(login(res.data.token))
				localStorage.setItem('user-name', res.data.name)
				// localStorage.setItem('register-year', res.data.registerDate.substring(0, 4))
				localStorage.setItem('login-date', new Date())
				localStorage.setItem('profile-image', res.data.profileImage)
				toast.dismiss()
				toast(res.data.message, { icon: '✋' })
				navigate('/')
			})
			.catch((e) => {
				toast.error(ERROR_MESSAGE + e)
				navigate('/login')
			})
	}, [])

	return <Loading message={`네이버로 로그인하고 있어요`} />
}

export default OAuthNaver
