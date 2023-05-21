import { useRouteError } from 'react-router-dom'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'

const ErrorPage = () => {
    const error = useRouteError()

    return (
		<div className='text-center text-book h-100'>
			<div style={{ marginTop: '300px' }} />

			<ErrorIcon style={{ fontSize: '100px' }} />

			<h1 className='mt-4'>오류가 났어요!</h1>
		</div>
	)
}

export default ErrorPage