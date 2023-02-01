import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

const NoSearchResult = () => {
	const { query } = useParams()

	return (
		<div className='row justify-content-center w-100 h-100 mt-3'>
			<ErrorIcon style={{ width: '100px', height: '100px', color: 'rgb(123, 185, 114)' }} />

			<h3 className='text-center'>
				<b>{query}</b>에 대한 검색 결과가 없어요
			</h3>
		</div>
	)
}

export default NoSearchResult
