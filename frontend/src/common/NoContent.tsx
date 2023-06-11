import { VscError as XMarkIcon } from 'react-icons/vsc'

const NoContent = ({ message = '텅 비어 있어요', textSize = 4, iconSize = 6, mBetween = 3, move = 60, mt=0 }) => {
	return (
		<div className='h-100 d-flex justify-content-center align-items-center' style={{ paddingTop: `${move * -1}px)` }}>
			<div className='text-center w-100' style={{ marginTop: `${mt}px` }}>
				<XMarkIcon className='text-book' size={`${iconSize}em`} />

				<div className={`h${textSize} mt-${mBetween}`} style={{ whiteSpace: 'nowrap' }}>
					{message}
				</div>
			</div>
		</div>
	)
}

export default NoContent
