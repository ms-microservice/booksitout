import React from 'react'
import { ToggleButton, ButtonGroup, Card } from 'react-bootstrap'
import AddBookManualForm from './AddBookManualForm'
import AddBookSearchForm from './AddBookSearchForm'
import { useNavigate, useParams } from 'react-router-dom'

const AddBookRoute = () => {
	const navigate = useNavigate()
	const { method } = useParams()

	return (
		<>
			<ButtonGroup className="w-100">
				<ToggleButton
					className="w-100"
					value={'SEARCH'}
					type="radio"
					checked={false}
					onClick={() => navigate('/add/book/search')}
					variant={method?.toUpperCase() === 'SEARCH' ? 'book' : 'light'}
				>
					검색으로 추가하기
				</ToggleButton>

				<ToggleButton
					className="w-100"
					value={'MANUAL'}
					type="radio"
					checked={false}
					onClick={() => navigate('/add/book/manual')}
					variant={method?.toUpperCase() === 'MANUAL' ? 'book' : 'light'}
				>
					직접 추가하기
				</ToggleButton>
			</ButtonGroup>

			{method?.toUpperCase() === 'SEARCH' ? <AddBookSearchForm /> : <AddBookManualForm />}
		</>
	)
}

export default AddBookRoute
