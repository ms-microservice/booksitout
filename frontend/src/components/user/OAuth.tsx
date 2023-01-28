import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useQuery } from '../../functions/useQuery'
import axios from 'axios'
import toast from 'react-hot-toast'
import urls from '../../settings/urls'
import { loginToken } from '../../redux/userSlice'
import messages from '../../settings/messages'
import Loading from '../common/Loading'

const OAuth = () => {
	const { provider } = useParams()

	const navigate = useNavigate()
	const query = useQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		const code = query.get('code')
		const additional = query.get(provider?.toUpperCase() === 'NAVER' ? 'state' : provider?.toUpperCase() === 'GOOGLE' ? 'scope' : 'none')

		axios
			.get(urls.api.user.login.oauth.get(provider!.toUpperCase())!.api(code, additional))
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
				localStorage.setItem('login-date', new Date().toString())
				localStorage.setItem('profile-image', userData.profileImage)

				toast.dismiss()
				toast(userData.message, { icon: '✋' })
				navigate('/')
			})
	}, [dispatch, navigate, query, provider])

	return <Loading message={messages.user.login.oauth.loading.get(provider!.toUpperCase())} />
}

export default OAuth
