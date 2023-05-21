import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import { BsBookHalf as BookIcon } from 'react-icons/bs'

const FloatingAddBookButton = ({ url = '/book/add' }) => {
	const navigate = useNavigate()

	const token = useSelector((state: RootState) => state.user.token)

	const addButtonStyle = {
		right: '30px',
		bottom: '30px',

		width: '60px',
		height: '60px',

		borderRadius: '50px',
	}

	return (
		<>
			{token !== '' && token !== null && (
				<>
					<BookIcon className='btn btn-book z- position-fixed' style={addButtonStyle} onClick={() => navigate(url)} />
				</>
			)}
		</>
	)
}

export default FloatingAddBookButton
