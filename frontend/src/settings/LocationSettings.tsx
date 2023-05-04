import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import date from '../functions/date'
import urls from '../settings/urls'

import { useDispatch, useSelector } from 'react-redux'
import { logoutToken } from '../redux/userSlice'

const LocationSettings = () => {
	const token = useSelector((state: any) => state.user.token)
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (
			localStorage.getItem('login-date') &&
			date.getDateDifferenceInDays(new Date(localStorage.getItem('login-date') ?? Date.now()), new Date()) >= 7
		) {
			dispatch(logoutToken())
			navigate('/login')
			toast.error('다시 로그인 해  주세요')
		}
	}, [location.pathname, navigate, token, dispatch])

	return <></>
}

export default LocationSettings
