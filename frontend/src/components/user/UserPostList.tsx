import axios from "axios"
import urls from "../../settings/urls"
import { useLoaderData, useSearchParams } from 'react-router-dom'
import PostRoutePost from "../community/post/post-route/PostRoutePost"
import { PostType } from "../../types/PostType"
import { Pagination } from "react-bootstrap"
import { PageType } from "../../types/PageType"

export async function loader({ params, request }) {
	const nickName = params.nickName
    const page = request.url.contains('?') ? request.url.split('?')[1].split('=')[1] : 1

	return axios.get(`${urls.api.base}/v4/forum/post/by-name/paged?name=${nickName}&page=${page}`).then((res) => res.data)
}

const UserPostList = () => {
    const pagedPost = useLoaderData() as PageType<PostType[]>
    const [searchParams, _] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1) ?? 1
    
    return (
		<div className='container-xl'>
			{pagedPost.content.map((post) => {
				return <PostRoutePost post={post} />
			})}

			<div className='d-flex justify-content-center mb-5 mt-5'>
				<Pagination>
					<Pagination.First />

                    {
                        Array.from({ length:  pagedPost.totalPages}, (_, index) => index + 1)
                        .map((p) => {
                            return <Pagination.Item active={p === page ?? 1}>{p}</Pagination.Item>
                        })
                    }

					<Pagination.Last />
				</Pagination>
			</div>
		</div>
	)
}

export default UserPostList