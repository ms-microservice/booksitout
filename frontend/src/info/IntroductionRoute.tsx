import parse from 'html-react-parser'

import { Card, Button } from 'react-bootstrap'
import { introductionData } from './introductionData'


const IntroductionRoute = () => {
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

				{introductionData.map((intro) => {
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

export default IntroductionRoute
