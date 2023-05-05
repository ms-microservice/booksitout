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

				localStorage.setItem('login-token', userData.token)
				localStorage.setItem('user-name', userData.name)
				// localStorage.setItem('register-year', new Date().getFullYear().toString())
				localStorage.setItem('login-date', new Date().toString())
				localStorage.setItem('profile-image', userData.profileImage)

				// localStorage.setItem('search-library-region-api', userData.settings.region)
				// localStorage.setItem('search-library-region-detail-api', userData.settings.regionDetail)
				// localStorage.setItem('search-my-book-range', userData.settings.myBookSearchRange)
				// localStorage.setItem('search-library-online-api', userData.settings.libraryOnlineSearchRange)
				// localStorage.setItem('search-subscription-api', userData.settings.subscriptionSearchRange)
				// localStorage.setItem('search-used-online-api', userData.settings.usedOnlineSearchRange)
				// localStorage.setItem('search-used-offline-api', userData.settings.usedOfflineSearchRange)

				toast.dismiss()
				toast(userData.message, { icon: '✋' })
				navigate('/')
			})
	}, [dispatch, navigate, query, provider])

	return <Loading message={messages.user.login.oauth.loading.get(provider!.toUpperCase())} />
}

export default OAuth
