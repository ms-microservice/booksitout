import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
// Components
import NoContent from '../common/NoContent'
import Error from '../common/Error'
import Loading from '../common/Loading'
// Functions
import { getAllQna, getMyQna } from '../../functions/qna'
import user from '../../functions/user'
// Settings
import uiSettings from '../../settings/ui'
import utils from '../../functions/utils'

const Qna = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)

	const [myQna, setMyQna] = useState(null)
	const [allQnaList, setAllQnaList] = useState([])
	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
			setIsLoading(false)
		}, uiSettings.initalFetchTime)

		// Promise.all(
		// 	getAllQna().then((qnaList) => setAllQnaList([...qnaList])),
		// 	() => {
		// 		if (user.localStorage.get.isLoggedIn) {
		// 			getMyQna().then((myQnaList) => setMyQna(myQnaList))
		// 		}
		// 	}
		// ).finally(() => {
		// 	setIsLoading(false)
		// 	setInitialFetch(false)
		// })
	}, [])

	return (
		<div className='container mt-5 mb-5'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<>
					<h2 className='mb-3'>질문과 답변</h2>

					<Card className='mb-4'>
						<Card.Body>
							<h4 className='text-muted mb-3'>내가 남긴 질문</h4>
							{!user.localStorage.get.isLoggedIn() ? (
								<div className='mt-5'>
									<Error message='내가 남긴 질문을 보려면 로그인 해 주세요' />
								</div>
							) : myQna == null || myQna.length === 0 ? (
								<div className='mt-5 mb-5'>
									<NoContent message='내가 남긴 QNA가 없어요' style={{ width: '100px' }} className='mt-5 mb-5' />
								</div>
							) : (
								<></>
							)}
						</Card.Body>
					</Card>

					<Card className='mb-4'>
						<Card.Body>
							<h4 className='text-muted mb-3'>다른 사람이 남긴 질문</h4>
							{allQnaList == null ? (
								<Error />
							) : allQnaList.length === 0 ? (
								<div className='mt-5 mb-5'>
									<NoContent message='QNA가 없어요' style={{ width: '100px' }} />
								</div>
							) : (
								allQnaList.map((qna) => {
									return (
										<Card className='mt-4'>
											<Card.Header>
												<h5 className='text-center mt-2'>{qna.question}</h5>
											</Card.Header>
											<Card.Body>
												{qna.answer == null ? (
													<div className='mt-3'>
														<NoContent message='아직 답변이 없어요' style={{ width: '100px' }} />
													</div>
												) : (
													parse(qna.answer)
												)}
											</Card.Body>
										</Card>
									)
								})
							)}
						</Card.Body>
					</Card>

					{(utils.getToken() === '' || typeof utils.getToken() === 'undefined' || utils.getToken() == null) && (
						<div className='row justify-content-center mt-5'>
							<div className='col-12 col-lg-6'>
								<a href='/login' className='w-100'>
									<Button variant='book' className='w-100'>
										로그인하기
									</Button>
								</a>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Qna
