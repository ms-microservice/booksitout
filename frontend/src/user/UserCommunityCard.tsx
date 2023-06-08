import UserRouteCard from "./UserRouteCard"
import AllButton from "../components/common/AllButton"
import NoContent from '../components/common/NoContent'
import PostListGroup from "../components/community/post/PostListGroup"
import { HiDocumentText as PostIcon } from 'react-icons/hi'

const UserCommunityCard = ({ postList, nickName }) => {
	return (
		<UserRouteCard
			title={
				<h3>
					<PostIcon className='me-2 text-book' />
					커뮤니티 활동
				</h3>
			}
			content={
				<div className='row ps-2 pe-2 pb-3'>
					{postList.length === 0 ? <NoContent message='커뮤니티 활동이 없어요' /> : <PostListGroup postList={postList} />}

					{postList.length > 6 && <AllButton url={`/user/${nickName}/posts`} />}
				</div>
			}
		/>
	)
}

export default UserCommunityCard