import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
// Components
import GoalView from './GoalView'
import NoContent from '../common/NoContent'
// Functions

const Goal = () => {
	const [goalList, setGoalList] = useState([{ year: 2022, current: 0, goal: 50 }])
	const [currentYearGoal, setCurrentYearGoal] = useState(null)
	const [highlightBookList, setHighlightBookList] = useState([])

	const currentYear = new Date().getFullYear()

	useEffect(() => {
		// TODO fetch goalList

		const currentYearGoalOptional = goalList.find((goal) => goal.year === currentYear)
		if (typeof currentYearGoalOptional != 'undefined') {
			setCurrentYearGoal(currentYearGoalOptional)
		}
	}, [])

	return (
		<div className='container'>
			<div className='row row-eq-height'>
				<div className='col-12 col-lg-6 mb-4'>
					<Card className='h-100'>
						<Card.Body>
							<h2>{currentYear}년</h2>

							<div className={currentYearGoal != null && 'mb-5'}>
								{currentYearGoal == null ? (
									<NoContent message={`${currentYear}년 목표가 없어요 설정해 주세요!`} style={{ width: '150px' }} />
								) : (
									<GoalView goal={currentYearGoal} />
								)}
							</div>

							<div className='row justify-content-center'>
								{currentYearGoal == null ? (
									<div className='col-12 col-lg-8'>
										<Button className='w-100 mt-3'>목표 설정하기</Button>
									</div>
								) : (
									<>
										<div className='col-6'>
											<Button variant='warning' className='w-100'>
												목표 수정하기
											</Button>
										</div>
										<div className='col-6'>
											<Button variant='danger' className='w-100'>
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
