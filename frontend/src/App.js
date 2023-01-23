import { useEffect } from 'react'
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
import date from './functions/date'
// Settings
import urls from './settings/urls'
import uiSettings from './settings/ui'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { updateOneSecond, updateReadingTimeDate } from './redux/timerSlice'
import { logoutToken } from './redux/userSlice'

function App() {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const token = useSelector((state) => state.user.token)
	const timerOn = useSelector((state) => state.timer.isTimerOn)

	useEffect(() => {
		const interval = setInterval(() => {
			if (timerOn) {
				dispatch(updateOneSecond())
			} else {
				dispatch(updateReadingTimeDate())
				updateReadingTimeDate()
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [dispatch, timerOn])

	useEffect(() => {
		if (token === '' || token == null) {
			!urls.exclude.some((url) => location.pathname.includes(url)) && navigate('/login')
		} else {
			if (location.pathname.startsWith('/login') || location.pathname.startsWith('/join')) {
				navigate('/')
			}
		}

		if (localStorage.getItem('login-date') && date.getDateDifferenceInDays(new Date(localStorage.getItem('login-date')), new Date()) >= 7) {
			dispatch(logoutToken())
			navigate('/login')
			toast.error('다시 로그인 해  주세요')
		}
	}, [location.pathname, navigate, token, dispatch])

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
			<Topnav />

			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/introduction' element={<Introduction />} />
				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings />} />

				<Route path='/login/oauth/kakao' element={<OAuthKakao />} />
				<Route path='/login/oauth/naver' element={<OAuthNaver />} />
				<Route path='/login/oauth/google' element={<OAuthGoogle />} />
				<Route path='/login/oauth/facebook' element={<OAuthFacebook />} />

				<Route path='/' element={<Main />} />
				<Route path='/book/:range' element={<BookList />} />
				<Route path='/book/:range/:rangeDetail' element={<BookList />} />
				<Route path='/book/detail/:id' element={<BookDetail />} />
				<Route path='book/add' element={<BookAddForm />} />
				<Route path='/book/edit/:id' element={<BookEditForm />} />

				<Route path='/reading' element={<ReadingNoId />} />
				<Route path='/reading/:id' element={<Reading />} />

				<Route path='/statistics' element={<Statistics />} />
				<Route path='/statistics/goal' element={<Goal />} />

				<Route path='/search/:key' element={<Search />} />
			</Routes>

			{token !== '' && (
				<>
					{!location.pathname.startsWith('/book/add') && <FloatingAddButton />}
					<ReadingButton />
				</>
			)}
		</div>
	)
}

export default App
