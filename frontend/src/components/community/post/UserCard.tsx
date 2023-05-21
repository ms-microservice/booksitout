import { Card } from "react-bootstrap"

import { MdPeopleAlt as ProfileIcon } from 'react-icons/md'

const UserCard = ({user}) => {
    return (
		<a href={`/user/${user.name}`}>
			<Card style={{ maxWidth: '200px' }} className='ms-auto'>
				<Card.Body>
					<div className='row align-items-center'>
						<div className='col-4'>
							{user.profileImage == null ? (
								<ProfileIcon className='text-book h1 m-0' />
							) : (
								<img src={user.profileImage} alt='' className='img-fluid rounded' style={{ height: '30px', width: '30px' }} />
							)}
						</div>

						<div className='col-8'>
							<h5 className='m-0 w-100 text-center'>{user.name}</h5>
						</div>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default UserCard