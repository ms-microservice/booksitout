import { booksitoutServer } from '../../functions/axios'
import GatheringRouteButton from './GatheringRouteButton'
import { useLoaderData, useParams, useSearchParams } from 'react-router-dom'
import GatheringSimpleCard from '../../components/community/summaryCard/GatheringSimpleCard'

import { GatheringType } from './GatheringType'
import { PageType } from '../../types/PageType'
import NoContent from '../../components/common/NoContent'
import Page from '../../components/common/Page'

export async function loader({ params, request }) {
	const type = params.type.replace('-', '_').toUpperCase()
	const page = request.url.includes('?') ? request.url.split('?')[1].split('=')[1] : 1

	return booksitoutServer
		.get(`/v4/forum/gathering/all?type=${type}&page=${page}`)
		.then((res) => res.data)
		.catch((e) => {
			throw e
		})
}

const GatheringRoute = () => {
	document.title = '독서모임 | 책잇아웃'

	const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? 1) ?? 1
	
	const { type } = useParams()
	const pagedGathering = useLoaderData() as PageType<GatheringType[]>

	return (
		<div className='container-xl'>
			<div className='mb-3'>
				<GatheringRouteButton type={type} />
			</div>

			<div>
				{pagedGathering.content.length === 0 ? (
					<NoContent message='독서모임 모집글이 없어요' mt='100px' />
				) : (
					pagedGathering.content.map((gathering) => {
						return (
							<div className='mb-3'>
								<GatheringSimpleCard gathering={gathering} />
							</div>
						)
					})
				)}
			</div>

			<Page paged={pagedGathering} currentPage={currentPage} url={`/community/gathering/${type}`} />
		</div>
	)
}

export default GatheringRoute
