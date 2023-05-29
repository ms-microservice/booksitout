import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'

const Error = ({ 
	mt = '30px', mb = '30px', 
	message = '서버에 오류가 났어요', color = 'text-danger', 
	iconStyle = { width: '100px', height: '100px' } 
}) => {

	return (
		<div className='row d-flex h-100 justify-content-center align-items-center'>
			<div className='text-center' style={{marginTop: mt, marginBottom: mb}}>
				<ErrorIcon className={color} style={iconStyle} />
				<h3 className='mt-3'>{message}</h3>
			</div>
		</div>
	)
}

export default Error
