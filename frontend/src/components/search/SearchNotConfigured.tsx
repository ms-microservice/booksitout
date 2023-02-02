import { BsFillGearFill as SettingsIcon } from 'react-icons/bs'

const SearchNotConfigured = () => {
	return (
		<a href='/settings' className='text-decoration-none text-black'>
			<div className='row h-100 d-flex align-items-center text-center'>
				<div className='mb-5'>
					<SettingsIcon style={{ width: '100px', height: '100px' }} className='text-secondary' />

					<h3 className='text-center mt-3 mb-5'>설정에서 검색할 곳을 설정해 주세요</h3>
				</div>
			</div>
		</a>
	)
}

export default SearchNotConfigured
