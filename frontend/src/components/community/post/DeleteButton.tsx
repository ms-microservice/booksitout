import { AiFillMinusCircle as MinusIcon } from 'react-icons/ai'

import '../../../resources/css/hover.css'

const DeleteButton = () => {
	return (
		<div className='clickable hover-8'>
			<MinusIcon className='h2 text-danger' />
		</div>
	)
}

export default DeleteButton
