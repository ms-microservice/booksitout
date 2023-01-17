import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import NoContent from '../../common/NoContent'
import Loading from '../../common/Loading'
import GoalView from './GoalView'
import GoalAddModal from './GoalAddModal'
import GoalEditModal from './GoalEditModal'
import AddButton from '../../common/AddButton'
// Functions
import { getGoalList, deleteGoal } from '../../../functions/goal'
// Settings
import uiSettings from '../../../settings/ui'
import { GOAL_DELETE_CONFIRM } from '../../../messages/statisticsMessages'
// Resources
import goalIcon from '../../../resources/images/general/goal.png'
import GoalPastAddModal from './GoalPastAddModal'
import GoalPastEditModal from './GoalPastEditModal'

const Goal = () => {
	const GOAL_ADD_SUCCESS_MESSAGE = `목표를 추가했어요`
	const GOAL_ADD_FAIL_MESSAGE = `오류가 났어요. 잠시 후 다시 시도해 주세요`
	const GOAL_DELETE_SUCCESS_MESSAGE = `목표를 지웠어요`
	const GOAL_DELETE_FAIL_MESSAGE = `오류가 났어요. 잠시 후 다시 시도해 주세요`

	const [intialFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
	const [isGoalEditModalOpen, setIsGoalEditModalOpen] = useState(false)
	const [isPastGoalAddModalOpen, setIsPastGoalAddModalOpen] = useState(false)
	const [isPastGoalEditModalOpen, setIsPastGoalEditModalOpen] = useState(false)

	const [selectedEditGoal, setSelectedEditGoal] = useState(null)

	const currentYear = new Date().getFullYear()

	const [goalList, setGoalList] = useState([])
	const [currentYearGoal, setCurrentYearGoal] = useState(null)
	const [highlightBookList, setHighlightBookList] = useState([])

	const handleDeleteGoal = () => {
		const confirm = window.confirm(GOAL_DELETE_CONFIRM)

		if (confirm) {
			deleteGoal(currentYear).then((success) => {
				if (success) {
					toast.success(GOAL_DELETE_SUCCESS_MESSAGE)
					setCurrentYearGoal(null)
				} else {
					toast.error(GOAL_DELETE_FAIL_MESSAGE)
				}
			})
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, uiSettings.initalFetchTime)

		getGoalList(6)
			.then((goalListData) => {
				setGoalList(goalListData)
				console.log(goalListData)

				const currentYearGoalOptional = goalListData.find((goal) => goal.year == currentYear)
				if (typeof currentYearGoalOptional != 'undefined') {
					setCurrentYearGoal(currentYearGoalOptional)
				}
			})
			.finally(() => {
				setInitialFetch(false)
				setIsLoading(false)
			})
	}, [])

	return (
		<div className='container'>
			{intialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height'>
					<GoalAddModal isModalOpen={isGoalModalOpen} setIsModalOpen={setIsGoalModalOpen} setCurrentYearGoal={setCurrentYearGoal} />
					{currentYearGoal != null && (
						<GoalEditModal
							isModalOpen={isGoalEditModalOpen}
							setIsModalOpen={setIsGoalEditModalOpen}
							setCurrentYearGoal={setCurrentYearGoal}
							currentBook={currentYearGoal.current}
							previousGoal={currentYearGoal.goal}
						/>
					)}
					<GoalPastAddModal
						isModalOpen={isPastGoalAddModalOpen}
						setIsModalOpen={setIsPastGoalAddModalOpen}
						goalList={goalList}
						setGoalList={setGoalList}
					/>
					{selectedEditGoal != null && (
						<GoalPastEditModal
							isModalOpen={isPastGoalEditModalOpen}
							setIsModalOpen={setIsPastGoalEditModalOpen}
							selectedGoal={selectedEditGoal}
							goalList={goalList}
							setGoalList={setGoalList}
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
												<Button variant='danger' className='w-100' onClick={() => handleDeleteGoal()}>
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
								<h2>{new Date().getFullYear()}년 최고의 책</h2>

								{highlightBookList.length === 0 ? (
									<NoContent message={`${currentYear}년은 아직 최고의 책이 없어요`} style={{ width: '150px' }} />
								) : (
									<></>
								)}

								<div className='row justify-content-center'>
									<div className='col-12 col-lg-8'>
										<Button className='mt-3 w-100' disabled>
											최고의 책 직접 선정하기
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 mb-5'>
						<Card>
							<Card.Body>
								<h2 className='mb-4'>과거 목표</h2>

								<AddButton
									size='30'
									color='success'
									onClick={() => {
										setIsPastGoalAddModalOpen(true)
									}}
									right='2%'
								/>

								{goalList.filter((g) => g.year != new Date().getFullYear()).length === 0 ? (
									<NoContent message='과거 목표가 없어요' />
								) : (
									<div className='row text-center'>
										{goalList
											.filter((goal) => goal.year != new Date().getFullYear())
											.sort((a, b) => b.year - a.year)
											.map((goal) => {
												return (
													<div
														onClick={() => {
															setSelectedEditGoal(goal)
															setIsPastGoalEditModalOpen(true)
														}}
														className='col-6 col-sm-4 col-md-3 col-lg-2 mb-4'
														style={{ opacity: goal.year === new Date().getFullYear() ? '1' : '0.5' }}>
														<h3 className='mb-0'>{`${goal.year}년`}</h3>

														<img
															src={goalIcon}
															alt=''
															className='img-fluid align-middle'
															style={{
																width: '150px',
																height: '150px',
															}}
														/>

														<h4 className='mt-3'>{`${goal.current}권 / ${goal.goal}권`}</h4>
													</div>
												)
											})}
									</div>
								)}
							</Card.Body>
						</Card>
					</div>
				</div>
			)}
		</div>
	)
}

export default Goal
