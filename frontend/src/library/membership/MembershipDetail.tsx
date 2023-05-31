import React from 'react'
import { useParams } from 'react-router-dom'
import { booksitoutServer } from '../../functions/axios'

import { MembershipType } from './MembershipType'
import MembershipCard from './MembershipCard'
import MembershipDetailAddCard from './MembershipDetailAddCard'
import MembershipDetailLibrary from './MembershipDetailLibrary'
import MembershipCardLoading from './MembershipCardLoading'
import NoContent from '../../components/common/NoContent'
import { Card } from 'react-bootstrap'

const MembershipDetail = () => {
	const [loading, setLoading] = React.useState<boolean>(true)
	const [initialFetch, setInitialFetch] = React.useState<boolean>(true)
	const [notFound, setNotFound] = React.useState<boolean>(false)

	const { id } = useParams()
    const [membership, setMembership] = React.useState<MembershipType | null>(null)
	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		booksitoutServer
			.get(`v5/library/membership/${id}`)
			.then((res) => setMembership(res.data))
			.catch((e) => {
				if (e.response.status === 404) {
					setNotFound(true)
				}
			})
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})
	}, [id])

	if (notFound) return <NoContent message='도서관 회원증이 없어요' />
    return (
		<div className='container-xl'>
			{initialFetch ? (
				<Card style={{ minHeight: '200px' }}></Card>
			) : loading ? (
				<MembershipCardLoading />
			) : (
				<span className='not-clickable'>
					<MembershipCard membership={membership} width={2} />
				</span>
			)}
			<div className='mb-4' />

			<MembershipDetailLibrary />
			<div className='mb-4' />

			<MembershipDetailAddCard id={id} />
			<div className='mb-4' />
		</div>
	)
}

export default MembershipDetail