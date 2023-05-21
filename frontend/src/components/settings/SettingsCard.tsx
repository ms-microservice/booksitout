import { Card } from 'react-bootstrap'

const SettingsCard = ({ title, content }) => {
	return (
		<Card className='mb-4' style={{ minHeight: '300px' }}>
			<Card.Body className='h-100'>
				<h3 className='mb-4'>{title}</h3>

				{content}
			</Card.Body>
		</Card>
	)
}

export default SettingsCard