import PostListGroup from "../community/post/PostListGroup"
import BookInfoCard from "./BookInfoCard"

const BookInfoRelatedPost = ({postList}) => {
	return <BookInfoCard title='관련 게시글' content={<div className="mt-0">{<PostListGroup postList={postList} />}</div>} />
}

export default BookInfoRelatedPost