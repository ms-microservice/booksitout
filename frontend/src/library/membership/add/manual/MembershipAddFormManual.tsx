import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { booksitoutServer } from '../../../../functions/axios'
import { useNavigate } from 'react-router-dom'
import MembershipAddManualTypeRegion from './MembershipAddManualTypeRegion'

const MembershipAddFormManual = () => {
	const navigate = useNavigate()

    const [membershipNumber, setMembershipNumber] = React.useState<string>('')
	const [regionId, setRegionId] = React.useState<number | null>(null)
	const [membershipType, setMembershipType] = React.useState<string>('REGION')
	const [memo, setMemo] = React.useState<string>('')

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
			region: regionId,
			type: membershipType,
			memo: memo,
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
		<Card style={{ minHeight: '725px' }} className='mb-5'>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<div className='mt-4' />
					<div className='d-flex align-items-center'>
						<Form.Label>도서관 회원증 번호</Form.Label>
						<h6 className='ms-3 text-book'>{membershipNumber.length}</h6>
					</div>
					<Form.Control
						id='membership-number-input'
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						autoFocus
						onChange={(e) => setMembershipNumber(e.target.value)}
						placeholder='보통 13자리인 도서관 회원증 번호'
					/>

					<div className='mt-4' />
					<Form.Label>종류</Form.Label>
					<Form.Select onChange={(e) => setMembershipType(e.target.value)}>
						<option value='REGION'>공립 (시립, 구립, 도립 등)</option>

						<option value='LIBRARY_ONE'>통합 (책 이음 등)</option>

						<option value='COUNTRY'>국립</option>
						<option value='SCHOOL'>학교 (대학, 초중고 등)</option>
						<option value='PRIVATE'>사립</option>
						<option value='OTHERS'>기타</option>
					</Form.Select>

					<div className='mt-4' />
					<div style={{ minHeight: '300px' }}>
						{membershipType === 'REGION' && <MembershipAddManualTypeRegion regionId={regionId} setRegionId={setRegionId} />}
					</div>

					<div className='mt-4' />
					<Form.Label>메모</Form.Label>
					<Form.Control onChange={(e) => setMemo(e.target.value)} />

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