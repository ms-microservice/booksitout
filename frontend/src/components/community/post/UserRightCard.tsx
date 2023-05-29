import { Card } from "react-bootstrap"

import { MdPeopleAlt as ProfileIcon } from 'react-icons/md'

const UserRightCard = ({user}) => {
    return (
		<a href={`/user/${user.name}`}>
			<Card style={{ maxWidth: '200px' }} className='ms-auto'>
				<Card.Body>
					<div className='row align-items-center'>
						<div className='col-4'>
							{user.profileImage == null || user.profileImage === '' ? (
								<ProfileIcon className='text-book h1 m-0' />
							) : (
								<img src={user.profileImage} alt='' className='img-fluid rounded' style={{ width: '30px' }} />
							)}
						</div>

						<div className='col-8'>
							<h6 className='m-0 w-100 text-center clmap-1-line'>{user.name}</h6>
						</div>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default UserRightCard