import React from 'react'
import { Card, ListGroup, Form } from 'react-bootstrap'
import { MembershipTypeSearchResultType } from '../../MembershipType'
import NoContent from '../../../../components/common/NoContent'
import Error from '../../../../components/common/Error';
import RegionSearchResultLoading from '../RegionSearchResultLoading'
import { booksitoutServer } from '../../../../functions/axios';
import { useDebounce } from '../../../../common/useDebounce';
import MembershipTypeSearchResult from './MembershipTypeSearchResult';

const MembershipAddFormManualTypeSearchCard = ({ typeId, setTypeId }) => {
	const [loading, setLoading] = React.useState(false)

    const [searchResult, setSearchResult] = React.useState<MembershipTypeSearchResultType[]>([])
    const [query, setQuery] = React.useState<string>('')
    const [debouncedQuery, cancelDebounce] = useDebounce(query, 500)
    React.useEffect(() => {
        if (debouncedQuery === '') {
            setSearchResult([])
			cancelDebounce()
		} else {
			booksitoutServer
				.get(`v5/library/membership/type?q=${query}&size=6`)
				.then((res) => setSearchResult(res.data))
				.finally(() => setLoading(false))
		}
	}, [debouncedQuery])

    React.useEffect(() => {
		setLoading(query !== '')
	}, [query])

	return (
		<>
			<Form.Control placeholder='회원증 종류를 검색해서 선택해 주세요 ' onChange={(e) => setQuery(e.target.value)} />
			<Card style={{ minHeight: '230px' }} className='mt-3'>
				<Card.Body>
					<ListGroup>
						{loading ? (
							<div className='row'>
								{Array.from({ length: 6 }).map(() => {
									return (
										<div className='col-6 p-0 mt-1'>
											<RegionSearchResultLoading />
										</div>
									)
								})}
							</div>
						) : searchResult == null ? (
							<NoContent move={-50} iconSize={3} textSize={5} message='검색어를 입력해 주세요' />
						) : searchResult === undefined ? (
							<Error move={0} />
						) : searchResult.length === 0 ? (
							<NoContent move={-50} iconSize={3} textSize={5} message='검색 결과가 없어요' />
						) : (
							<div className='row'>
								{searchResult.map((type) => {
									return (
										<div className='col-6 p-0 mt-1' onClick={() => setTypeId(type.id)}>
											<MembershipTypeSearchResult type={type} selected={typeId} />
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

export default MembershipAddFormManualTypeSearchCard