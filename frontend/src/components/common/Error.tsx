import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'

const Error = ({ message = '서버에 오류가 났어요', color = 'text-danger', iconSize = 100, move = 60, mt = 0 }) => {
	const iconStyle = { width: `${iconSize}px`, height: `${iconSize}px` }

	return (
		<div className='h-100 d-flex justify-content-center align-items-center' style={{ transform: `translateY(-${move}px)`, marginTop: `${mt}px` }}>
			<div className='row justify-content-center'>
				<ErrorIcon className={`${color} m-0`} style={iconStyle} />
				<h3 className='text-center'>{message}</h3>
			</div>
		</div>
	)
}

export default Error
