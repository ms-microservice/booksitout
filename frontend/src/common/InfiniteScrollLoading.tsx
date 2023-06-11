import uiSettings from '../settings/ui'

const InfiniteScrollLoading = () => {
	const spinnerStyle = {
		width: '100px',
		height: '100px',
		color: uiSettings.color.theme,
	}

	return (
		<div className='mt-5 mb-5 text-center'>
			<div className='spinner-grow' role='status' style={spinnerStyle} />
		</div>
	)
}

export default InfiniteScrollLoading
