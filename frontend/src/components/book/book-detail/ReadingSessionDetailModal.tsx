import React from 'react'
import toast from 'react-hot-toast'
import { Modal, Button, Form } from 'react-bootstrap'

import { deleteReadingSession, editReadingSession } from '../../../functions/reading'

import date from '../../../functions/date'
import '../../../resources/css/input.css'

const ReadingSessionDetailModal = ({
	isModalOpen,
	setIsModalOpen,
	readingSession,
	setReadingSession,
	readingSessionList,
	setReadingSessionList,
	book,
	setBook,
}) => {
	
	const currentYear = new Date().getFullYear()
	const currentMonth = new Date().getMonth() + 1
	const currentDay = new Date().getDate()

	const [year, setYear] = React.useState(currentYear)
	const [month, setMonth] = React.useState(currentMonth)
	const [day, setDay] = React.useState(currentDay)

	const [yearArray, setYearArray] = React.useState<number[]>(Array.from({ length: 5 }, (_, i) => i + (new Date().getFullYear() - 5 + 1)).reverse())
	const [monthArray, setMonthArray] = React.useState<number[]>([])
	const [dayArray, setDayArray] = React.useState<number[]>([])

	const [isEditMode, setIsEditMode] = React.useState(false)

	const [readTime, setReadTime] = React.useState(0)
	const [endPage, setEndPage] = React.useState(0)

	React.useEffect(() => {
		if (year === currentYear && month === currentMonth) {
			setDayArray(Array.from({length: currentDay}, (_, i) => i + 1))
		} else {
			setDayArray(Array.from({ length: date.getDayCountOfMonth(year, month) }, (_, i) => i + 1))
		}

		if (year === currentYear) {
			setMonthArray(Array.from({ length: currentMonth }, (_, i) => i + 1))
		} else {
			setMonthArray(Array.from({ length: 12 }, (_, i) => i + 1))
		}

	}, [year, month, day])

	const isReadingSessionManuallyAdded = (time) => {
		if (time.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null) {
			return false
		} else {
			return true
		}
	}
	
	const getDate = (time) => {
		const timeString = time.substring(0, time.indexOf('T'))
		const year = timeString.substring(0, timeString.indexOf('-'))
		const month = timeString.substring(timeString.indexOf('-') + 1, timeString.lastIndexOf('-'))
		const day = timeString.substring(timeString.lastIndexOf('-') + 1)

		return [year, month, day]
	}

	const handleEditReadingSession = (e) => {
		e.preventDefault()

		if (
			(year == null && month == null && day == null && readTime == null && endPage == null) ||
			(readTime === readingSession.readTime && endPage === readingSession.endPage)
		) {
			toast.error('수정사항이 없어요')
			return
		}

		const editedReadingSession = {
			startTime: readingSession.startTime,
			endTime: readingSession.endTime,
			readTime: readTime === readingSession.readTime ? null : readTime,
			endPage: endPage === readingSession.endPage ? null : endPage,
		}

		editReadingSession(readingSession.readingSessionId, editedReadingSession).then((res) => {
			if (res) {
				toast.success('독서활동을 수정했어요')
				setReadingSession(editedReadingSession)
				setReadingSessionList(
					readingSessionList.map((r) => {
						if (r.readingSessionId === readingSession.readingSessionId) {
							return {
								...r,
								readingSessionId: r.readingSessionId,
								readTime: readTime == null ? r.readTime : readTime,
								endPage: endPage == null ? r.endPage : endPage,
							}
						} else {
							return r
						}
					})
				)
				setIsModalOpen(false)
			} else {
				// toast.error(res.message)
			}
		})
	}

	const handleDeleteReadingSession = () => {
		if (book.currentPage !== readingSession.endPage) {
			toast.error('가장 최근의 독서활동만 지울 수 있어요')
			return
		}

		const confirm = window.confirm('이 독서활동을 지울까요?')

		if (confirm) {
			deleteReadingSession(readingSession.readingSessionId).then((success) => {
				if (success) {
					toast.success('독서활동을 지웠어요')
					setReadingSessionList(readingSessionList.filter((reading) => reading.readingSessionId !== readingSession.readingSessionId))
					setBook({ ...book, currentPage: readingSession.startPage - 1 })
					setIsModalOpen(false)
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal
			show={isModalOpen}
			onHide={() => {
				setIsModalOpen(false)
				setIsEditMode(false)
			}}
			fullscreen='md-down'
			size={'lg'}
			centered>
			<Modal.Header closeButton className='text-center'>
				{isEditMode ? <h4 className='w-100'>독서활동 수정하기</h4> : <h4 className='w-100'>독서활동 자세히 보기</h4>}
			</Modal.Header>

			{readingSession != null && (
				<Modal.Body>
					<div className='row'>
						{isEditMode ? (
							<>
								<Form onSubmit={(e) => handleEditReadingSession(e)}>
									{isReadingSessionManuallyAdded(readingSession.endTime) ? (
										<div className='row text-center'>
											<div className='col-12 col-md-3 mt-1'>🗓️ 독서날짜</div>
											<div className='col-12 col-md-9 mt-3 mb-3 mt-md-0 mb-md-0'>
												<div className='row'>
													<div className='col-4'>
														<Form.Select className='mb-2' onChange={(e) => setYear(Number(e.target.value))}>
															{yearArray.map((year) => {
																return (
																	<option value={year} selected={year == getDate(readingSession.startTime)[0]}>
																		{year}년
																	</option>
																)
															})}
														</Form.Select>
													</div>

													<div className='col-4'>
														<Form.Select className='mb-2' onChange={(e) => setMonth(Number(e.target.value))}>
															{monthArray.map((month) => {
																return (
																	<option
																		value={month}
																		selected={
																			month == getDate(readingSession.startTime)[1]
																		}>{`${month}월`}</option>
																)
															})}
														</Form.Select>
													</div>

													<div className='col-4'>
														<Form.Select className='mb-2' onChange={(e) => setDay(Number(e.target.value))}>
															{dayArray.map((day) => {
																return (
																	<option
																		value={day}
																		selected={getDate(readingSession.startTime)[2] == day}>{`${day}일`}</option>
																)
															})}
														</Form.Select>
													</div>
												</div>
											</div>
										</div>
									) : (
										<>
											<div className='row text-center'>
												<div className='col-12 col-md-3 mt-1'>🗓️ 시작시간</div>

												<div className='col-12 col-md-9'>
													<div className='row mb-2 mt-2 mt-md-0'>
														<div className='col-4'>
															<Form.Select className='mb-2' onChange={(e) => setYear(Number(e.target.value))}>
																{yearArray.map((year) => {
																	return (
																		<option value={year} selected={year == getDate(readingSession.startTime)[0]}>
																			{year}년
																		</option>
																	)
																})}
															</Form.Select>
														</div>

														<div className='col-4'>
															<Form.Select className='w-100' defaultValue={readingSession.readTime}>
																{monthArray.map((month) => {
																	return (
																		<option
																			value={month}
																			selected={
																				month === getDate(readingSession.startTime)[1]
																			}>{`${month}월`}</option>
																	)
																})}
															</Form.Select>
														</div>

														<div className='col-4'>
															<Form.Select className='w-100' defaultValue={readingSession.readTime}>
																{dayArray.map((day) => {
																	return (
																		<option
																			value={day}
																			selected={
																				getDate(readingSession.startTime)[2] === day
																			}>{`${day}일`}</option>
																	)
																})}
															</Form.Select>
														</div>
													</div>
												</div>
											</div>

											<div className='row text-center mb-2 mb-md-0'>
												<div className='col-12 col-md-3 mt-1'>🗓️ 종료시간</div>

												<div className='col-12 col-md-9'>
													<div className='row mt-2 mt-md-0'>
														<div className='col-4'>
															<Form.Select
																className='mb-2'
																onChange={(e) => setYear(Number(e.target.value))}
																defaultValue={getDate(readingSession.startTime)[0]}>
																{Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear() - 9)
																	.reverse()
																	.map((year) => {
																		return <option value={year}>{year}년</option>
																	})}
															</Form.Select>
														</div>

														<div className='col-4'>
															<Form.Select
																className='w-100'
																defaultValue={Number(readingSession.endTime.split('-')[1])}>
																{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
																	return <option value={month}>{`${month}월`}</option>
																})}
															</Form.Select>
														</div>

														<div className='col-4'>
															<Form.Select
																className='w-100'
																defaultValue={Number(readingSession.endTime.split('-')[2])}>
																{Array.from(
																	{
																		length: date.getDayCountOfMonth(
																			readingSession.endTime.split('-')[0],
																			readingSession.endTime.split('-')[1]
																		),
																	},
																	(_, i) => i + 1
																).map((day) => {
																	return <option value={day}>{`${day}일`}</option>
																})}
															</Form.Select>
														</div>
													</div>
												</div>
											</div>
										</>
									)}

									<div className='row text-center'>
										<div className='col-6 col-md-3 mt-1'>⌛️ 독서시간</div>

										<div className='col-6 col-md-9'>
											<Form.Control
												className='mb-2'
												type='number'
												inputMode='numeric'
												pattern='[0-9]*'
												defaultValue={readingSession.readTime}
												autoComplete='off'
												onChange={(e) => setReadTime(Number(e.target.value))}
											/>
										</div>
									</div>

									<div className='row text-center'>
										<div className='col-6 col-md-3 mt-1'>📃 시작 페이지</div>

										<div className='col-6 col-md-9'>
											<Form.Control className='mb-2' type='number' disabled defaultValue={readingSession.startPage} />
										</div>
									</div>

									<div className='row text-center'>
										<div className='col-6 col-md-3 mt-1'>📃 끝 페이지</div>

										<div className='col-6 col-md-9'>
											<Form.Control
												className='mb-2'
												type='number'
												inputMode='numeric'
												pattern='[0-9]*'
												autoComplete='off'
												defaultValue={readingSession.endPage}
												onChange={(e) => setEndPage(Number(e.target.value))}
											/>
										</div>
									</div>

									<div className='row'>
										<div className='col-12 col-md-6 mt-2' onClick={() => setIsEditMode(false)}>
											<Button variant='book-danger' className='w-100'>
												수정취소
											</Button>
										</div>

										<div className='col-12 col-md-6 mt-2'>
											<Button variant='book' type='submit' className='w-100'>
												수정완료
											</Button>
										</div>
									</div>
								</Form>
							</>
						) : (
							<ReadingSessionInfo readingSession={readingSession} />
						)}
					</div>

					{!isEditMode && (
						<div className='row'>
							<div className='col-6'>
								<Button variant='book' className='w-100' onClick={() => setIsEditMode(!isEditMode)}>
									수정하기
								</Button>
							</div>

							<div className='col-6' onClick={() => handleDeleteReadingSession()}>
								<Button variant='book-danger' className='w-100'>
									삭제하기
								</Button>
							</div>
						</div>
					)}
				</Modal.Body>
			)}
		</Modal>
	)
}

const ReadingSessionInfo = ({ readingSession }) => {
	return (
		<>
			<h5 className='mb-3'>
				🗓️{' '}
				{readingSession.endTime.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null
					? readingSession.startTime
							.replace('-', '년 ')
							.replace('-', '월 ')
							.replace('T', '일 ')
							.replace(':', '시 ')
							.replace(':', '분 ')
							.substring(0, 21)
					: readingSession.startTime
							.replace('-', '년 ')
							.replace('-', '월 ')
							.replace('T', '일 ')
							.replace(':', '시 ')
							.replace(':', '분 ')
							.substring(0, 14)}
				{readingSession.endTime.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null ? ' 부터' : ''}
			</h5>
			{readingSession.endTime.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null && (
				<h5 className='mb-3'>
					🗓️{' '}
					{readingSession.endTime
						.replace('-', '년 ')
						.replace('-', '월 ')
						.replace('T', '일 ')
						.replace(':', '시 ')
						.replace(':', '분 ')
						.substring(0, 21)}{' '}
					까지
				</h5>
			)}

			<h5 className='mb-3'>⌛️ {readingSession.readTime}분 동안</h5>
			<h5 className='mb-3'>
				📃 {readingSession.startPage}P 부터 {readingSession.endPage}P 까지
			</h5>
			<h5 className='mb-3'>📃 {readingSession.endPage - readingSession.startPage + 1}P 읽었어요</h5>
		</>
	)
}

export default ReadingSessionDetailModal
