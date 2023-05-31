import React from 'react'
import { Card, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import NoContent from '../components/common/NoContent'
import Loading from '../components/common/Loading'
import Goal from './Goal'
import AddGoalModal from './AddGoalModal'
import EditGoalModal from './EditGoalModal'
import AddButton from '../components/common/AddButton'
import { getGoalList, deleteGoal } from './goalFunctions'
import goalIcon from './images/goal.png'
import AddPastGoalModal from './AddPastGoalModal'
import EditPastGoalModal from './EditPastGoalModal'
import goalMessage from './goalMessage'
import { GoalType } from './GoalType'

const GoalRoute = () => {
	const GOAL_DELETE_SUCCESS_MESSAGE = `목표를 지웠어요`
	const GOAL_DELETE_FAIL_MESSAGE = `오류가 났어요. 잠시 후 다시 시도해 주세요`

	const [intialFetch, setInitialFetch] = React.useState<boolean>(true)
	const [isLoading, setIsLoading] = React.useState<boolean>(true)

	const [isGoalModalOpen, setIsGoalModalOpen] = React.useState<boolean>(false)
	const [isGoalEditModalOpen, setIsGoalEditModalOpen] = React.useState<boolean>(false)
	const [isPastGoalAddModalOpen, setIsPastGoalAddModalOpen] = React.useState<boolean>(false)
	const [isPastGoalEditModalOpen, setIsPastGoalEditModalOpen] = React.useState<boolean>(false)

	const currentYear: number = new Date().getFullYear()
	
	const [selectedEditGoal, setSelectedEditGoal] = React.useState<GoalType | null>(null)
	const [goalList, setGoalList] = React.useState<GoalType[]>([])
	const [currentYearGoal, setCurrentYearGoal] = React.useState<GoalType | null>(null)

	const handleDeleteGoal = () => {
		const confirm = window.confirm(goalMessage.delete.confirm)

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

	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		getGoalList(6)
			.then((goalListData) => {
				setGoalList(goalListData)

				const currentYearGoalOptional = goalListData.find((goal) => goal.year === currentYear)
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
					<AddGoalModal isModalOpen={isGoalModalOpen} setIsModalOpen={setIsGoalModalOpen} setCurrentYearGoal={setCurrentYearGoal} />
					{currentYearGoal != null && (
						<EditGoalModal
							isModalOpen={isGoalEditModalOpen}
							setIsModalOpen={setIsGoalEditModalOpen}
							setCurrentYearGoal={setCurrentYearGoal}
							currentBook={currentYearGoal.current}
							previousGoal={currentYearGoal.goal}
						/>
					)}
					<AddPastGoalModal
						isModalOpen={isPastGoalAddModalOpen}
						setIsModalOpen={setIsPastGoalAddModalOpen}
						goalList={goalList}
						setGoalList={setGoalList}
					/>
					{selectedEditGoal != null && (
						<EditPastGoalModal
							isModalOpen={isPastGoalEditModalOpen}
							setIsModalOpen={setIsPastGoalEditModalOpen}
							selectedGoal={selectedEditGoal}
							goalList={goalList}
							setGoalList={setGoalList}
						/>
					)}

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100' style={{ minHeight: '360px' }}>
							<Card.Body className='h-100'>
								<h2 className='mb-3'>{currentYear}년</h2>

								<div className={currentYearGoal != null ? 'mt-5 mb-5' : ''}>
									{currentYearGoal == null ? (
										<NoContent message={`${currentYear}년 목표가 없어요`} />
									) : (
										<Goal goal={currentYearGoal} />
									)}
								</div>

								<div className='row justify-content-center mb-0' style={{ display: 'relative', bottom: '0px' }}>
									{currentYearGoal == null ? (
										<div className='col-12 col-lg-8'>
											<Button variant='book' className='w-100 mt-2' onClick={() => setIsGoalModalOpen(true)}>
												목표 설정하기
											</Button>
										</div>
									) : (
										<>
											<div className='col-6'>
												<Button variant='book' className='w-100' onClick={() => setIsGoalEditModalOpen(true)}>
													목표 수정하기
												</Button>
											</div>

											<div className='col-6'>
												<Button variant='book-danger' className='w-100' onClick={() => handleDeleteGoal()}>
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
								<h2>목표 분석</h2>

								<div className='mt-4 mb-4 mb-md-0'>
									<NoContent message={`목표 분석은 아직 준비중이에요`} />
								</div>
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 mb-5'>
						<Card style={{ minHeight: '350px' }}>
							<Card.Body>
								<h2 className='mb-4'>과거 목표</h2>

								<AddButton
									size='30'
									color='book'
									onClick={() => {
										setIsPastGoalAddModalOpen(true)
									}}
									right='2%'
								/>

								{goalList.filter((g) => g.year !== new Date().getFullYear()).length === 0 ? (
									<NoContent message='과거 목표가 없어요' />
								) : (
									<div className='row text-center'>
										{goalList
											.filter((goal) => goal.year !== new Date().getFullYear())
											.sort((a, b) => b.year - a.year)
											.map((goal) => {
												return (
													<div className='col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4 mt-2'>
														<Card className='clickable'>
															<Card.Body>
																<div
																	onClick={() => {
																		setSelectedEditGoal(goal)
																		setIsPastGoalEditModalOpen(true)
																	}}
																	style={{ opacity: goal.year === new Date().getFullYear() ? '1' : '0.5' }}>
																	<h3 className='mb-2 mb-md-0'>{`${goal.year}년`}</h3>

																	<img
																		src={goalIcon}
																		alt=''
																		className='img-fluid align-middle'
																		style={{ height: '100px' }}
																	/>

																	<h4 className='mt-3'>{`${goal.current}권 / ${goal.goal}권`}</h4>
																</div>
															</Card.Body>
														</Card>
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

export default GoalRoute
