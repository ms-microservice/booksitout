import React from 'react'
import toast from 'react-hot-toast'
import { Modal, Form, Button } from 'react-bootstrap'

import { addReadingSession } from '../../../functions/reading'
import date from '../../../functions/date'
import '../../../resources/css/input.css'

const AddReadingSessionModal = ({ isModalOpen, setIsModalOpen, book, setBook, readingSessionList, setReadingSessionList }) => {
	const [year, setYear] = React.useState(new Date().getFullYear())
	const [month, setMonth] = React.useState(new Date().getMonth() + (1 % 12))
	const [day, setDay] = React.useState(new Date().getDate())

	const currentYear = new Date().getFullYear()
	const currentMonth = new Date().getMonth() + 1
	const currentDay = new Date().getDate()

	const [yearArray, setYearArray] = React.useState<number[]>(Array.from({ length: 5 }, (_, i) => i + (new Date().getFullYear() - 5 + 1)).reverse())
	const [monthArray, setMonthArray] = React.useState<number[]>([])
	const [dayArray, setDayArray] = React.useState<number[]>([])
	
	const [endPage, setEndPage] = React.useState<number | null>()
	const [readTime, setReadTime] = React.useState<number | null>()

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

	const getStartPage = () => {
		return book.currentPage === 0 ? 0 : Number(book.currentPage) + 1
	}

	const handleAddReadingSession = (e) => {
		e.preventDefault()

		if (endPage == null || endPage === 0) {
			document.getElementById('end-page-input')!!.focus()
			toast.error('끝 페이지를 입력해 주세요')
			return
		}

		if (readTime == null  || readTime === 0) {
			document.getElementById('read-time-input')!!.focus()
			toast.error('독서 활동 시간을 입력해 주세요')
			return
		}

		if (Number(endPage) <= book.currentPage) {
			document.getElementById('end-page-input')!!.focus()
			toast.error('독서활동의 끝 페이지는 그 전 독서활동 페이지보다 작을 수 없어요')
			return
		}

		if (Number(readTime) === 0) {
			document.getElementById('read-time-input')!!.focus()
			toast.error('독서활동은 적어도 1분은 읽어야 추가할 수 있어요')
			return
		}

		const readingSession = {
			startDate: `${year}-${(month.toString().length === 1 ? '0' : '') + month}-${(day.toString().length === 1 ? '0' : '') + day}`,
			startPage: getStartPage(),
			endPage: endPage,
			readTime: readTime,
		}
		addReadingSession(book.bookId, readingSession)
			.then((success) => {
				if (success) {
					setReadingSessionList([
						...readingSessionList,
						{
							startPage: getStartPage(),
							endPage: endPage,
							startTime: `${year}-${month}-${day}T`,
							endTime: `${year}-${month}-${day}T`,
							readTime: readTime,
						},
					])

					setBook({ ...book, currentPage: endPage })
					setIsModalOpen(false)
					toast.success('독서활동을 직접 추가했어요')
				}
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

	const predictReadtime = () => {
		if (readingSessionList.length === 0) {
			toast.error('그 전 독서활동이 없어서 예측할 수 없어요')
			document.getElementById('read-time-input')!!.focus()
			return
		}

		if (endPage ?? 0 <= book.currentPage) {
			toast.error('독서활동의 끝 페이지는 그 전 독서활동 페이지보다 작을 수 없어요')
			document.getElementById('end-page-input')!!.focus()
			return
		}

		if (endPage ?? 0 > book.endPage) {
			toast.error('독서활동의 끝 페이지는 책의 마지막 페이지보다 클 수 없어요')
			document.getElementById('end-page-input')!!.focus()
			return
		}

		const totalReadTime = readingSessionList.reduce((acc, cur) => acc + cur.readTime, 0)
		const averageReadTimePerPage = totalReadTime / book.currentPage
		const readPage = endPage ?? 0 - book.currentPage

		setReadTime(Math.round(averageReadTimePerPage * readPage))
		toast.success('그 전 독서활동을 바탕으로 예측했어요')
		document.getElementById('read-time-input')!!.blur()
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down' centered>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>독서 활동 직접 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddReadingSession(e)}>
					<Form.Label>🗓️ 날짜</Form.Label>
					<div className='row'>
						<div className='col-4'>
							<Form.Select className='mb-2' value={year} onChange={(e) => setYear(Number(e.target.value))}>
								{yearArray.map((yearValue) => {
									return <option value={yearValue}>{yearValue.toString().substring(2)}년</option>
								})}
							</Form.Select>
						</div>

						<div className='col-4'>
							<Form.Select className='mb-2' value={month} onChange={(e) => setMonth(Number(e.target.value))}>
								{monthArray.map((monthValue) => {
									return <option value={monthValue}>{monthValue}월</option>
								})}
							</Form.Select>
						</div>

						<div className='col-4'>
							<Form.Select className='mb-2' value={day} onChange={(e) => setDay(Number(e.target.value))}>
								{dayArray.map((dayValue) => {
									return <option value={dayValue}>{dayValue}일</option>
								})}
							</Form.Select>
						</div>
					</div>

					<Form.Label>시작 페이지</Form.Label>
					<Form.Control className='mb-2' type='number' value={getStartPage()} disabled />

					<Form.Label>끝 페이지</Form.Label>
					<Form.Control
						className='mb-2'
						type='number'
						inputMode='numeric'
						pattern='[0-9]*'
						onChange={(e) => setEndPage(Number(e.target.value))}
						autoFocus
						id='end-page-input'
					/>

					<Form.Label>⏰ 시간 (분)</Form.Label>

					<div className='row'>
						<div className='col-6 col-md-7'>
							<Form.Control
								className='mb-2'
								type='number'
								inputMode='numeric'
								pattern='[0-9]*'
								autoComplete='off'
								onChange={(e) => setReadTime(Number(e.target.value))}
								id='read-time-input'
								value={readTime ?? 0}
							/>
						</div>

						<div className='col-6 col-md-5'>
							<Button variant='book' disabled={endPage == null} onClick={() => predictReadtime()} className='w-100'>
								페이지로 예측하기
							</Button>
						</div>
					</div>

					<div className='row mt-2'>
						<div className='col-12 col-md-6'>
							<Button variant='book-danger' className='w-100 mt-2' onClick={() => setIsModalOpen(false)}>
								취소
							</Button>
						</div>

						<div className='col-12 col-md-6'>
							<Button variant='book' type='submit' className='w-100 mt-2'>
								추가하기
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddReadingSessionModal
