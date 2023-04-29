import uiSettings from '../../settings/ui'

const Loading = ({ message = '잠시만 기다려 주세요', textSize = 'h1', mt = '250px', mb='0px' }) => {
	const containerStyle = {
		marginTop: mt,
		marginBottom: mb,
	}

	const spinnerStyle = {
		width: '100px',
		height: '100px',
		color: uiSettings.color.theme,
	}

	return (
		<div className='justify-content-center text-center align-items-center' style={containerStyle}>
			<div className='spinner-grow' role='status' style={spinnerStyle} />
			<div className={`mt-4 ${textSize}`}>{message}</div>
		</div>
	)
}

export default Loading
