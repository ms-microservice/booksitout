import { useRouteError } from 'react-router-dom'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'

const ErrorPage = () => {
    const error = useRouteError()

    return (
		<div className='text-center h-100'>
			<div style={{ marginTop: '250px' }} />

			<ErrorIcon style={{ fontSize: '150px' }} className='text-book' />

			<h1 className='mt-3'>오류가 났어요!</h1>
		</div>
	)
}

export default ErrorPage