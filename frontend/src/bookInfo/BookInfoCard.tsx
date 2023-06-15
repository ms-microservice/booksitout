import { Card } from 'react-bootstrap'
import CardTitle from '../common/CardTitle'

const BookInfoCard = ({ title, icon, content }) => {
	return (
		<Card style={{ minHeight: '600px' }}>
			<Card.Body className='h-100'>
				<div className='row h-100'>
					<CardTitle icon={icon} title={title}/>
					<div className="mb-4"/>

					<div className='m-0'>{content}</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default BookInfoCard
