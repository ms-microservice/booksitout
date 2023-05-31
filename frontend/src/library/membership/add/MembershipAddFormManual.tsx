import React from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDebounce } from '../../../common/useDebounce'
import { booksitoutServer } from '../../../functions/axios'
import RegionSearchResult from './RegionSearchResult'
import RegionSearchResultLoading from './RegionSearchResultLoading'
import Error from '../../../components/common/Error';
import NoContent from '../../../components/common/NoContent'
import { PageType } from '../../../types/PageType'
import { RegionSearchResultType } from '../../LocationType'
import { useNavigate } from 'react-router-dom'

const MembershipAddFormManual = () => {
	const navigate = useNavigate()

    const [membershipNumber, setMembershipNumber] = React.useState<string>('')
	const [regionNumber, setRegionNumber] = React.useState<number | null>(null)

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (membershipNumber === '') {
            toast.error('회원증 번호를 입력해 주세요')
            document.getElementById('membership-number-input')!!.focus()
            return
        }

        toast.loading('회원증을 추가하고 있어요')
		const membership = {
			number: membershipNumber,
			region: regionNumber,
		}

		booksitoutServer
			.post('v5/library/membership', membership)
			.then(() => {
				toast.success('회원증을 추가했어요')
				navigate('/library/membership/all')
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
    }

    return (
		<Card style={{ minHeight: '600px' }} className='mb-5'>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<div className='mt-4' />
					<Form.Label>도서관 회원증 번호</Form.Label>
					<Form.Control
						id='membership-number-input'
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						autoFocus
						onChange={(e) => setMembershipNumber(e.target.value)}
						placeholder='보통 13자리인 도서관 회원증 번호를 입력해 주세요'
					/>

					<div className="mt-4"/>
					<Form.Label>종류</Form.Label>
					<Form.Select>
						<option value='COUNTRY'>국립</option>
						<option value='REGION'>공립 (시립, 구립, 도립 등)</option>
						<option value='SCHOOL'>학교 (대학, 초중고 등)</option>
						<option value='LIBRARY_ONE'>통합 (책 이음 등)</option>
						<option value='PRIVATE'>사립</option>
						<option value='OTHERS'>기타</option>
					</Form.Select>

					<div className='mt-4' />
					<Form.Label>지역 검색하기</Form.Label>
					<Form.Control placeholder='지역을 검색해서 선택해 주세요' onChange={(e) => setQuery(e.target.value)} />
					<Card style={{ minHeight: '200px' }} className='mt-3'>
						<Card.Body>
							<ListGroup>
								{loading ? (
									<div className='row'>
										{Array.from({ length: 6 }).map(() => {
											return (
												<div className='col-12 col-md-6'>
													<RegionSearchResultLoading />
												</div>
											)
										})}
									</div>
								) : regionSearchResultList == null ? (
									<NoContent move={0} message='검색어를 입력해 주세요' />
								) : regionSearchResultList === undefined ? (
									<Error move={0} />
								) : regionSearchResultList.content.length === 0 ? (
									<NoContent move={0} message='검색 결과가 없어요' />
								) : (
									<div className='row'>
										{regionSearchResultList.content.map((region) => {
											return (
												<div className='col-12 col-md-6' onClick={() => setRegionNumber(region.id)}>
													<RegionSearchResult region={region} selected={regionNumber}/>
												</div>
											)
										})}
									</div>
								)}
							</ListGroup>
						</Card.Body>
					</Card>

					<div className='row justify-content-center w-100' style={{ position: 'absolute', bottom: '20px' }}>
						<div className='col-12 col-md-6'>
							<Button type='submit' variant='book' className='w-100'>
								회원증 추가하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default MembershipAddFormManual