import React from 'react'
import { ToggleButton, ButtonGroup } from 'react-bootstrap'

import AddBookManualForm from './AddBookManualForm'
import AddBookSearchForm from './AddBookSearchForm'

const AddBookRoute = () => {
	const [selectedMethod, setSelectedMethod] = React.useState('SEARCH')

	return (
		<div className='container mb-5'>
			<ButtonGroup className='w-100'>
				<ToggleButton
					className='w-100'
					value={'SEARCH'}
					type='radio'
					checked={false}
					onClick={() => setSelectedMethod('SEARCH')}
					variant={selectedMethod === 'SEARCH' ? 'book' : 'light'}>
					검색으로 추가하기
				</ToggleButton>

				<ToggleButton
					className='w-100'
					value={'MANUAL'}
					type='radio'
					checked={false}
					onClick={() => setSelectedMethod('MANUAL')}
					variant={selectedMethod === 'MANUAL' ? 'book' : 'light'}>
					직접 추가하기
				</ToggleButton>
			</ButtonGroup>

			{selectedMethod === 'SEARCH' ? <AddBookSearchForm /> : <AddBookManualForm />}
		</div>
	)
}

export default AddBookRoute
