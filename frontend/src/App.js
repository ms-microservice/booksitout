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

function App() {
	const location = useLocation()
	const navigate = useNavigate()

	const [token, setToken] = useState(localStorage.getItem('login-token'))

	const REDIRECT_EXCLUDE_URL = ['join', 'introduction', 'qna', 'faq']
	useEffect(() => {
		if (token === '') {
			!REDIRECT_EXCLUDE_URL.some((url) => location.pathname.includes(url)) && navigate('/login')
		}
	}, [location.pathname])

	const TIME_SECONDS = `reading-session-time`
	const TIMER_ON = `timer-on`
	const [readingSessionTime, setReadingSessionTime] = useState(localStorage.getItem(TIME_SECONDS))
	setTimeout(() => {
		if (localStorage.getItem(TIMER_ON) == 'true' && token != '') {
			const currentTime = localStorage.getItem(TIME_SECONDS)
			currentTime == null ? localStorage.setItem(TIME_SECONDS, 0) : localStorage.setItem(TIME_SECONDS, Number(currentTime) + 1)
			setReadingSessionTime(localStorage.getItem(TIME_SECONDS))
		}
	}, 1000)

	return (
		<div className='App'>
			<Topnav token={token} setToken={setToken} />

			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/' element={<Summary token={token} />} />
				<Route path='/introduction' element={<Introduction />} />
				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login setToken={setToken} />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings token={token} />} />

				<Route path='/book/:range' element={<BookList token={token} />} />
				<Route path='/book/detail/:id' element={<BookDetail token={token} />} />
				<Route path='book/add' element={<BookAddForm token={token} />} />
				<Route path='/book/edit/:id' element={<BookEditForm token={token} />} />
				<Route path='/statistics' element={<Statistics token={token} />} />
				<Route path='/reading' element={<ReadingNoId token={token} />} />
				<Route path='/reading/:id' element={<Reading token={token} readingSessionTime={readingSessionTime} />} />

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
