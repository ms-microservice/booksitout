import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { TbStatusChange as ChangeIcon } from 'react-icons/tb'
import CardTitle from '../../common/CardTitle'
import { useNavigate } from 'react-router-dom'

const MembershipDetailRemoveEditCard = ({id, deleteMembership}) => {
    const navigate = useNavigate()

    return (
		<Card style={{ minHeight: '210px' }}>
			<Card.Body>
				<CardTitle icon={<ChangeIcon />} title={'수정 / 삭제하기'} subTitle={undefined} textSize={2} />

				<div className='row mt-5 justify-content-center'>
					<div className='col-12 col-md-4 mb-3'>
						<Button variant='warning' className='w-100' onClick={() => navigate(`/library/membership/edit/${id}`)}>
							수정하기
						</Button>
					</div>

					<div className='col-12 col-md-4 mb-3'>
						<Button variant='book-danger' className='w-100' onClick={() => deleteMembership()}>
							삭제하기
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MembershipDetailRemoveEditCard