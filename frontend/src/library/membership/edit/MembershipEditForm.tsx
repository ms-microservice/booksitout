import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

import { booksitoutServer } from '../../../functions/axios'
import MembershipAddFormManualTypeSearchCard from '../add/manual/MembershipAddFormManualTypeSearchCard'

const MembershipEditForm = ({ membership }) => {
    const navigate = useNavigate()

    const [membershipNumber, setMembershipNumber] = React.useState<string>(membership.number)
    const [memo, setMemo] = React.useState<string>(membership.memo)
    const [typeId, setTypeId] = React.useState<number>()

    const handleSubmit = (e) => {
		e.preventDefault()

        if (membershipNumber === membership.number && memo === membership.memo && typeId === membership.typeId) {
            toast.error('수정된 내용이 없어요')
            return
        }

        const editedMembership = {
			number: membershipNumber,
			memo: memo,
			typeId: typeId,
		}

        booksitoutServer
			.put(`v5/library/membership/${membership.id}`, editedMembership)
			.then(() => {
				toast.success('회원증을 수정했어요')
				navigate(`/library/membership/detail/${membership.id}`)
			})
			.catch(() => toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요'))
	}

	return (
		<Card style={{ minHeight: '700px' }}>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<div className='mt-4' />
					<div className='d-flex align-items-center'>
						<Form.Label>도서관 회원증 번호</Form.Label>
						<h6 className='ms-3 text-book'>{membershipNumber?.length}</h6>
					</div>
					<Form.Control
						id='membership-number-input'
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						autoFocus
						defaultValue={membership.number}
						onChange={(e) => setMembershipNumber(e.target.value)}
						placeholder='보통 14자리인 도서관 회원증 번호'
					/>

					<div className='mt-4' />
					<Form.Label>종류</Form.Label>
					<div style={{ minHeight: '200px' }}>
						<MembershipAddFormManualTypeSearchCard typeId={typeId} setTypeId={setTypeId} />
					</div>

					<div className='mt-4' />
					<Form.Label>메모</Form.Label>
					<Form.Control onChange={(e) => setMemo(e.target.value)} defaultValue={membership.memo} />

					<div className='row justify-content-center w-100' style={{ position: 'absolute', bottom: '20px' }}>
						<div className='col-12 col-md-6'>
							<Button type='submit' variant='book' className='w-100'>
								회원증 수정하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default MembershipEditForm