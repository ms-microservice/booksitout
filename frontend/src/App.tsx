import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// Settings
import ToastSettings from './settings/ToastSettings'
import LocationSettings from './settings/LocationSettings'
import TimerSettings from './settings/TimerSettings'
import SearchLibrarySettings from './components/user/SearchLibrarySettings'
// Components
import Topnav from './components/common/Topnav'
import ReadingButton from './components/common/ReadingButton'
import FloatingAddButton from './components/common/FloatingAddButton'
import Login from './components/user/Login'
import Join from './components/user/Join'
import Settings from './components/user/Settings'
import Main from './components/main/Main'
import BookList from './components/book/book-list/BookList'
import BookDetail from './components/book/book-detail/BookDetail'
import AddBookForm from './components/book/book-form/AddBookForm'
import EditBookForm from './components/book/book-form/EditBookForm'
import Reading from './components/reading/Reading'
import ReadingNoId from './components/reading/ReadingNoId'
import Statistics from './components/statistics/Statistics'
import Introduction from './components/info/Introduction'
import Faq from './components/info/Faq'
import Qna from './components/info/Qna'
import Search from './components/search/Search'
import GoalRoute from './components/goal/GoalRoute'
import OAuth from './components/user/OAuth'
import Feature from './components/info/Feature'
import PostDetail from './components/forum/post/PostDetail'
import ForumMain from './components/forum/ForumMain'
import PostAddForm from './components/forum/post/PostAddForm'

function App() {
	return (
		<div className='App'>
			<Toaster />
			<ToastSettings />
			<LocationSettings />
			<TimerSettings />

			<Topnav />
			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/introduction' element={<Introduction />} />
				<Route path='introduction/features' element={<Feature />} />
				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login />} />
				<Route path='/login/oauth/:provider' element={<OAuth />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/settings/search/library' element={<SearchLibrarySettings />} />

				<Route path='/' element={<Main />} />
				<Route path='/book/:range' element={<BookList />} />
				<Route path='/book/:range/:rangeDetail' element={<BookList />} />
				<Route path='/book/detail/:id' element={<BookDetail />} />
				<Route path='/book/add' element={<AddBookForm />} />
				<Route path='/book/edit/:id' element={<EditBookForm />} />

				<Route path='/reading' element={<ReadingNoId />} />
				<Route path='/reading/:id' element={<Reading />} />
				<Route path='/statistics' element={<Statistics />} />
				<Route path='/goal' element={<GoalRoute />} />

				<Route path='/search/:query' element={<Search />} />

				<Route path='/forum' element={<ForumMain/>}/>
				<Route path='/forum/post/add' element={<PostAddForm/>}/>
				<Route path='/forum/post/:postId' element={<PostDetail />} />
			</Routes>

			<FloatingAddButton />
			<ReadingButton />
		</div>
	)
}

export default App
