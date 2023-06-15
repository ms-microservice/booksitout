import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import uiSettings from '../settings/ui'

const NoSearchResult = () => {
	return (
		<div className='row h-100 d-flex align-items-center text-center'>
			<div className='mb-5'>
				<ErrorIcon style={{ width: '100px', height: '100px', color: uiSettings.color.theme }} />

				<h3 className='text-center mt-3 mb-5'>
					검색 결과가 없어요
					<br/>
				</h3>
			</div>
		</div>
	)
}

export default NoSearchResult
