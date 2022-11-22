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
import Reading from './book/Reading'
import ReadingNoId from './book/ReadingNoId'
// statistics
import Summary from './statistics/Summary'
import Statistics from './statistics/Statistics'
// informations
import Introduction from './info/Introduction'
// search
import Search from './search/Search'

function App() {
	const REDIRECT_EXCLUDE_URL = ['join', 'introduction', 'qna', 'faq']

	const location = useLocation()
	const navigate = useNavigate()

	const [token, setToken] = useState(localStorage.getItem('login-token'))
	const [currentUrl, setCurrentUrl] = useState(location.pathname.toString())

	useEffect(() => {
		setCurrentUrl(location.pathname.toString())

		if (token === '') {
			if (!REDIRECT_EXCLUDE_URL.some((url) => currentUrl.includes(url))) {
				navigate('/login')
			}
		}
	}, [location.pathname])

	return (
		<div className='App'>
			<Topnav token={token} setToken={setToken} />

			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/' element={<Summary token={token} />} />
				<Route path='/introduction' element={<Introduction />} />
				<Route path='/qna' element={<></>} />
				<Route path='/faq' element={<></>} />

				<Route path='/login' element={<Login setToken={setToken} />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings token={token} />} />

				<Route path='/book/:range' element={<BookList token={token} />} />
				<Route path='/book/detail/:id' element={<BookDetail token={token} />} />
				<Route path='book/add' element={<BookAddForm token={token} />} />
				<Route path='/book/edit/:id' element={<BookEditForm token={token} />} />
				<Route path='/statistics' element={<Statistics />} />
				<Route path='/reading' element={<ReadingNoId token={token} />} />
				<Route path='/reading/:id' element={<Reading token={token} />} />

				<Route path='/search/:key' element={<Search />} />
			</Routes>

			{token !== '' && !location.pathname.startsWith('/reading') && (
				<>
					{!currentUrl.startsWith('/book/add') && <AddButton />}
					<ReadingButton />
				</>
			)}
		</div>
	)
}

export default App
