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
// Messages
import { loginToken } from '../../../redux/loginTokenSlice'
// Redux
import messages from '../../../settings/messages'

const OAuthKakao = () => {
	const navigate = useNavigate()
	const query = useQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		const code = query.get('code')

		axios
			.get(urls.api.user.login.oauth.kakao.api(code))
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

	return <Loading message='카카오 계정으로 로그인하고 있어요' />
}

export default OAuthKakao
