import logo from '../../resources/images/logo/logo.png'

const Preparing = ({message}) => {
    return (
		<div className='mt-center'>
			<div>
				<div className='d-flex justify-content-center'>
					<img src={logo} alt='' className='img-fluid rounded me-3' style={{ width: '50px', height: '50px' }} />
					<h2 className='mt-2 mt-md-1'>책잇아웃, 독서를 더 편하게</h2>
				</div>

				<h3 className='mt-5 text-center'>{message}</h3>
			</div>
		</div>
	)
}

export default Preparing