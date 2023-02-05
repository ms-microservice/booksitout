import React from 'react'
import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
import utils from '../../functions/utils';

const Faq = () => {
	const faqList = [
		{
			id: 1,
			question: `책잇아웃이 뭐하는 서비스인가요?`,
			answer: `
            책잇아웃은 책을 읽으며 겪는 불편함과 기록하고 싶은 욕망을 해소해 주기 위한 다양한 기능이 있어요.
            <br/>
            내가 읽은 책 관리, 내 독서활동 기록, 읽고 싶은 책 여러 곳에서 한 번에 검색, 책 추천, 독서활동 통계 등의 서비스를 제공하고 있어요.
            `,
		},
		{
			id: 2,
			question: `책잇아웃 이름의 유래가 뭔가요?`,
			answer: `
            영어표현 "Check it out!"을 알고 계신가요? 
            <br/>
            무언가를 권할 때 쓰는 말인데, 영어표현 Check과 한국어 책의 발음이 비슷한 것에 착안해서, 독서를 권하는 마음을 담았어요.`,
		},
		{
			id: 3,
			question: `버그를 발견했어요. 어떻게 해야 하나요?`,
			answer: `
				불편을 끼쳐드려서 죄송해요. 버그는 아래 이메일 주소로 제보해 주시면 최대한 빨리 고칠게요.
				<br/>
				<b>jinkyumpark@naver.com</b>
			`,
		},
		{
			id: 4,
			question: `내가 읽은 책을 공유할 수는 없나요?`,
			answer: `책 공유 기능은 아직 없어요. 하지만 곧 추가 예정이니 기대해 주세요!`,
		},
	]

	return (
		<div className='container mt-5 mb-5'>
			<h3>자주 묻는 질문</h3>

			{faqList.map((faq) => {
				return (
					<Card className='mt-4'>
						<Card.Header className='text-white' style={{ background: 'rgb(107, 169, 95)' }}>
							{faq.question}
						</Card.Header>

						<Card.Body>{parse(faq.answer)}</Card.Body>
					</Card>
				)
			})}

			<div className='row justify-content-center mt-5'>
				{(utils.getToken() === '' || typeof utils.getToken() === 'undefined' || utils.getToken() == null) && (
					<div className='col-12 col-lg-7 mt-3'>
						<a href='/login' className='w-100'>
							<Button variant='success' className='w-100'>
								로그인하기
							</Button>
						</a>
					</div>
				)}

				<div className='col-12 col-lg-7 mt-3'>
					<a href='/qna' className='w-100'>
						<Button variant='warning' className='w-100'>
							직접 질문하기
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Faq
