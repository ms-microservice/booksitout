import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// Settings
import ToastSettings from './settings/ToastSettings'
import LocationSettings from './settings/LocationSettings'
import TimerSettings from './settings/TimerSettings'
import SearchLibrarySettings from './components/settings/SearchLibrarySettings'
// Components
import Topnav from './components/common/Topnav'
import ReadingButton from './components/common/ReadingButton'
import FloatingAddButton from './components/common/FloatingAddButton'
import Login from './components/user/Login'
import Join from './components/user/Join'
import SettingsRoute from './components/settings/SettingsRoute'
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
import PostDetail from './components/community/post/PostDetail'
import ForumMain from './components/community/community-main/ForumRoute'
import AddPostForm from './components/community/post/AddPostForm'
import TipsRoute from './components/community/tips/TipRoute'
import AdminMain from './components/admin/AdminMain'
import TipsDetail from './components/community/tips/TipsDetail'
import GatheringRoute from './components/community/gathering/GatheringRoute'
import PostRoute from './components/community/post/post-route/PostRoute'
import AddCommunityRoute from './components/community/AddCommunityRoute'
import EditPostForm from './components/community/post/EditPostForm'
import PersonalInfoSettings from './components/settings/PersonalInfoSettings'
import SearchSettings from './components/settings/SearchSettings'
import CommunitySettings from './components/settings/CommunitySettings'
import NotificationSettings from './components/settings/NotificationSettings'

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
				<Route path='/admin' element={<AdminMain />} />

				<Route path='/introduction' element={<Introduction />} />
				<Route path='introduction/features' element={<Feature />} />
				<Route path='introduction/tips/:range' element={<TipsRoute />} />
				<Route path='introduction/tips/detail/:id' element={<TipsDetail />} />

				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login />} />
				<Route path='/login/oauth/:provider' element={<OAuth />} />
				<Route path='/join' element={<Join />} />

				<Route path='/settings' element={<SettingsRoute />} />
				<Route path='/settings/search' element={<SearchSettings />} />
				<Route path='/settings/search/library' element={<SearchLibrarySettings />} />
				<Route path='/settings/personal-info' element={<PersonalInfoSettings />} />
				<Route path='/settings/community' element={<CommunitySettings />} />
				<Route path='/settings/notification' element={<NotificationSettings />} />

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

				<Route path='/community' element={<ForumMain />} />
				<Route path='/community/:type/add' element={<AddCommunityRoute />} />

				<Route path='/community/post/all/:sortBy' element={<PostRoute />} />
				<Route path='/community/post/:postId' element={<PostDetail />} />
				<Route path='/community/post/edit/:postId' element={<EditPostForm />} />

				<Route path='/community/quiz' element={<AddPostForm />} />

				<Route path='/community/survey' element={<AddPostForm />} />

				<Route path='/community/gathering' element={<GatheringRoute />} />
				<Route path='/community/gathering/add' element={<GatheringRoute />} />
				<Route path='/community/gathering/edit/:gatheringId' element={<GatheringRoute />} />
				<Route path='/community/gathering/:gatheringId' element={<GatheringRoute />} />
			</Routes>

			<FloatingAddButton />
			<ReadingButton />
		</div>
	)
}

export default App
