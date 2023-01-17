import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Toaster, useToasterStore, toast } from 'react-hot-toast'
// Components
import Topnav from './components/common/Topnav'
import ReadingButton from './components/common/ReadingButton'
import FloatingAddButton from './components/common/FloatingAddButton'
import Login from './components/user/Login'
import Join from './components/user/Join'
import Settings from './components/user/Settings'
import Main from './components/statistics/Main'
import BookList from './components/book/BookList'
import BookDetail from './components/book/book-detail/BookDetail'
import BookAddForm from './components/book/BookAddForm'
import BookEditForm from './components/book/BookEditForm'
import Reading from './components/reading/Reading'
import ReadingNoId from './components/reading/ReadingNoId'
import Statistics from './components/statistics/Statistics'
import Introduction from './components/info/Introduction'
import Faq from './components/info/Faq'
import Qna from './components/info/Qna'
import Search from './components/search/Search'
import Goal from './components/statistics/goal/Goal'
import OAuthKakao from './components/user/oauth/OAuthKakao'
import OAuthNaver from './components/user/oauth/OAuthNaver'
import OAuthGoogle from './components/user/oauth/OAuthGoogle'
import OAuthFacebook from './components/user/oauth/OAuthFacebook'
// Functions
import { getToken } from './functions/user'
import { getTimerSecond, getIsTimerOn, updateTimerSecond, updateReadingTimeDate } from './functions/timer'
// Settings
import urls from './settings/urls'
import uiSettings from './settings/ui'
import { getDateDifferenceInDays } from './functions/date'

function App() {
	const location = useLocation()
	const navigate = useNavigate()
	const [token, setToken] = useState(getToken())

	const [readingSessionTime, setReadingSessionTime] = useState(Math.round(getTimerSecond()))
	useEffect(() => {
		const interval = setInterval(() => {
			if (getIsTimerOn()) {
				const currentTime = getTimerSecond()
				updateTimerSecond(currentTime == null ? 1 : Number(currentTime) + 1)
				setReadingSessionTime(Math.round(Number(currentTime == null ? 1 : currentTime)))
			} else {
				updateReadingTimeDate()
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (token === '' || token == null) {
			!urls.exclude.some((url) => location.pathname.includes(url)) && navigate('/login')
		} else {
			if (location.pathname.startsWith('/login') || location.pathname.startsWith('/join')) {
				navigate('/')
			}
		}

		if (localStorage.getItem('login-date') && getDateDifferenceInDays(new Date(localStorage.getItem('login-date')), new Date()) >= 7) {
			localStorage.clear()
			navigate('/login')
			toast.error('다시 로그인 해  주세요')
		}
	}, [location.pathname, navigate, token])

	const { toasts } = useToasterStore()
	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= uiSettings.toastLimit)
			.forEach((t) => toast.dismiss(t.id))
	}, [toasts])

	return (
		<div className='App'>
			<Toaster />
			<Topnav token={token} setToken={setToken} />

			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/introduction' element={<Introduction />} />
				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login setToken={setToken} />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings />} />

				<Route path='/login/oauth/kakao' element={<OAuthKakao setToken={setToken} />} />
				<Route path='/login/oauth/naver' element={<OAuthNaver setToken={setToken} />} />
				<Route path='/login/oauth/google' element={<OAuthGoogle setToken={setToken} />} />
				<Route path='/login/oauth/facebook' element={<OAuthFacebook setToken={setToken} />} />

				<Route path='/' element={<Main token={token} />} />
				<Route path='/book/:range' element={<BookList />} />
				<Route path='/book/:range/:rangeDetail' element={<BookList />} />
				<Route path='/book/detail/:id' element={<BookDetail />} />
				<Route path='book/add' element={<BookAddForm token={token} />} />
				<Route path='/book/edit/:id' element={<BookEditForm token={token} />} />

				<Route path='/reading' element={<ReadingNoId />} />
				<Route path='/reading/:id' element={<Reading readingTime={readingSessionTime} setReadingTime={setReadingSessionTime} />} />

				<Route path='/statistics' element={<Statistics />} />
				<Route path='/statistics/goal' element={<Goal />} />

				<Route path='/search/:key' element={<Search />} />
			</Routes>

			{token !== '' && (
				<>
					{!location.pathname.startsWith('/book/add') && <FloatingAddButton />}
					<ReadingButton time={readingSessionTime} />
				</>
			)}
		</div>
	)
}

export default App
