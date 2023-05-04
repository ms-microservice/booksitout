import errorImage from '../../resources/images/common/error.png'
import { VscError as XMarkIcon } from 'react-icons/vsc'

const NoContent = ({ 
	mt = '', mb = '25px', 
	message = '텅 비어 있어요', textSize='h4',
	icon = errorImage, imageSize = '250px', useImage = true,
	iconSize='6em'
}) => {
	return (
		<div className='row d-flex h-100 justify-content-center align-items-center' style={{ overflowX: 'hidden' }}>
			<div className='text-center' style={{ marginTop: mt, marginBottom: mb }}>
				{useImage ? (
					<img src={icon} alt='' style={{ width: imageSize }} className='img-fluid mt-3' />
				) : (
					<XMarkIcon className='text-book' style={{ width: imageSize }} size={iconSize} />
				)}

				<div className={`${textSize} mt-3`} style={{ whiteSpace: 'nowrap' }}>
					{message}
				</div>
			</div>
		</div>
	)
}

export default NoContent
