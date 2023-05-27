import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Root from './components/common/Root'
import MainRoute from './components/main/MainRoute'
import NotFound from './components/common/NotFound'
import ErrorPage from './components/common/ErrorPage'

import AdminRoute from './admin/AdminRoute'

import IntroductionRoute from './components/info/IntroductionRoute'
import FaqRoute from './components/info/FaqRoute'
import QnaRoute, {loader as QnaLoader} from './components/info/QnaRoute'
import FeatureRoute from './components/info/FeatureRoute'
import TipsRoute from './community/tips/TipsRoute'
import TipsDetail from './community/tips/TipsDetail'

import LoginRoute from './components/user/LoginRoute'
import OAuth from './components/user/OAuth'
import JoinRoute from './components/user/JoinRoute'

import SettingsRoute from './components/settings/SettingsRoute'
import SearchLibrarySettings from './components/settings/SearchLibrarySettings'
import SearchSettings from './components/settings/SearchSettings'
import CommunitySettings from './components/settings/CommunitySettings'
import NotificationSettings from './components/settings/NotificationSettings'
import PersonalInfoSettings from './components/settings/PersonalInfoSettings'

import BookList from './components/book/book-list/BookList'
import BookDetail from './components/book/book-detail/BookDetail'
import AddBookRoute from './components/book/book-form/AddBookRoute'
import EditBookForm from './components/book/book-form/EditBookForm'

import ReadingRoute from './components/reading/ReadingRoute'
import ReadingNoId from './components/reading/ReadingNoId'

import StatisticsRoute from './components/statistics/StatisticsRoute'
import GoalRoute from './goal/GoalRoute'

import SearchRoute from './components/search/SearchRoute'

import CommunityRoute, {loader as communityRouteLoader} from './components/community/community-main/CommunityRoute'
import AddCommunityRoute from './community/AddCommunityRoute'

import PostRoute, { loader as postRouteLoader } from './components/community/post/post-route/PostRoute'
import PostDetail from './components/community/post/PostDetail'
import EditPostForm from './components/community/post/EditPostForm'

import GatheringRoute, {loader as gatheringRouteLoader} from './community/gathering/GatheringRoute'
import GatheringDetail, {loader as gatheringDetailLoader} from './community/gathering/GatheringDetail'
import GatheringJoinForm, { loader as gatheringJoinLoader } from './community/gathering/GatheringJoinForm'

import UserRoute, { loader as userRouteLoader } from './components/user/UserRoute'
import UserPostList, {loader as userPostListLoader} from './components/user/UserPostList'
import UserBookList, { loader as userBookListLoader } from './components/user/UserBookList'

import BookInfoRoute, { loader as bookInfoRouteLoader } from './components/bookInfo/BookInfoRoute'

import LibraryRoute from './library/LibraryRotue'
import LibraryDetail, {loader as libraryDetailLoader} from './library/LibraryDetail'
import LibraryNearRoute from './library/LibraryNearRoute'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route path='*' element={<NotFound />} />

			<Route path='/admin' element={<AdminRoute />} />

			<Route path='/introduction' element={<IntroductionRoute />} />
			<Route path='introduction/features' element={<FeatureRoute />} />
			<Route path='introduction/tips/:range' element={<TipsRoute />} />
			<Route path='introduction/tips/detail/:id' element={<TipsDetail />} />

			<Route path='/qna' element={<QnaRoute />} loader={QnaLoader} />
			<Route path='/faq' element={<FaqRoute />} />

			<Route path='/login' element={<LoginRoute />} />
			<Route path='/login/oauth/:provider' element={<OAuth />} />
			<Route path='/join' element={<JoinRoute />} />

			<Route path='/settings' element={<SettingsRoute />} />
			<Route path='/settings/search' element={<SearchSettings />} />
			<Route path='/settings/search/library' element={<SearchLibrarySettings />} />
			<Route path='/settings/personal-info' element={<PersonalInfoSettings />} />
			<Route path='/settings/community' element={<CommunitySettings />} />
			<Route path='/settings/notification' element={<NotificationSettings />} />

			<Route path='/' element={<MainRoute />} />
			<Route path='/book/:range' element={<BookList />} />
			<Route path='/book/:range/:rangeDetail' element={<BookList />} />
			<Route path='/book/detail/:id' element={<BookDetail />} />
			<Route path='/book/add/:method' element={<AddBookRoute />} />
			<Route path='/book/edit/:id' element={<EditBookForm />} />

			<Route path='/reading' element={<ReadingNoId />} />
			<Route path='/reading/:id' element={<ReadingRoute />} />
			<Route path='/statistics' element={<StatisticsRoute />} />
			<Route path='/goal' element={<GoalRoute />} />

			<Route path='/search/:query' element={<SearchRoute />} />

			<Route path='/community' element={<CommunityRoute />} errorElement={<ErrorPage />} loader={communityRouteLoader} />
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

			<Route path='/community/gathering/:type' element={<GatheringRoute />} errorElement={<ErrorPage />} loader={gatheringRouteLoader} />
			<Route path='/community/gathering/detail/:id' element={<GatheringDetail />} errorElement={<ErrorPage />} loader={gatheringDetailLoader} />
			<Route path='/community/gathering/edit/:id' element={<></>} />
			<Route path='/community/gathering/join/:id' element={<GatheringJoinForm />} errorElement={<ErrorPage />} loader={gatheringJoinLoader} />

			<Route path='/book/info/:isbn' element={<BookInfoRoute />} errorElement={<ErrorPage />} loader={bookInfoRouteLoader} />
			<Route path='/book/info/:isbn/related-posts' element={<></>} />
			<Route path='/book/info/:isbn/covers' element={<></>} />

			<Route path='/user/:nickName' element={<UserRoute />} errorElement={<ErrorPage />} loader={userRouteLoader} />
			<Route path='/user/:nickName/books' element={<UserBookList />} errorElement={<ErrorPage />} loader={userBookListLoader} />
			<Route path='/user/:nickName/posts' element={<UserPostList />} errorElement={<ErrorPage />} loader={userPostListLoader} />

			<Route path='/user/:nickName/quizes' element={<></>} />
			<Route path='/user/:nickName/surveys' element={<></>} />
			<Route path='/user/:nickName/gatherings' element={<></>} />

			<Route path='/library' element={<LibraryRoute />} />
			<Route path='/library/detail/:id' element={<LibraryDetail />} errorElement={<ErrorPage />} loader={libraryDetailLoader} />
			<Route path='/library/near' element={<LibraryNearRoute />} />
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
