import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQuery } from '../../../functions/utils'
// Components
import Loading from '../../common/Loading'
import { ERROR_MESSAGE } from '../../../messages/commonMessages'
import urls from '../../../settings/urls'

const OAuthKakao = ({ setToken }) => {
	const navigate = useNavigate()
	const query = useQuery()

	useEffect(() => {
		const code = query.get('code')

		axios
			.get(urls.api.user.login.oauth.kakao.api(code))
			.then((res) => {
				if (res.status !== 200) throw new Error()

				setToken(res.data.token)

				localStorage.setItem('login-token', res.data.token)
				localStorage.setItem('user-name', res.data.name)
				// localStorage.setItem('register-year', res.data.registerDate.substring(0, 4))
				localStorage.setItem('login-date', new Date())

				toast.dismiss()
				toast(res.data.message, { icon: '✋' })

				navigate('/')
			})
			.catch((e) => {
				toast.error(ERROR_MESSAGE + e)
				navigate('/login')
			})
	}, [])

	return <Loading message='카카오 계정으로 로그인하고 있어요' />
}

export default OAuthKakao
