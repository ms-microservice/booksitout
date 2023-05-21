import { Card } from 'react-bootstrap'

const BookReadInYear = ({ year }) => {
	return (
		<Card>
			<Card.Body>
				<h2 className='mb-4'>{year}년도 읽은 책</h2>
			</Card.Body>
		</Card>
	)
}

export default BookReadInYear
