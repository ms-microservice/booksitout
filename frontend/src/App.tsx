import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Root from './components/common/Root'
import Main from './components/main/Main'
import NotFound from './components/common/NotFound'
import ErrorPage from './components/common/ErrorPage'

import AdminMain from './components/admin/AdminMain'

import Introduction from './components/info/Introduction'
import Faq from './components/info/Faq'
import Qna from './components/info/Qna'
import Feature from './components/info/Feature'
import TipsRoute from './components/community/tips/TipsRoute'
import TipsDetail from './components/community/tips/TipsDetail'

import Login from './components/user/Login'
import OAuth from './components/user/OAuth'
import Join from './components/user/Join'

import SettingsRoute from './components/settings/SettingsRoute'
import SearchLibrarySettings from './components/settings/SearchLibrarySettings'
import SearchSettings from './components/settings/SearchSettings'
import CommunitySettings from './components/settings/CommunitySettings'
import NotificationSettings from './components/settings/NotificationSettings'
import PersonalInfoSettings from './components/settings/PersonalInfoSettings'

import BookList from './components/book/book-list/BookList'
import BookDetail from './components/book/book-detail/BookDetail'
import AddBookForm from './components/book/book-form/AddBookForm'
import EditBookForm from './components/book/book-form/EditBookForm'

import Reading from './components/reading/Reading'
import ReadingNoId from './components/reading/ReadingNoId'

import Statistics from './components/statistics/Statistics'
import GoalRoute from './components/goal/GoalRoute'

import Search from './components/search/Search'

import CommunityRoute from './components/community/community-main/CommunityRoute'
import AddCommunityRoute from './components/community/AddCommunityRoute'

import PostRoute, { loader as postRouteLoader } from './components/community/post/post-route/PostRoute'
import PostDetail from './components/community/post/PostDetail'
import EditPostForm from './components/community/post/EditPostForm'

import GatheringRoute from './components/community/gathering/GatheringRoute'

import UserRoute, { loader as userRouteLoader } from './components/user/UserRoute'
import UserPostList, {loader as userPostListLoader} from './components/user/UserPostList'
import UserBookList, { loader as userBookListLoader } from './components/user/UserBookList'

import BookInfoRoute, { loader as bookInfoRouteLoader } from './components/bookInfo/BookInfoRoute'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route path='*' element={<NotFound />} />

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

			<Route path='/community' element={<CommunityRoute />} />
			<Route path='/community/:type/add' element={<AddCommunityRoute />} />

			<Route path='/community/post/all/:sortBy' element={<PostRoute />} errorElement={<ErrorPage />} loader={postRouteLoader} />
			<Route path='/community/post/:postId' element={<PostDetail />} />
			<Route path='/community/post/edit/:postId' element={<EditPostForm />} />

			<Route path='/community/quiz' element={<></>} />
			<Route path='/community/quiz/:quizId' element={<></>} />
			<Route path='/community/quiz/edit/:quizId' element={<></>} />

			<Route path='/community/survey' element={<></>} />
			<Route path='/community/survey/:surveyId' element={<></>} />
			<Route path='/community/survey/edit/:surveyId' element={<></>} />

			<Route path='/community/gathering' element={<GatheringRoute />} />
			<Route path='/community/gathering/edit/:gatheringId' element={<></>} />
			<Route path='/community/gathering/:gatheringId' element={<></>} />

			<Route path='/book/info/:isbn' element={<BookInfoRoute />} errorElement={<ErrorPage />} loader={bookInfoRouteLoader} />
			<Route path='/book/info/:isbn/related-posts' element={<></>} />
			<Route path='/book/info/:isbn/covers' element={<></>} />

			<Route path='/user/:nickName' element={<UserRoute />} errorElement={<ErrorPage />} loader={userRouteLoader} />
			<Route path='/user/:nickName/books' element={<UserBookList />} errorElement={<ErrorPage />} loader={userBookListLoader} />
			<Route path='/user/:nickName/posts' element={<UserPostList />} errorElement={<ErrorPage />} loader={userPostListLoader} />

			<Route path='/user/:nickName/quizes' element={<></>} />
			<Route path='/user/:nickName/surveys' element={<></>} />
			<Route path='/user/:nickName/gatherings' element={<></>} />
		</Route>
	)
)

function App() {
	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
