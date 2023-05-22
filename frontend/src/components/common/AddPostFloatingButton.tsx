import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import { HiDocumentText as PostIcon } from 'react-icons/hi'

const FloatingAddPostButton = () => {
	const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.user.token)

	const addButtonStyle = {
		right: '2.5%',
		bottom: '100px',

		width: '60px',
		height: '60px',

		borderRadius: '50px',
	}

	return (
		<>
			{token !== '' && token !== null && (
				<>
						<PostIcon className='btn btn-book z- position-fixed' style={addButtonStyle} onClick={() => navigate('/community/post/add')} />
				</>
			)}
		</>
	)
}

export default FloatingAddPostButton
