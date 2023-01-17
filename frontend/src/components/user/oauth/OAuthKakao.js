import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../common/Loading'
import { API_BASE_URL } from '../../../settings/urls/apiUrl'
import { ERROR_MESSAGE } from '../../../messages/commonMessages'
import toast from 'react-hot-toast'

const OAuthKakao = ({ setToken }) => {
	const navigate = useNavigate()

	function useQuery() {
		const { search } = useLocation()
		return useMemo(() => new URLSearchParams(search), [search])
	}
	const query = useQuery()

	useEffect(() => {
		const code = query.get('code')

		axios
			.get(`${API_BASE_URL}/v2/login/oauth2/kakao?code=${code}`)
			.then((res) => {
				if (res.status !== 200) {
					throw new Error()
				}

				return res.data
			})
			.then((data) => {
				localStorage.setItem('login-token', data.token)
				localStorage.setItem('user-name', data.name)
				// localStorage.setItem('register-year', data.registerDate.substring(0, 4))
				localStorage.setItem('login-date', new Date())
				setToken(data.token)
				toast.dismiss()
				toast(data.message, { icon: '✋' })
				navigate('/')
			})
			.catch((e) => {
				toast.error(ERROR_MESSAGE + e)
				navigate('/login')
			})
	}, [])

	return (
		<div>
			<Loading message='카카오 계정으로 로그인하고 있어요' />
		</div>
	)
}

export default OAuthKakao
