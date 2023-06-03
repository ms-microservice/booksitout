import React from 'react'
import { Card, ListGroup, Form } from 'react-bootstrap'
import RegionSearchResultLoading from '../RegionSearchResultLoading'
import NoContent from '../../../../components/common/NoContent'
import { useDebounce } from '../../../../common/useDebounce'
import { PageType } from '../../../../types/PageType'
import { RegionSearchResultType } from '../../../LocationType'
import { booksitoutServer } from '../../../../functions/axios'
import Error from '../../../../components/common/Error';
import RegionSearchResult from '../RegionSearchResult'

const MembershipAddManualTypeRegion = ({ regionId, setRegionId }) => {
	const [loading, setLoading] = React.useState<boolean>(false)
	const [query, setQuery] = React.useState<string>('')
	const [debouncedQuery, cancelDebounce] = useDebounce(query, 500)
	const [regionSearchResultList, setRegionSearchResultList] = React.useState<PageType<RegionSearchResultType[]> | null>(null)
	React.useEffect(() => {
		if (debouncedQuery === '') {
			setRegionSearchResultList(null)
			cancelDebounce()
		} else {
			booksitoutServer
				.get(`v5/library/region?query=${debouncedQuery}&size=6`)
				.then((res) => setRegionSearchResultList(res.data))
				.finally(() => setLoading(false))
		}
	}, [debouncedQuery])

	React.useEffect(() => {
		setLoading(query !== '')
	}, [query])

	return (
		<>
			<Form.Label>지역 검색하기</Form.Label>
			<Form.Control placeholder='지역을 검색해서 선택해 주세요' onChange={(e) => setQuery(e.target.value)} />
			<Card style={{ minHeight: '200px' }} className='mt-3'>
				<Card.Body>
					<ListGroup>
						{loading ? (
							<div className='row'>
								{Array.from({ length: 6 }).map(() => {
									return (
										<div className='col-6 p-0'>
											<RegionSearchResultLoading />
										</div>
									)
								})}
							</div>
						) : regionSearchResultList == null ? (
							<NoContent move={-35} iconSize={3} textSize={5} message='검색어를 입력해 주세요' />
						) : regionSearchResultList === undefined ? (
							<Error move={0} />
						) : regionSearchResultList.content.length === 0 ? (
							<NoContent move={-35} iconSize={3} textSize={5} message='검색 결과가 없어요' />
						) : (
							<div className='row'>
								{regionSearchResultList.content.map((region) => {
									return (
										<div className='col-6 p-0' onClick={() => setRegionId(region.id)}>
											<RegionSearchResult region={region} selected={regionId} />
										</div>
									)
								})}
							</div>
						)}
					</ListGroup>
				</Card.Body>
			</Card>
		</>
	)
}

export default MembershipAddManualTypeRegion