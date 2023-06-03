import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { booksitoutServer } from '../../functions/axios'
import { MembershipType } from './MembershipType'
import MembershipCard from './MembershipCard'
import MembershipDetailAddCard from './MembershipDetailAddCard'
import MembershipDetailLibrary from './MembershipDetailLibrary'
import MembershipCardLoading from './MembershipCardLoading'
import NoContent from '../../components/common/NoContent'
import { Card } from 'react-bootstrap'
import MembershipDetailRemoveEditCard from './MembershipDetailRemoveEditCard'
import { toast } from 'react-hot-toast'

const MembershipDetail = () => {
	const navigate= useNavigate()

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

	const deleteMembership = () => {
		if (window.confirm('정말 도서관 회원증을 삭제할까요?')) {
			booksitoutServer
				.delete(`v5/library/membership/${id}`)
				.then(() => {
					toast.success('회원증을 삭제했어요')
					navigate('/library/membership/all')
				})
				.catch(() => toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요'))
		}
	}

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

			<MembershipDetailRemoveEditCard id={id} deleteMembership={deleteMembership} />
			<div className='mb-4' />
		</div>
	)
}

export default MembershipDetail