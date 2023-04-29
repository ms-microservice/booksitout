import React from 'react'
import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
// Images
import startIcon from '../../resources/images/introduction/start.png'
import forgetIcon from '../../resources/images/introduction/forget.png'
import serachIcon from '../../resources/images/introduction/search.png'
import shareIcon from '../../resources/images/introduction/share.png'

const Introduction = () => {
	const data = [
		{
			id: 1,
			image: startIcon,
			title: '내 독서활동 기록하기',
			description: `책을 읽을 때 마다 시작을 눌러, <br/>내 독서활동의 통계 보기.`,
		},
		{
			id: 2,
			image: forgetIcon,
			title: '책 읽으면서 메모하기',
			description: `독서중에 자유롭게,<br/>내 생각 기록하기.`,
		},
		{
			id: 3,
			image: serachIcon,
			title: '한 번에 검색하기',
			description: `
            느려서 답답한 도서관 사이트,
            <br/>
            구독하고 안 쓰는 밀리의 서재,
            <br/>
			흩어져 있는 중고책들,
            <br/>
            <br/>
			책잇아웃이 한 번의 검색으로 찾아요.
            `,
		},
		{
			id: 4,
			image: shareIcon,
			title: '독서활동 공유하기',
			description: `
			열심히 읽은 책,
            <br/>
            쉽게 공유하세요.
            `,
		},
	]

	return (
		<div className='container-xl'>
			<h1 className='text-center'>책에 관한 모든 것, 책잇아웃!</h1>

			<div className='row justify-content-center mt-4 mb-5'>
				<div className='col-11 col-md-6 mb-5'>
					<a href='/login' className='w-100'>
						<Button variant='book' className='w-100'>
							로그인
						</Button>
					</a>
				</div>

				{data.map((intro) => {
					return <div className='col-12'>{intro.id % 2 === 1 ? <LeftCard intro={intro} /> : <RightCard intro={intro} />}</div>
				})}
			</div>
		</div>
	)
}

const LeftCard = ({intro}) => {
	return (
		<Card className='mb-4'>
		<Card.Body>
			<div className='row justify-content-center mb-3'>
				<div className='col-3 col-lg-1'>
					<img src={intro.image} alt='' className='img-fluid' style={{ width: '50px', height: '50px' }} />
				</div>
				<div className='col-9 col-lg-11'>
					<h3 className='mt-2 '>{intro.title}</h3>
				</div>
			</div>

			<h5 className='text-muted'>{parse(intro.description)}</h5>
		</Card.Body>
	</Card>
	)
}

const RightCard = ({intro}) => {
	return (
		<Card className='mb-4'>
			<Card.Body>
				<div className='row justify-content-center mb-3'>
					<div className='col-3 col-lg-1'>
						<img src={intro.image} alt='' className='img-fluid' style={{ width: '50px', height: '50px' }} />
					</div>

					<div className='col-9 col-lg-11'>
						<h3 className='mt-2'>{intro.title}</h3>
					</div>
				</div>

				<h5 className='text-muted'>{parse(intro.description)}</h5>
			</Card.Body>
		</Card>
	)
}

export default Introduction
