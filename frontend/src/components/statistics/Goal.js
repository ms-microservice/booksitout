import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
// Components
import NoContent from '../common/NoContent'
import GoalView from './GoalView'
import GoalAddModal from './GoalAddModal'

// Functions
import { deleteGoal, getGoalList } from '../../functions/goal'
import GoalEditModal from './GoalEditModal'

const Goal = () => {
	const currentYear = new Date().getFullYear()

	const [goalList, setGoalList] = useState([])
	const [currentYearGoal, setCurrentYearGoal] = useState(null)
	const [highlightBookList, setHighlightBookList] = useState([])

	const handleDeleteGoal = () => {
		const confirm = window.confirm('목표를 삭제할까요?')

		if (confirm) {
			deleteGoal(currentYear).then((success) => {
				if (success) {
					setCurrentYearGoal(null)
				}
			})
		}
	}

	useEffect(() => {
		// TODO fetch goalList
		getGoalList().then((goalListData) => {
			setGoalList(goalListData)

			const currentYearGoalOptional = goalListData.find((goal) => goal.year == currentYear)
			if (typeof currentYearGoalOptional != 'undefined') {
				setCurrentYearGoal(currentYearGoalOptional)
			}
		})
	}, [])

	const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
	const [isGoalEditModalOpen, setIsGoalEditModalOpen] = useState(false)

	return (
		<div className='container'>
			<div className='row row-eq-height'>
				<GoalAddModal isModalOpen={isGoalModalOpen} setIsModalOpen={setIsGoalModalOpen} setCurrentYearGoal={setCurrentYearGoal} />

				{currentYearGoal != null && (
					<GoalEditModal
						isModalOpen={isGoalEditModalOpen}
						setIsModalOpen={setIsGoalEditModalOpen}
						setCurrentYearGoal={setCurrentYearGoal}
						currentBook={currentYearGoal.current}
					/>
				)}

				<div className='col-12 col-lg-6 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h2>{currentYear}년</h2>

							<div className={currentYearGoal != null && 'mb-5'}>
								{currentYearGoal == null ? (
									<NoContent message={`${currentYear}년 목표가 없어요`} style={{ width: '150px' }} />
								) : (
									<GoalView goal={currentYearGoal} />
								)}
							</div>

							<div className='row justify-content-center'>
								{currentYearGoal == null ? (
									<div className='col-12 col-lg-8'>
										<Button className='w-100 mt-3' onClick={() => setIsGoalModalOpen(true)}>
											목표 설정하기
										</Button>
									</div>
								) : (
									<>
										<div className='col-6'>
											<Button variant='warning' className='w-100' onClick={() => setIsGoalEditModalOpen(true)}>
												목표 수정하기
											</Button>
										</div>
										<div className='col-6'>
											<Button variant='danger' className='w-100' onClick={handleDeleteGoal}>
												목표 삭제하기
											</Button>
										</div>
									</>
								)}
							</div>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h2>2022년 최고의 책</h2>

							{highlightBookList.length === 0 ? (
								<NoContent message={`${currentYear}년은 아직 최고의 책이 없어요`} style={{ width: '150px' }} />
							) : (
								<></>
							)}

							<div className='row justify-content-center'>
								<div className='col-12 col-lg-8'>
									<Button className='mt-3 w-100'>최고의 책 직접 선정하기</Button>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 mb-5'>
					<Card>
						<Card.Body>
							<h2>과거 목표</h2>

							{goalList.length < 2 ? <NoContent message='과거 목표가 없어요' /> : <></>}
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Goal
