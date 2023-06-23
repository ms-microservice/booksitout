import React from 'react'
import { Card, Form, ListGroup, Placeholder } from 'react-bootstrap'
import CardTitle from '../common/CardTitle'
import booksitoutIcon from '../common/icons/booksitoutIcon';
import { booksitoutServer } from '../functions/axios';
import { RegionType } from './LocationType';
import { useDebounce } from '../common/useDebounce';
import NoContent from '../common/NoContent';
import regionImagePlaceholder from '../images/placeholder/square-loading.png'

const LibraryRouteRegionCard = () => {
    const [query, setQuery] = React.useState<string>('')
	const [debouncedQuery, cancelDebounce] = useDebounce(query, 500)
	const [loading, setLoading] = React.useState<boolean>(false)

	const [regionList, setRegionList] = React.useState<RegionType[]>([])
	React.useEffect(() => {
		if (debouncedQuery === '') {
			setRegionList([])
			cancelDebounce()
		} else {
			booksitoutServer
				.get(`v5/library/region/full?query=${debouncedQuery}&size=5`)
				.then((res) => setRegionList(res.data.content))
				.finally(() => setLoading(false))
		}
	}, [debouncedQuery])

	React.useEffect(() => {
		setLoading(true)
	}, [query])
    
    return (
		<Card style={{ minHeight: '500px' }} className='h-100'>
			<Card.Body>
				<CardTitle icon={<booksitoutIcon.map />} title={'지역별 도서관'} />

				<Form className='mt-3'>
					<div className='row justify-content-center'>
						<div>
							<Form.Control
								type='text'
								placeholder='지역 이름'
								onChange={(e) => setQuery(String(e.target.value))}
								autoComplete='off'
								autoCorrect='off'
								autoCapitalize='off'
							/>
						</div>
					</div>
				</Form>

				<div className='mt-3' />

				<ListGroup>
					{loading && query !== '' ? (
						<div className='row'>
							{Array.from({ length: 6 }).map(() => {
								return (
									<div className='col-6 col-md-4 mb-2'>
										<ListGroup.Item className='text-center rounded'>
											<Placeholder as={Card.Text} animation='glow' className='mb-0'>
												<div className='d-flex justify-content-center align-items-center'>
													<img src={regionImagePlaceholder} alt='' style={{ height: '50px' }} className='rounded me-2' />
													<Placeholder xs={3} />
												</div>
											</Placeholder>
										</ListGroup.Item>
									</div>
								)
							})}
						</div>
					) : regionList.length === 0 ? (
						<NoContent message={query === '' ? '검색어를 입력해 주세요' : '해당 지역이 없어요'} move={0} mt={100} />
					) : (
						<div className='row'>
							{regionList.map((region) => {
								return (
									<div className='col-6 col-md-4 mb-2'>
										<a
											href={
												region.depth2 == null
													? `/library/region/${region.depth1.englishName.toLowerCase()}`
													: `/library/region/${region.depth1.englishName.toLowerCase()}/${region.depth2.englishName.toLowerCase()}`
											}>
											<ListGroup.Item className='text-center rounded'>
												<div className='d-flex justify-content-center align-items-center'>
													<img
														src={region.depth2 == null ? region.depth1.logo : region.depth2.logo}
														alt=''
														style={{ height: '50px' }}
														className='rounded me-2'
													/>
													<div className='clamp-1-line'>
														{region.depth1.koreanName} {region.depth2 == null ? '' : region.depth2.koreanName}
													</div>
												</div>
											</ListGroup.Item>
										</a>
									</div>
								)
							})}
						</div>
					)}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

export default LibraryRouteRegionCard