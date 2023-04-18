import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Resources
import '../../../resources/css/input.css'
// functions
import { addGoal } from '../../../functions/goal'

const GoalPastAddModal = ({ isModalOpen, setIsModalOpen, goalList, setGoalList }) => {
	const [goalYear, setGoalYear] = useState(new Date().getFullYear() - 1)
	const [goal, setGoal] = useState(0)

	const handleAddPastGoal = (e) => {
		e.preventDefault()

		if (Number(goal) === 0) {
			toast.error('목표를 입력해 주세요')
			return
		}

		const isGoalAlreadyPresent = typeof goalList.find((g) => Number(g.year) === Number(goalYear)) != 'undefined'

		if (isGoalAlreadyPresent) {
			toast.error('해당 년도의 목표를 이미 설정했어요')
			return
		}

		addGoal(goalYear, goal).then((success) => {
			if (success) {
				setIsModalOpen(false)
				setGoalList([
					...goalList,
					{
						year: goalYear,
						current: 0,
						goal: goal,
					},
				])
			}
		})
	}

	return (
		<Modal show={isModalOpen} centered onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header className='text-center' closeButton>
				<h4 className='w-100'>과거 목표 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Label>추가할 년도</Form.Label>
					<Form.Select className='mb-3' onChange={(e) => setGoalYear(e.target.value)}>
						{Array.from({ length: 9 }, (_, i) => i + new Date().getFullYear() - 9)
							.reverse()
							.map((year) => {
								return <option value={year}>{`${year}년`}</option>
							})}
					</Form.Select>

					<Form.Label>목표</Form.Label>
					<Form.Control
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						autoFocus
						className='mb-3'
						onChange={(e) => setGoal(e.target.value)}
					/>

					<Button variant='book' className='w-100 mt-2' type='submit' onClick={(e) => handleAddPastGoal(e)}>
						추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default GoalPastAddModal
