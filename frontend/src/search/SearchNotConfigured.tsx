import { BsFillGearFill as SettingsIcon } from 'react-icons/bs'

const SearchNotConfigured = ({url = '/settings'}) => {
	return (
		<a href={url} className='text-decoration-none text-black' style={{ whiteSpace: 'nowrap' }}>
			<div className='row h-100 d-flex align-items-center text-center'>
				<div className='mb-5'>
					<SettingsIcon style={{ width: '100px', height: '100px' }} className='text-secondary' />

					<h3 className='text-center mt-3 mb-5'>설정에서 검색할 곳을 지정해 주세요</h3>
				</div>
			</div>
		</a>
	)
}

export default SearchNotConfigured
