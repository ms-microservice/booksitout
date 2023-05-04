import logo from '../../resources/images/logo/logo.png'
import { Button } from 'react-bootstrap'

const BookListBoarding = () => {
    return (
		<div className='mt-center container'>
			<div>
				<div className='d-flex justify-content-center'>
					<img src={logo} alt='' className='img-fluid rounded me-3' style={{ width: '50px', height: '50px' }} />
					<h2 className='mt-2 mt-md-1'>책잇아웃, 독서를 더 편하게</h2>
				</div>

				<h3 className='mt-5 text-center'>내 책을 관리하려면 로그인 해 주세요</h3>
				<h5 className='mt-3 text-center text-secondary'>내가 읽고 있는 책, 다 읽은 책을 쉽게 관리하고 남은 독서시간을 예측해줘요</h5>
			</div>

			<div className='row justify-content-center'>
				<div className='col-12 col-md-6 col-xl-4 mt-3'>
					<a href='/login'>
						<Button variant='book' className='w-100'>
							로그인하기
						</Button>
					</a>
				</div>
			</div>

			<div className='row justify-content-center'>
				<div className='col-12 col-md-6 col-xl-4 mt-3'>
					<a href='/introduction/features'>
						<Button variant='secondary' className='w-100'>
							모든 기능 보기
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default BookListBoarding