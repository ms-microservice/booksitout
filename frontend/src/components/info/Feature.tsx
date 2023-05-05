import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import parse from 'html-react-parser'

const Feature = () => {
	useEffect(() => {
		document.title = '모든기능 | 책잇아웃'
	}, [])

	const features = [
		{
			title: '책 관련 기능',
			subtitle: '내가 읽었던, 읽고있는, 읽을 책을 등록하고 관리할 수 있어요',
			description: [
				'오른쪽 아래 <b class="text-book">초록색의 추가 버튼</b>을 눌러 책을 추가할 수 있어요 (로그인 해야 보여요) ',
				'이 책을 <b class="text-book">어디서 얻었는지</b>, <b class="text-book">어떤 형태</b>(종이책, 전자책, 오디오북)인지 기록해 둘 수 있어요',
				'책을 다 읽으면 <b class="text-book">별점</b>을 매기고, <b class="text-book">감상</b>을 쓰고, <b class="text-book">요약</b>을 적을 수 있어요',
				'책을 읽는 도중에 <b class="text-book">메모</b>할 수 있어요',
			],
		},
		{
			title: '독서활동 기록',
			subtitle: '책을 읽을 때 마다 이어서 읽기를 눌러 내 독서시간을 기록할 수 있어요',
			description: [
				'독서활동을 기록해 두면 <b class="text-book">마지막으로 읽은 페이지</b>를 기억하지 않아도 기록이 남아서 편리해요',
				'여태까지의 독서활동을 기반으로 책을 끝낼 때 까지 <b class="text-book">얼마나 남았는지</b>(시간, 분)를 알려줘요',
				'기록된 독서활동을 기반으로 <b class="text-book">통계</b>를 내서 보여줘요',
				'독서활동을 기록하는걸 잊어버려도, 페이지만 입력하면 여태까지의 독서활동을 기반으로 시간을 예측해 줘요',
			],
		},
		{
			title: '통계',
			subtitle: '내가 읽은 책, 독서활동, 검색 기록 등을 바탕으로 통계를 내 줘요',
			description: [
				'1년 동안의 독서활동을 기반으로 매년 <b class="text-book">총 독서시간</b>, <b class="text-book">하루 평균 독서시간</b> 등을 보여줘요',
				'<b class="text-book">독서시간</b>을 그래프로 보여줘요',
				'각 <b class="text-book">장르별</b>로 읽은 책의 비율을 보여줘요',
				'<b class="text-book">목표</b>를 설정해 동기부여할 수 있어요',
			],
		},
		{
			title: '검색',
			subtitle: '다양한 곳에 흩어져 있던 책들을 한 번에 찾을 수 있어요',
			description: [
				'내가 등록한 책을 쉽게 찾을 수 있어요',
				'답답했던 공공 도서관 사이트 대신 <b class="text-book">수도권 모든 도서관의 책</b>을 대신 찾을 수 있어요',
				'<b class="text-book">직접</b> 자주 다니는 도서관을 지정해서 검색하거나, <b class="text-book">지역</b>을 설정해서 검색할 수 있어요',
				'<b class="text-book">전자 도서관</b> 책도 대신 찾을 수 있어요 <br/>(지원되는 도서관은 계속 추가 중이에요)',
				'밀리의 서재, 리디북스 같은 책 <b class="text-book">구독 서비스</b>에서 제공되는 책도 1번의 검색으로 찾을 수 있어요',
			],
		},
		{
			title: '도서관과 더 친해지기 (개발중)',
			subtitle: '도서관과 관련된 다양한 편의기능과 정보를 제공해 줘요',
			description: [
				'<b class="text-book">도서관 회원증</b>을 귀찮게 들고 다닐 필요 없이 저장해 둘 수 있어요 <br/>(책잇아웃, 애플월랫, 삼성페이 지원)',
				'깜빡하고 연체할 일 없게 도서관에서 <b class="text-book">빌린 책들과 반납 일정</b>을 한 번에 관리할 수 있어요',
				'구립도서관? 공립도서관? 서울교육청도서관? 헷갈리는 다양한 <b class="text-book">도서관에 관한 정보</b>를 쉽게 알려줘요',
			],
		},
		{
			title: '읽고 싶은 책 알림받기 (개발중)',
			subtitle: '읽고 싶은 책이 내가 정한 곳에서 새롭게 등록되면 알려줘요',
			description: [
				'주변 <b class="text-book">도서관</b> 신착도서 알림',
				'<b class="text-book">전자 도서관</b> 새로 등록되는 도서 알림',
				'<b class="text-book">구독</b> 서비스 알림 (새로 등록되는 책, 곧 없어지는 책)',
				'<b class="text-book">중고</b> 도서 알림 (알라딘, YES24)',
			],
		},
	]

	return (
		<div className='container-xl'>
			<div className='row'>
				{features.map((feature) => {
					return (
						<div className='col-12 col-md-6 mb-4'>
							<FeatureCard feature={feature} />
						</div>
					)
				})}
			</div>
		</div>
	)
}

const FeatureCard = ({feature}) => {
	return (
		<Card style={{ height: '500px' }}>
			<Card.Body>
				<h3>{feature.title}</h3>
				<p className='text-secondary'>{feature.subtitle}</p>

				<ul className='list-group list-group-flush mt-4'>
					{feature.description.map((des) => {
						return <li className='list-group-item'>{parse(des)}</li>
					})}
				</ul>
			</Card.Body>
		</Card>
	)
}

export default Feature