import { AiFillPlusCircle as AddIcon } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../redux/store'

const FloatingAddButton = ({ bottomStyle = '120px', url = '/book/add' }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const token = useSelector((state: RootState) => state.user.token)

	const addButtonStyle = {
		right: '2.5%',

		width: '60px',
		height: '60px',
		
		borderRadius: '50px',
		bottom: bottomStyle,
	}

	return (
		<>
			{(token !== '' && token !== null) && !location.pathname.startsWith('/book/add') && (
				<AddIcon
					className='btn btn-book z-3 position-fixed'
					style={addButtonStyle}
					onClick={() => {
						navigate(url)
					}}
				/>
			)}
		</>
	)
}

export default FloatingAddButton
