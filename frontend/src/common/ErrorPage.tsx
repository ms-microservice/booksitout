import { useRouteError } from 'react-router-dom'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'

interface ErrorType {
	message: string;
	name: string;
	code: number;
	config: any;
	request: any;
	response: any;
}

const ErrorPage = () => {
    const error = useRouteError() as ErrorType

    return (
		<div className='text-center h-100'>
			<div style={{ marginTop: '250px' }} />

			<ErrorIcon style={{ fontSize: '150px' }} className='text-danger' />
			<h1 className='mt-3'>오류가 났어요!</h1>

			<div className='mt-4' />

			<h6 className='text-secondary'>{error.message}</h6>
		</div>
	)
}

export default ErrorPage