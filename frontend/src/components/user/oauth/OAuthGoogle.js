import axios from 'axios'
import toast from 'react-hot-toast'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../../functions/useQuery'
import { useDispatch } from 'react-redux'

import Loading from '../../common/Loading'
import urls from '../../../settings/urls'
import messages from '../../../settings/messages'
import { loginToken } from '../../../redux/userSlice'

const OAuthGoogle = () => {
	const navigate = useNavigate()
	const query = useQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		const code = query.get('code')
		const scope = query.get('scope')

		axios
			.get(urls.api.user.login.oauth.google.api(code, scope))
			.then((res) => {
				if (res.status !== 200) throw new Error()
				return res.data
			})
			.catch((e) => {
				toast.error(messages.error + ' ' + e)
				navigate('/login')
			})
			.then((userData) => {
				dispatch(loginToken(userData.token))

				localStorage.setItem('user-name', userData.name)
				localStorage.setItem('register-year', new Date().getFullYear().toString())
				localStorage.setItem('login-date', new Date())
				localStorage.setItem('profile-image', userData.profileImage)

				toast.dismiss()
				toast.success(userData.message, { icon: '✋' })
				navigate('/')
			})
	}, [dispatch, navigate, query])

	return <Loading message='구글로 로그인하고 있어요' />
}

export default OAuthGoogle
