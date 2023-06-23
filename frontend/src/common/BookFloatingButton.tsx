import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import { MdAddCircle as BookIcon } from 'react-icons/md'
import { Button } from 'react-bootstrap'

const BookFloatingButton = () => {
	const navigate = useNavigate()

	const token = useSelector((state: RootState) => state.user.token)

	const addButtonStyle = {
		right: '30px',
		bottom: '30px',

		width: '60px',
		height: '60px',

		borderRadius: '50px',
		zIndex: '5',
	}

	const getNavigateUrl = () => {
		const path = window.location.pathname

		if (path === '/add/book/search') {
			return '/add/post'
		}

		if (path === '/add/post' || path === '/add/gathering') {
			return '/add/membership/image'
		}

		return '/add/book/search'
	}

	const getIsActive = () => {
		const path = window.location.pathname
		return path.startsWith('/book/add')
	}

	return (
		<>
			{token !== '' && token !== null && (
				<Button
					variant='book'
					active={getIsActive()}
					className='position-fixed'
					style={addButtonStyle}
					onClick={() => navigate(getNavigateUrl())}>
					<BookIcon className='h2 p-0 m-0' />
				</Button>
			)}
		</>
	)
}

export default BookFloatingButton
