import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
// Common
import NoContent from '../common/NoContent'
import Error from '../common/Error'

const Qna = () => {
	const [myQna, setMyQna] = useState(null)
	const [qnaList, setQnaList] = useState([])

	return (
		<div className='container mt-5'>
			<h3>질문과 답변</h3>

			<h4 className='text-muted mt-5 mb-3'>내가 남긴 질문</h4>

			{myQna == null || myQna.length === 0 ? <NoContent message='내가 남긴 QNA가 없어요' style={{ width: '100px' }} /> : <></>}

			<h4 className='text-muted mt-5 mb-3'>다른 사람이 남긴 질문</h4>

			{qnaList == null ? (
				<Error />
			) : qnaList.length == 0 ? (
				<NoContent message='QNA가 없어요' style={{ width: '100px' }} />
			) : (
				qnaList.map((qna) => {
					return (
						<Card className='mt-4'>
							<Card.Header className='text-white' style={{ background: 'rgb(107, 169, 95)' }}>
								{qna.question}
							</Card.Header>
							<Card.Body>{parse(qna.answer)}</Card.Body>
						</Card>
					)
				})
			)}

			<div className='row justify-content-center mt-5'>
				<div className='col-6 col-lg-4'>
					<a href='/login' className='w-100'>
						<Button className='w-100'>로그인하기</Button>
					</a>
				</div>

				<div className='col-6 col-lg-4'>
					<a href='/join' className='w-100'>
						<Button variant='danger' className='w-100'>
							회원가입하기
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Qna
