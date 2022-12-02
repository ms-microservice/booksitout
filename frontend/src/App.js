import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
// common
import Topnav from './common/Topnav'
import AddButton from './common/AddButton'
import ReadingButton from './common/ReadingButton'
// user
import Login from './user/Login'
import Join from './user/Join'
import Settings from './user/Settings'
// book
import BookList from './book/BookList'
import BookDetail from './book/BookDetail'
import BookAddForm from './book/BookAddForm'
import BookEditForm from './book/BookEditForm'
// Reading
import Reading from './book/reading/Reading'
import ReadingNoId from './book/reading/ReadingNoId'
// statistics
import Summary from './statistics/Summary'
import Statistics from './statistics/Statistics'
// informations
import Introduction from './info/Introduction'
import Faq from './info/Faq'
import Qna from './info/Qna'
// search
import Search from './search/Search'
import Goal from './statistics/Goal'

function App() {
	const location = useLocation()
	const navigate = useNavigate()

	const [token, setToken] = useState(localStorage.getItem('login-token'))

	const READING_TIME_KEY = `reading-session-time`
	const TIMER_ON_KEY = `timer-on`
	const [readingSessionTime, setReadingSessionTime] = useState(localStorage.getItem(READING_TIME_KEY))
	useEffect(() => {
		const interval = setInterval(() => {
			if (localStorage.getItem(TIMER_ON_KEY) === 'true') {
				const currentTime = localStorage.getItem(READING_TIME_KEY)
				localStorage.setItem(READING_TIME_KEY, currentTime == null ? 0 : Number(currentTime) + 1)
				setReadingSessionTime(Number(currentTime))
			}
		}, 1000)
		return () => clearInterval(interval)
	})

	const REDIRECT_EXCLUDE_URL = ['join', 'introduction', 'qna', 'faq']
	useEffect(() => {
		if (token === '') {
			!REDIRECT_EXCLUDE_URL.some((url) => location.pathname.includes(url)) && navigate('/login')
		}
	}, [location.pathname])

	return (
		<div className='App'>
			<Topnav token={token} setToken={setToken} />

			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/introduction' element={<Introduction />} />
				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login setToken={setToken} />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings token={token} />} />

				<Route path='/' element={<Summary token={token} />} />
				<Route path='/book/:range' element={<BookList token={token} />} />
				<Route path='/book/detail/:id' element={<BookDetail token={token} />} />
				<Route path='book/add' element={<BookAddForm token={token} />} />
				<Route path='/book/edit/:id' element={<BookEditForm token={token} />} />
				<Route path='/reading' element={<ReadingNoId token={token} />} />
				<Route path='/reading/:id' element={<Reading token={token} readingSessionTime={readingSessionTime} />} />

				<Route path='/statistics' element={<Statistics token={token} />} />
				<Route path='/statistics/goal' element={<Goal token={token} />} />

				<Route path='/search/:key' element={<Search />} />
			</Routes>

			{token !== '' && (
				<>
					{!location.pathname.startsWith('/book/add') && <AddButton />}
					<ReadingButton time={readingSessionTime} />
				</>
			)}
		</div>
	)
}

export default App
