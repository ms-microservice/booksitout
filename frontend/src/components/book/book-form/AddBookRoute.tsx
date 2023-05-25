import React from 'react'
import { ToggleButton, ButtonGroup } from 'react-bootstrap'

import AddBookManualForm from './AddBookManualForm'
import AddBookSearchForm from './AddBookSearchForm'
import { useNavigate, useParams } from 'react-router-dom'

const AddBookRoute = () => {
	const navigate = useNavigate()
	const { method } = useParams()

	return (
		<div className='container mb-5'>
			<ButtonGroup className='w-100'>
				<ToggleButton
					className='w-100'
					value={'SEARCH'}
					type='radio'
					checked={false}
					onClick={() => navigate('/book/add/search')}
					variant={method?.toUpperCase() === 'SEARCH' ? 'book' : 'light'}>
					검색으로 추가하기
				</ToggleButton>

				<ToggleButton
					className='w-100'
					value={'MANUAL'}
					type='radio'
					checked={false}
					onClick={() => navigate('/book/add/manual')}
					variant={method?.toUpperCase() === 'MANUAL' ? 'book' : 'light'}>
					직접 추가하기
				</ToggleButton>
			</ButtonGroup>

			{method?.toUpperCase() === 'SEARCH' ? <AddBookSearchForm /> : <AddBookManualForm />}
		</div>
	)
}

export default AddBookRoute
