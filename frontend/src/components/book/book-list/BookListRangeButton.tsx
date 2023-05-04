import { Card, ButtonGroup, ToggleButton } from 'react-bootstrap'

const BookListRangeButton = ({range}) => {
  return (
		<Card>
			<Card.Body>
				<ButtonGroup className='w-100'>
					<a href='/book/not-done' className='w-100'>
						<ToggleButton
							variant={range == 'not-done' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'not-done'}>
							읽고 있는 책
						</ToggleButton>
					</a>

					<a href='/book/done' className='w-100'>
						<ToggleButton variant={range == 'done' ? 'book' : 'light'} type='radio' checked={false} className='w-100' value={'done'}>
							다 읽은 책
						</ToggleButton>
					</a>

					<a href='/book/give-up' className='w-100'>
						<ToggleButton
							variant={range == 'give-up' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'give-up'}>
							포기한 책
						</ToggleButton>
					</a>
				</ButtonGroup>
			</Card.Body>
		</Card>
  )
}

export default BookListRangeButton