import axios from "axios"
import urls from "../settings/urls"
import { useLoaderData, useParams, useSearchParams } from "react-router-dom"
import { PageType } from "../types/PageType"
import SharingBookCard from "./SharingBookCard"
import { SharingBook } from "../types/BookType"
import Page from "../common/Page"
import RouteTitle from "../common/RouteTitle"
import booksitoutIcon from '../common/icons/booksitoutIcon';

export async function loader({params, request}) {
    const nickName = params.nickName
    const page = request.url.includes('?') ? request.url.split('?')[1].split('=')[1] : 1

	return axios.get(`${urls.api.base}/v4/book/sharing/paged?name=${nickName}&page=${page}&size=20`).then((res) => res.data)
}

const UserBookList = () => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1) ?? 1

    const pagedPost = useLoaderData() as PageType<SharingBook[]>
	const { nickName } = useParams()
    
    return (
		<div className="container-xl">
			<RouteTitle icon={<booksitoutIcon.book />} title={'유저가 공개한 책'} />

			<div className="row">
				{pagedPost.content.map(book => {
					return (
						<div className="col-12 col-md-6 mb-4">
							<SharingBookCard book={book} />
						</div>
					)
				})}
			</div>

			<Page paged={pagedPost} currentPage={page} url={`/user/${nickName}/books`} />
		</div>
	)
}

export default UserBookList