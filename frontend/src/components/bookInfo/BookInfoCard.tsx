import { Card } from 'react-bootstrap'

const BookInfoCard = ({ title, content }) => {
	return (
		<Card style={{ minHeight: '600px' }}>
			<Card.Body className='h-100'>
				<div className='row h-100'>
					<h2 className='mb-4'>{title}</h2>

					{content}
				</div>
			</Card.Body>
		</Card>
	)
}

export default BookInfoCard
