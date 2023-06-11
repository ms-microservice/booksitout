import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { HiDocumentText as PostIcon } from 'react-icons/hi'
import { Button } from 'react-bootstrap'

const CommunityFloatingButton = () => {
	const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.user.token)

	const addButtonStyle = {
		right: '2.5%',
		bottom: '90px',

		width: '60px',
		height: '60px',

		zIndex: 5,

		borderRadius: '50px',
	}

	const getNavigateUrl = () => {
		const path = window.location.pathname

		if (path === '/community/post/add') {
			return '/community/gathering/add'
		} else if (path === '/community/gathering/add') {
			return 'community/survey/add'
		} else if (path === '/community/survey/add') {
			return '/community/quiz/add'
		}

		return '/community/post/add'
	}

	const getIsActive = () => {
		const path = window.location.pathname
		const activePath = ['/community/post/add', '/community/gathering/add', '/community/survey/add', '/community/quiz/add']
	
		return activePath.includes(path)
	}

	return (
		<>
			{token !== '' && token !== null && (
				<Button variant='book position-fixed' style={addButtonStyle} active={getIsActive()} onClick={() => navigate(getNavigateUrl())}>
					<PostIcon className='h2 m-0 p-0' />
				</Button>
			)}
		</>
	)
}

export default CommunityFloatingButton
