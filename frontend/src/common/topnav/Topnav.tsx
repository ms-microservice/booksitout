import React from 'react'
import toast from 'react-hot-toast'

import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Card } from 'react-bootstrap'

import user from '../../user/user'
import messages from '../../settings/messages'

import uiSettings from '../../settings/ui'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsLogin, logoutToken } from '../../redux/userSlice'
import { RootState } from '../../redux/store'

import '../../resources/css/button.css'
import '../../resources/css/topnav.css'
import './topnav.scss'

import TopnavSearchBar from './TopnavSearchBar'
import TopnavDropdown from './TopnavDropdown'
import TopnavLogo from './TopnavLogo'
import TopnavNav from './TopnavNav'
import booksitoutIcon from '../icons/booksitoutIcon';

const Topnav = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	
	const isLogin = useSelector((state: RootState) => state.user.isLogin)
	const expand = uiSettings.topnav.collapse

	const [expanded, setExpanded] = React.useState<boolean>(false)
	const [showSearchBar, setShowSearchBar] = React.useState<boolean>(false)
	const [autoFocus, setAutoFocus] = React.useState<boolean>(false)
	const [initialLoad, setInitialLoad] = React.useState<boolean>(true)

	const handleLogout = (e) => {
		e.preventDefault()

		if (!user.localStorage.get.logoutPossible()) {
			toast.error(messages.user.logout.fail.readingInProgress)
			return
		}

		localStorage.clear()
		localStorage.removeItem('login-token')
		dispatch(logoutToken())
		setExpanded(false)
		dispatch(checkIsLogin())
		toast.success(messages.user.logout.success)
		navigate('/')
	}

	React.useEffect(() => {
		setExpanded(false)
		setShowSearchBar(false)
		setAutoFocus(false)
	}, [location.pathname])

	React.useEffect(() => {
		if (expanded) {
			setShowSearchBar(false)
			setAutoFocus(false)
		}
	}, [expanded])

	const toggleSearchBar = () => {
		setShowSearchBar(!showSearchBar)
		setAutoFocus(!showSearchBar)
		setExpanded(false)
		setInitialLoad(false)
	}

	const handleSearchClick = () => {
		if (isLogin) {
			toggleSearchBar()
			return
		}

		toast.error('검색을 이용하기 위해 로그인 해 주세요')
	}

	const toggleNavbar = () => {
		setExpanded(!expanded)
	}

	return (
		<>
			<Card
				className={`position-fixed d-inline d-lg-none p-0 ${initialLoad ? '' : showSearchBar ? 'search-bar-up' : 'search-bar-down'}`}
				style={{ left: '5%', width: '90%', zIndex: '900', top: showSearchBar ? '75px' : '-95px' }}>
				<Card.Body>
					<TopnavSearchBar autoFocus={autoFocus} isLogin={isLogin} />
				</Card.Body>
			</Card>

			<Navbar key={expand} expand={expand} expanded={expanded} fixed='top' bg='light' collapseOnSelect>
				<Container fluid style={{ zIndex: '1000' }}>
					<TopnavLogo />

					<button className='d-lg-none ms-auto me-3 navbar-toggler'>
						<booksitoutIcon.search
							className={`h1 m-0 button-hover ${showSearchBar ? 'text-black' : 'text-secondary'}`}
							onClick={handleSearchClick}
						/>
					</button>

					<Navbar.Toggle onClick={toggleNavbar} />

					<Navbar.Collapse id='responsive-navbar-nav'>
						<TopnavNav isLogin={isLogin} handleLogout={handleLogout} />

						<span className='d-none d-md-inline'>
							<TopnavSearchBar isLogin={isLogin} autoFocus={autoFocus} />
						</span>

						<Nav className='ms-auto'>
							<TopnavDropdown isLogin={isLogin} handleLogout={handleLogout} />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Topnav
