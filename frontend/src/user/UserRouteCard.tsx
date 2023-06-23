import { Card } from "react-bootstrap"

const UserRouteCard = ({title, content}) => {
    return (
		<Card style={{ minHeight: '500px' }}>
			<Card.Body>
				<h3 className='mb-4'>{title}</h3>

				{content}
			</Card.Body>
		</Card>
	)
}

export default UserRouteCard