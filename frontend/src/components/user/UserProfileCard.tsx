import { Card } from "react-bootstrap"

import { BsFillPatchCheckFill as PaidIcon } from 'react-icons/bs'
import { FaUserAlt as UserIcon } from 'react-icons/fa'

import '../../resources/css/user.css'

const UserProfileCard = ({ user }) => {
	return (
		<Card>
			<Card.Body>
				<div className='row align-items-center' style={{ minHeight: '180px' }}>
					<div className='col-12 col-md-6 text-center'>
						{user.profileImage === null || user.profileImage === '' ? (
							<UserIcon className='text-book mb-0' style={{ width: '150px', height: '150px' }} />
						) : (
							<img
								src={user.profileImage}
								alt=''
								className='img-fluid rounded mb-4 mb-md-0'
								style={{ width: '150px', height: '150px' }}
							/>
						)}
					</div>

					<div className='col-12 col-md-6' id='user-profile-text'>
						<h3 className='d-inline-block'>{user.name}</h3>
						{user.isPaidUser && <PaidIcon className='text-book h3 ms-3' />}

						<p className='text-secondary' style={{ fontSize: '20px' }}>
							책잇아웃과 함께한지 <b className='text-book'>{user.joinDayCount}</b>일
						</p>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default UserProfileCard