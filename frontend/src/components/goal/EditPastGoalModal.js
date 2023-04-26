import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Functions
import { addGoal, deleteGoal } from '../../functions/goal'
// Resources
import '../../resources/css/input.css'
import messages from '../../settings/messages'

const EditPastGoalModal = ({ isModalOpen, setIsModalOpen, selectedGoal, goalList, setGoalList }) => {
	const [goal, setGoal] = useState(0)
	
	const handleEditGoal = (e) => {
		e.preventDefault()

		if (goal == selectedGoal.goal) {
			toast.error('이전과 같은 목표에요')
			return
		}

		if (goal === '') {
			toast.error('새로운 목표를 입력해 주세요')
			return
		}

		if (isNaN(goal)) {
			toast.error('목표는 숫자만 입력할 수 있어요')
			return
		}

		if (Number(goal) < 2) {
			toast.error('2권 이상의 목표를 입력해 주세요')
			return
		}

		addGoal(selectedGoal.year, goal).then((success) => {
			if (success) {
				toast.success(`${selectedGoal.year}년 목표를 수정했어요`)
				setGoalList(
					goalList.map((g) => {
						if (Number(g.year) === Number(selectedGoal.year)) {
							return {
								year: g.year,
								goal: goal,
								current: selectedGoal.current,
							}
						} else {
							return g
						}
					})
				)
				setIsModalOpen(false)
			} else {
				toast.fail(messages.error)
			}
		})
	}

	const handleDeleteGoal = () => {
		const confirm = window.confirm(`${selectedGoal.year}년 목표를 삭제할까요?`)

		if (confirm) {
			deleteGoal(selectedGoal.year).then((success) => {
				if (success) {
					toast.success(`${selectedGoal.year}년 목표를 삭제했어요`)
					setGoalList(goalList.filter((g) => g.year !== selectedGoal.year))
					setIsModalOpen(false)
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal show={isModalOpen} fullscreen='md-down' centered onHide={() => setIsModalOpen(false)}>
			<Modal.Header closeButton>
				<h4 className='text-center w-100 mt-1'>{`${selectedGoal.year}년 목표 수정하기`}</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleEditGoal(e)}>
					<Form.Control
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						autoFocus
						placeholder={`수정할 목표 (그 전 목표 : ${selectedGoal.goal})`}
						onChange={(e) => setGoal(e.target.value)}
					/>

					<div className='row justify-content-end mt-3'>
						<div className='col-12 col-md-6 ms-0 ms-md-2 mt-2 mb-0 mb-md-1'>
							<Button variant='book-danger' className='w-100' onClick={() => handleDeleteGoal()}>
								삭제하기
							</Button>
						</div>

						<div className='col-12 col-md-6 mt-5 mt-md-2'>
							<Button variant='book-danger' className='w-100' onClick={() => setIsModalOpen(false)}>
								취소
							</Button>
						</div>

						<div className='col-12 col-md-6 mt-2'>
							<Button type='submit' variant='book' className='w-100'>
								수정하기
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default EditPastGoalModal
