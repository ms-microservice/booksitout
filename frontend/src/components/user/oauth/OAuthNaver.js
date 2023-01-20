import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQuery } from '../../../functions/useQuery'
// Components
import Loading from '../../common/Loading'
// Settings
import urls from '../../../settings/urls'
// Messsages
// Redux
import { loginToken } from '../../../redux/userSlice'
import messages from '../../../settings/messages'

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
				return res.data
			})
			.catch((e) => {
				toast.error(messages.error + e)
				navigate('/login')
			})
			.then((userData) => {
				dispatch(loginToken(userData.token))

				localStorage.setItem('user-name', userData.name)
				localStorage.setItem('register-year', userData.registerDate)
				localStorage.setItem('login-date', new Date())
				localStorage.setItem('profile-image', userData.profileImage)
				toast.dismiss()
				toast(userData.message, { icon: '✋' })
				navigate('/')
			})
	}, [dispatch, navigate, query])

	return <Loading message={`네이버로 로그인하고 있어요`} />
}

export default OAuthNaver
