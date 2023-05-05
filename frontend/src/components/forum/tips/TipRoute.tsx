import { useState } from 'react'
import { ButtonGroup, Card, ToggleButton } from 'react-bootstrap'

import TipPost from './Tip'
import TipPostDetailListGroup from './TipPostDetailListGroup'
import { useParams } from 'react-router-dom'

const TipsRoute = () => {
	const { range } = useParams()
	
	const [tipPost, setTipPost] = useState<TipPost[]>([])

    return (
		<div className='container-xl'>
			<Card style={{ minHeight: '200px' }} className='mb-4'>
				<Card.Body>
					<h2>책잇아웃 꿀팁</h2>

					<h5 className='text-secondary'>책잇아웃을 더 편리하게 이용하기 위한 꿀팁을 얻어 갈 수 있어요</h5>

					<ButtonGroup className='w-100 mt-4'>
						<a href='/introduction/tips/all' className='w-100'>
							<ToggleButton variant={range === 'all' ? 'book' : 'light'} type='radio' className='w-100' value='all'>
								전체
							</ToggleButton>
						</a>

						<a href='/introduction/tips/native' className='w-100'>
							<ToggleButton variant={range === 'native' ? 'book' : 'light'} type='radio' className='w-100' value='native'>
								책잇아웃 내
							</ToggleButton>
						</a>

						<a href='/introduction/tips/integration' className='w-100'>
							<ToggleButton variant={range === 'integration' ? 'book' : 'light'} type='radio' className='w-100' value='integration'>
								연동
							</ToggleButton>
						</a>
					</ButtonGroup>

					<ButtonGroup className='w-100 mt-1'>
						<a href='/introduction/tips/library' className='w-100'>
							<ToggleButton variant={range === 'library' ? 'book' : 'light'} type='radio' className='w-100' value='library'>
								도서관
							</ToggleButton>
						</a>

						<a href='/introduction/tips/search' className='w-100'>
							<ToggleButton variant={range === 'search' ? 'book' : 'light'} type='radio' className='w-100' value='search'>
								검색
							</ToggleButton>
						</a>

						<a href='/introduction/tips/forum' className='w-100 force-1-line'>
							<ToggleButton variant={range === 'forum' ? 'book' : 'light'} type='radio' className='w-100' value='forum'>
								커뮤니티
							</ToggleButton>
						</a>
					</ButtonGroup>
				</Card.Body>
			</Card>

			<TipPostDetailListGroup postList={tipPost} />
		</div>
	)
}

export default TipsRoute