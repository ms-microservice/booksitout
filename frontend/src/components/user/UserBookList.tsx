import axios from "axios"
import urls from "../../settings/urls"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { PageType } from "../../types/PageType"
import { Pagination } from 'react-bootstrap'
import SharingBookCard from "./SharingBookCard"
import { SharingBook } from "../../types/BookType"

export async function loader({params, request}) {
    const nickName = params.nickName
    const page = request.url.includes('?') ? request.url.split('?')[1].split('=')[1] : 1

	return axios.get(`${urls.api.base}/v4/book/sharing/paged?name=${nickName}&page=${page}`).then((res) => res.data)
}

const UserBookList = () => {
    const pagedPost = useLoaderData() as PageType<SharingBook[]>
    const [searchParams, _] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1) ?? 1
    
    return (
		<div className='container-xl'>
			<div className='row'>
				{pagedPost.content.map((book) => {
					return (
						<div className='col-12 col-md-6 mb-4'>
							<SharingBookCard book={book} />
						</div>
					)
				})}
			</div>

			<div className='d-flex justify-content-center mb-5 mt-5'>
				<Pagination>
					<Pagination.First />

					{Array.from({ length: pagedPost.totalPages }, (_, index) => index + 1).map((p) => {
						return <Pagination.Item active={p === page ?? 1}>{p}</Pagination.Item>
					})}

					<Pagination.Last />
				</Pagination>
			</div>
		</div>
	)
}

export default UserBookList