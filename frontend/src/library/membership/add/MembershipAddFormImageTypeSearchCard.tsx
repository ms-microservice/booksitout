import React from 'react'
import { useDebounce } from '../../../common/useDebounce'
import { MembershipTypeSearchResultType } from '../MembershipType'
import { booksitoutServer } from '../../../functions/axios'
import { Card, ListGroup, Form } from 'react-bootstrap'
import RegionSearchResultLoading from './RegionSearchResultLoading'
import NoContent from '../../../common/NoContent'
import Error from '../../../common/Error';
import MembershipTypeSearchResult from './manual/MembershipTypeSearchResult'

const MembershipAddFormImageTypeSearchCard = ({ recognizedMembership, selectType }) => {
	const [loading, setLoading] = React.useState(false)

	const [searchResult, setSearchResult] = React.useState<MembershipTypeSearchResultType[]>(
		recognizedMembership.typeId != null
			? [
					{
						id: recognizedMembership.typeId,
						name: recognizedMembership.name,
						logo: recognizedMembership.logo,
						description: '',
					},
			  ]
			: [],
	)

	const [query, setQuery] = React.useState<string>(recognizedMembership?.name ?? '')
	const [debouncedQuery, cancelDebounce] = useDebounce(query, 500)
	React.useEffect(() => {
		if (debouncedQuery === '') {
			cancelDebounce()
		} else {
			booksitoutServer
				.get(`v5/library/membership/type?q=${query}&size=6`)
				.then(res => setSearchResult(res.data))
				.finally(() => setLoading(false))
		}
	}, [debouncedQuery])

	React.useEffect(() => {
		setLoading(query !== '')
	}, [query])

	return (
		<>
			<Form.Control
				placeholder="회원증 종류를 검색해서 선택해 주세요 "
				defaultValue={recognizedMembership?.name ?? ''}
				onChange={e => setQuery(e.target.value)}
			/>
			<Card style={{ minHeight: '230px' }} className="mt-3">
				<Card.Body>
					<ListGroup>
						{loading ? (
							<div className="row">
								{Array.from({ length: 6 }).map(() => {
									return (
										<div className="col-6 p-0 mt-1">
											<RegionSearchResultLoading />
										</div>
									)
								})}
							</div>
						) : searchResult == null ? (
							<NoContent move={-50} iconSize={3} textSize={5} message="검색어를 입력해 주세요" />
						) : searchResult === undefined ? (
							<Error move={0} />
						) : searchResult.length === 0 ? (
							<NoContent move={-50} iconSize={3} textSize={5} message="검색 결과가 없어요" />
						) : (
							<div className="row">
								{searchResult.map(type => {
									return (
										<div className="col-6 p-0 mt-1" onClick={() => selectType(type.id)}>
											<MembershipTypeSearchResult
												type={type}
												selected={recognizedMembership.typeId}
											/>
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

export default MembershipAddFormImageTypeSearchCard