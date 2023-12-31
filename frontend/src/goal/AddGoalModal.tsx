import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import goalMessage from './goalMessage'
import { addGoal, getGoal } from './goalFunctions'

const AddGoalModal = ({ isModalOpen, setIsModalOpen, setCurrentYearGoal }) => {
	const [goal, setGoal] = React.useState<string>('')
	const currentYear = new Date().getFullYear()

	const handleAddGoal = (e) => {
		e.preventDefault()

		if (goal === '') {
			toast.error(goalMessage.add.fail.null)
			document.getElementById('goal-input')!!.focus()
			return
		}

		if (isNaN(Number(goal))) {
			toast.error(goalMessage.add.fail.notNumber)
			document.getElementById('goal-input')!!.focus()
			return
		}

		if (Number(goal) < 2) {
			toast.error(goalMessage.add.fail.tooSmall)
			document.getElementById('goal-input')!!.focus()
			return
		}

		addGoal(new Date().getFullYear(), goal).then((success) => {
			if (success) {
				getGoal(new Date().getFullYear()).then((goalData) => {
					setCurrentYearGoal({ goal: goal, current: goalData.data.current ?? 0 })
					setIsModalOpen(false)
				})
				toast.success('목표를 추가했어요')
			} else {
				toast.error(goalMessage.error)
			}
		})
	}

	return (
		<Modal show={isModalOpen} centered fullscreen='md-down' onHide={() => setIsModalOpen(false)}>
			<Modal.Header closeButton>
				<h4 className='text-center w-100 mt-1'>{`${currentYear}년 목표 설정하기`}</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddGoal(e)}>
					<Form.Control
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						autoFocus
						placeholder={goalMessage.add.placeholder}
						onChange={(e) => setGoal(e.target.value)}
						id='goal-input'
						autoCapitalize='off'
						autoComplete='off'
						autoCorrect='off'
					/>

					<div className='row justify-content-center mt-3'>
						<div className='col-12 col-md-5 mt-2'>
							<Button type='button' variant='book-danger' className='w-100' onClick={() => setIsModalOpen(false)}>
								취소
							</Button>
						</div>

						<div className='col-12 col-md-5 mt-2'>
							<Button type='submit' variant='book' className='w-100'>
								설정하기
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddGoalModal
