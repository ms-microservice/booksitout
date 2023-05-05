import logo from '../../resources/images/logo/logo.png'
import { Button } from 'react-bootstrap'

const Boarding = ({ title, subtitle }) => {
	return (
		<div className='mt-center container'>
			<div>
				<div className='d-flex justify-content-center'>
					<img src={logo} alt='' className='img-fluid rounded me-3' style={{ width: '50px', height: '50px' }} />
					<h2 className='mt-2 mt-md-1'>책잇아웃, 독서를 더 편하게</h2>
				</div>

				<div style={{ minHeight: '150px' }}>
					<h3 className='mt-5 text-center'>{title}</h3>
					<h5 className='mt-3 text-center text-secondary'>{subtitle}</h5>
				</div>
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
		</div>
	)
}

export default Boarding