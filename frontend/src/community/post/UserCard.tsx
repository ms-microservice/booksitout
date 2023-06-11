import { Card } from "react-bootstrap"
import { MdPeopleAlt as ProfileIcon } from 'react-icons/md'

const UserCard = ({user, body = 'pt-2 pb-2', maxWidth = '200px'}) => {
    return (
		<a href={`/user/${user.name}`} className='d-flex justify-content-end justify-content-md-start'>
			<Card style={{ width: maxWidth }}>
				<Card.Body className={body}>
					<div className='d-flex align-items-center justify-content-center'>
						<h5 className='me-3'>{getProfileImage(user.image)}</h5>
						<h5 className='pt-1'>{user.name}</h5>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

const getProfileImage = (image) => {
	if (image == null || image === '') return <ProfileIcon className='text-book h1 m-0' />

	return <img src={image} alt='' className='img-fluid rounded' style={{ height: '30px', width: '30px' }} />
}

export default UserCard