import errorImage from '../../resources/images/common/error.png'

const NoContent = ({ message = '텅 비어 있어요', icon = errorImage, style = { width: '250px' } }) => {
	return (
		<div>
			<div className='row justify-content-center'>
				<img src={icon} alt='' className='img-fluid mt-5' style={style} />

				<div className='h2 text-center mt-4' style={{ whiteSpace: 'nowrap' }}>
					{message}
				</div>
			</div>
		</div>
	)
}

export default NoContent
