import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
import NoContent from '../components/common/NoContent'
import Error from '../components/common/Error'
import user from '../user/user'
import utils from '../functions/utils'
import { QnaType } from '../types/QnaType'
import { useLoaderData } from 'react-router-dom'

interface LoaderData {
	myQnaList: QnaType[];
	allQnaList: QnaType[];
}

export async function loader({ params }) {
	// const fetchMyQna = axios.get(`${urls.api.base}/v4/qna/my-qna`).then((res) => res.data)
	// const fetchAllQna = axios.get(`${urls.api.base}/v4/qna/all`).then((res) => res.data)

	const [myQnaList, allQnaList] = await Promise.all([[], []])

	return {
		myQnaList: myQnaList,
		allQnaList: allQnaList,
	}
}

const QnaRoute = () => {
	const { myQnaList, allQnaList } = useLoaderData() as LoaderData

	return (
		<div className='container mt-5 mb-5'>
			<>
				<h2 className='mb-3'>질문과 답변</h2>

				<Card className='mb-4'>
					<Card.Header className='text-white' style={{ background: '#1cb15a' }}>
						<h5>내가 남긴 질문</h5>
					</Card.Header>

					<Card.Body>
						{!user.localStorage.get.isLoggedIn() ? (
							<NoContent message='로그인 해 주세요' />
						) : myQnaList == null || myQnaList.length === 0 ? (
							<NoContent message='내가 남긴 QNA가 없어요' />
						) : (
							<></>
						)}
					</Card.Body>
				</Card>

				<Card className='mb-4'>
					<Card.Header className='text-white border-0' style={{ background: '#1cb15a' }}>
						<h5>다른 사람이 남긴 질문</h5>
					</Card.Header>

					<Card.Body>
						{allQnaList == null ? (
							<Error />
						) : allQnaList.length === 0 ? (
							<NoContent message='QNA가 없어요' />
						) : (
							allQnaList.map((qna) => {
								return (
									<Card className='mt-4'>
										<Card.Header>
											<h5 className='text-center mt-2'>{qna.question}</h5>
										</Card.Header>

										<Card.Body>
											{qna.answer == null ? (
												<NoContent message='아직 답변이 없어요' />
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

				<div className='row justify-content-center mt-5'>
					{(utils.getToken() === '' || typeof utils.getToken() === 'undefined' || utils.getToken() == null) && (
						<div className='col-12 col-md-7 mt-3'>
							<a href='/login' className='w-100'>
								<Button variant='book' className='w-100'>
									로그인하기
								</Button>
							</a>
						</div>
					)}

					<div className='col-12 col-md-7 mt-3'>
						<a href='/faq' className='w-100'>
							<Button variant='secondary' className='w-100'>
								자주 하는 질문 보기
							</Button>
						</a>
					</div>
				</div>
			</>
		</div>
	)
}

export default QnaRoute
