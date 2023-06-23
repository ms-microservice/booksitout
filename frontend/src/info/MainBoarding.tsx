import { Button, Card } from 'react-bootstrap'

import logo from '../images/logo.png'

const MainBoarding = () => {
	return (
		<Card>
			<Card.Body>
				<div>
					<div className='d-flex justify-content-center'>
						<img src={logo} alt='' className='img-fluid rounded mt-2 me-2' style={{ width: '30px', height: '30px' }} />
						<h3 className='mt-2'>책잇아웃, 독서를 더 편하게</h3>
					</div>

					<h5 className='mt-5 mb-4 text-center force-1-line'>로그인하면 모든 기능을 이용할 수 있어요</h5>
					<p className='text-center text-secondary mb-2'>내 책을 관리하고 독서활동을 기록할 수 있어요</p>
					<p className='text-center text-secondary mb-2'>다양한 곳에서 한 번에 책을 검색할 수 있어요</p>
					<p className='text-center text-secondary'>도서관을 더 편리하게 이용할 수 있어요</p>
				</div>

				<div className='row justify-content-center'>
					<div className='col-12 col-md-6 col-xl-4 mt-2'>
						<a href='/login'>
							<Button variant='book' className='w-100'>
								로그인하기
							</Button>
						</a>
					</div>
				</div>

				<div className='row justify-content-center'>
					<div className='col-12 col-md-6 col-xl-4 mt-2'>
						<a href='/introduction/features'>
							<Button variant='secondary' className='w-100'>
								모든 기능 보기
							</Button>
						</a>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MainBoarding