import React from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Navbar, Nav, NavDropdown, Card } from 'react-bootstrap'

import { HiOutlineUserAdd as JoinIcon } from 'react-icons/hi'
import { FiLogIn as LoginIcon, FiSettings as SettingIcon } from 'react-icons/fi'
import { BiSearchAlt2 as SearchIcon } from 'react-icons/bi'
import { GrCircleQuestion as QuestionIcon } from 'react-icons/gr'

import userIcon from '../../resources/images/user/user3.png'
import logo from '../../resources/images/logo/logo.png'
import user from '../../functions/user'

import uiSettings from '../../settings/ui'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsLogin, logoutToken } from '../../redux/userSlice'

import messages from '../../settings/messages'
import '../../resources/css/button.css'
import '../../resources/css/topnav.css'
import { RootState } from '../../redux/store'

const Topnav = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	
	const isLogin = useSelector((state: RootState) => state.user.isLogin)
	const expand = uiSettings.topnav.collapse

	const [expanded, setExpanded] = React.useState(false)
	const [showSearchBar, setShowSearchBar] = React.useState(false)
	const [autoFocus, setAutoFocus] = React.useState(false)

	const [initialLoad, setInitialLoad] = React.useState(true)

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

	return (
		<>
			{
				<Card
					className={`position-fixed d-inline d-lg-none p-0 ${initialLoad ? '' : showSearchBar ? 'search-bar-up' : 'search-bar-down'}`}
					style={{ left: '5%', width: '90%', zIndex: '900', top: showSearchBar ? '75px' : '-95px' }}>
					<Card.Body>
						<SearchBar autoFocus={autoFocus} isLogin={isLogin} />
					</Card.Body>
				</Card>
			}

			<Navbar key={expand} expand={expand} fixed='top' bg='light' collapseOnSelect expanded={expanded}>
				<Container fluid style={{ zIndex: '1000' }}>
					<Navbar.Brand href='/'>
						<img src={logo} alt='booksitout-logo' className='image-fluid me-2 mb-1 rounded' style={{ width: '30px', height: '30px' }} />
						책잇아웃
					</Navbar.Brand>

					<button className='d-lg-none ms-auto me-3 navbar-toggler'>
						<SearchIcon
							className={`h1 m-0 button-hover ${showSearchBar ? 'text-black' : 'text-secondary'}`}
							onClick={() => {
								if (isLogin) {
									toggleSearchBar()
									return
								}

								toast.error('검색을 이용하기 위해 로그인 해 주세요')
							}}
						/>
					</button>

					<Navbar.Toggle onClick={() => setExpanded(!expanded)}></Navbar.Toggle>

					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto text-center'>
							{uiSettings.topnav.link.map((url) => (
								<Nav.Link href={url.url} active={location.pathname.startsWith(url.activeUrl)}>
									{url.title}
								</Nav.Link>
							))}
						</Nav>

						<Nav className={`d-inline d-${expand}-none text-center`}>
							<Nav.Link href='/login' onClick={(e) => isLogin && handleLogout(e)}>
								<div className='row justify-content-center'>
									<div className='col-4 col-md-2'>
										<div className='row'>
											<div className='col-4'>
												<LoginIcon className='me-2 ' />
											</div>

											{!isLogin ? (
												<div className='col-xs-10 col-8'>로그인</div>
											) : (
												<div className='col-xs-10 col-8'>로그아웃</div>
											)}
										</div>
									</div>
								</div>
							</Nav.Link>

							{!isLogin && (
								<Nav.Link href='/join'>
									<div className='row justify-content-center'>
										<div className='col-4  col-md-2'>
											<div className='row'>
												<div className='col-4'>
													<JoinIcon className='me-2 ' />
												</div>

												<div className='col-xs-10 col-8'>회원가입</div>
											</div>
										</div>
									</div>
								</Nav.Link>
							)}

							{isLogin && (
								<Nav.Link href='/settings'>
									<div className='row justify-content-center'>
										<div className='col-3 col-md-2'>
											<div className='row'>
												<div className='col-4'>
													<SettingIcon className='me-2' />
												</div>

												<div className='col-xs-10 col-8'>설정</div>
											</div>
										</div>
									</div>
								</Nav.Link>
							)}
						</Nav>

						<span className='d-none d-lg-inline'>
							<SearchBar width={{ width: '400px' }} autoFocus={autoFocus} isLogin={isLogin} />
						</span>

						<Nav>
							<NavDropdown
								id='user-dropdown'
								title={
									<img
										src={
											localStorage.getItem('profile-image') == null || localStorage.getItem('profile-image') === ''
												? userIcon
												: localStorage.getItem('profile-image') ?? ''
										}
										alt=''
										className='img-fluid rounded'
										style={{ width: '30px', height: '30px' }}
									/>
								}
								align='end'
								className={`d-none d-${expand}-block`}>
								{!isLogin ? (
									<>
										<NavDropdown.Item href='/login'>
											<LoginIcon className='me-2 mb-1' /> 로그인
										</NavDropdown.Item>

										<NavDropdown.Item href='/join'>
											<JoinIcon className='me-2 mb-1' /> 회원가입
										</NavDropdown.Item>

										<NavDropdown.Item href='/faq'>
											<QuestionIcon className='me-2 mb-1 bold' /> FAQ
										</NavDropdown.Item>
									</>
								) : (
									<>
										<NavDropdown.Item href='/qna'>QNA</NavDropdown.Item>
										<NavDropdown.Item href='/faq'>FAQ</NavDropdown.Item>

										<NavDropdown.Divider />

										<NavDropdown.Item href='/settings'>
											<SettingIcon className='me-2 mb-1' /> 설정
										</NavDropdown.Item>

										<NavDropdown.Item onClick={(e) => handleLogout(e)}>
											<LoginIcon className='me-2 mb-1' /> 로그아웃
										</NavDropdown.Item>
									</>
								)}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

const SearchBar = ({ width = {}, autoFocus = false, isLogin }) => {
	const navigate = useNavigate()
	const location = useLocation()

	// const [showSearchHistory, setShowSearchHistory] = React.useState(false)
	const [keyword, setKeyword] = React.useState('')

	React.useEffect(() => {
		if (location.pathname.startsWith('/search')) {
			setKeyword(decodeURI(location.pathname.substring(8)))
		}
	}, [location])

	const handleSearch = (e) => {
		e.preventDefault()

		if (!isLogin) {
			toast.error('검색을 이용하시려면 로그인 해 주세요!!')
			e.target[0].blur()
			return
		}

		if (typeof e.target[0] !== 'undefined') e.target[0].blur()

		if (keyword.length >= 2) navigate(`/search/${keyword}`)
		else toast.error('2글자 이상의 검색어를 입력해 주세요')
	}

	React.useEffect(() => {
		const input = document.getElementById('searchInput')

		if (autoFocus) {
			input!!.focus()
			// setShowSearchHistory(true)
		} else {
			input!!.blur()
			// setShowSearchHistory(false)
		}
	}, [autoFocus])

	return (
		<Form
			style={width}
			className='row me-1'
			onSubmit={(e) => handleSearch(e)}
			onKeyDown={(e) => {
				if (e.keyCode === 13) {
					e.currentTarget.blur()
				}
			}}>

			<div className='col-9 p-lg-0 pe-0'>
				<Form.Control
					id='searchInput'
					type='search'
					autoComplete='off'
					placeholder='한 번에 책 검색하기'
					className='me-2 w-100'
					aria-label='Search'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					// onFocus={() => setShowSearchHistory(true)}
					// onBlur={() => setShowSearchHistory(false)}
				/>
			</div>

			<div className='col-3 pe-0'>
				<Button type='submit' variant='outline-book' className='w-100'>
					검색
				</Button>
			</div>
		</Form>
	)
}

export default Topnav
