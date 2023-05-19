import UserRouteCard from "./UserRouteCard"
import AllButton from "../common/AllButton"
import NoContent from '../common/NoContent'
import PostListGroup from "../community/post/PostListGroup"

const UserCommunityCard = ({ postList, nickName }) => {
	return (
		<UserRouteCard
			title='커뮤니티 활동'
			content={
				<div className='row ps-2 pe-2 pb-3'>
					{postList.length === 0 ? <NoContent mt='125px' message='커뮤니티 활동이 없어요' /> : <PostListGroup postList={postList} />}

					{postList.length > 6 && <AllButton url={`/user/${nickName}/posts`} />}
				</div>
			}
		/>
	)
}

export default UserCommunityCard