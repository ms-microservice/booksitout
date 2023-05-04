import logo from '../../resources/images/logo/logo.png'

const ForumMain = () => {
  return (
		<div className='mt-center'>
			<div>
				<div className='d-flex justify-content-center'>
					<img src={logo} alt='' className='img-fluid rounded me-3' style={{ width: '50px', height: '50px' }} />
					<h2 className='mt-2 mt-md-1'>책잇아웃, 독서를 더 편하게</h2>
				</div>

				<h3 className='mt-5 text-center'>커뮤니티는 아직 준비하고 있어요</h3>
			</div>
		</div>
  )
}

export default ForumMain