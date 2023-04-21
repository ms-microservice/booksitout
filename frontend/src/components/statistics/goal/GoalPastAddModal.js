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
						{Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 20 + i)
							.filter((inputGoal) => !goalList.map((g) => g.year).includes(inputGoal))
							.reverse()
							.slice(0, 9)
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

					<p className='text-muted text-center'>20년 이상 전의 목표는 추가할 수 없어요</p>

					<div className='row justify-content-center'>
						<div className='col-12 col-md-5'>
							<Button variant='book-danger' className='w-100 mt-2' onClick={() => setIsModalOpen(false)}>취소</Button>
						</div>

						<div className='col-12 col-md-5'>
							<Button variant='book' className='w-100 mt-2' type='submit' onClick={(e) => handleAddPastGoal(e)}>
								추가하기
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default GoalPastAddModal
