import { Pagination } from 'react-bootstrap'

const Page = ({paged, currentPage, url}) => {

    if (paged.totalPages === 0) return <></>

    return (
		<div className='d-flex justify-content-center mb-5 mt-5'>
			<Pagination>
				{paged.totalPages > 10 && <Pagination.First href={`${url}?page=1`} />}

				{Array.from({ length: paged.totalPages }, (_, index) => index + 1).map((p) => {
					return (
						<Pagination.Item active={p === currentPage ?? 1} href={`${url}?page=${p}`}>
							{p}
						</Pagination.Item>
					)
				})}

				{paged.totalPages > 10 && <Pagination.Last href={`${url}?page=${paged.totalPages}`} />}
			</Pagination>
		</div>
	)
}

export default Page