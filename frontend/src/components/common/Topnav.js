import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import toast from 'react-hot-toast'
// React Icons
import { HiOutlineUserAdd as JoinIcon } from 'react-icons/hi'
import { FiLogIn as LoginIcon, FiSettings as SettingIcon } from 'react-icons/fi'
// Images
import userIcon from '../../resources/images/common/user.png'
import logo from '../../resources/images/logo/logo.png'
import user from '../../functions/user'
// Settings
import uiSettings from '../../settings/ui'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { logoutToken } from '../../redux/userSlice'
import messages from '../../settings/messages'
import utils from '../../functions/utils';

const Topnav = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()

	const token = useSelector((state) => state.user.token)
	const expand = uiSettings.topnav.collapse

	const [expanded, setExpanded] = useState(false)

	const handleLogout = (e) => {
		e.preventDefault()

		if (!user.localStorage.get.logoutPossible()) {
			toast.error(messages.user.logout.fail.readingInProgress)
			return
		}

		dispatch(logoutToken())
		localStorage.clear()
		toast.success(messages.user.logout.success)
		navigate('/login')
	}

	useEffect(() => {
		setExpanded(false)
	}, [location.pathname])

	return (
		<Navbar key={expand} expand={expand} fixed='top' bg='light' collapseOnSelect expanded={expanded}>
			<Container fluid>
				<Navbar.Brand href={token === '' ? '/login' : '/'}>
					<img src={logo} alt='' className='image-fluid me-2 mb-1 rounded' style={{ width: '30px', height: '30px' }} />
					책잇아웃
				</Navbar.Brand>
				<Navbar.Toggle onClick={() => setExpanded(!expanded)}></Navbar.Toggle>

				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto text-center'>
						{uiSettings.topnav.link.map((url) => (
							<Nav.Link
								href={token !== '' && url.url}
								active={location.pathname.startsWith(url.activeUrl)}
								onClick={() => {
									token === '' && toast.error('로그인 해 주세요')
								}}>
								{url.title}
							</Nav.Link>
						))}
					</Nav>

					<Nav className={`d-inline d-${expand}-none text-center`}>
						<Nav.Link href='/login' onClick={(e) => token !== '' && token != null && handleLogout(e)}>
							<div className='row justify-content-center'>
								<div className='col-4 col-md-2'>
									<div className='row'>
										<div className='col-4'>
											<LoginIcon className='me-2 ' />
										</div>

										{token === '' || token == null ? (
											<div className='col-xs-10 col-8'>로그인</div>
										) : (
											<div className='col-xs-10 col-8'>로그아웃</div>
										)}
									</div>
								</div>
							</div>
						</Nav.Link>

						{(token === '' || token == null) && (
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

						{(token !== '' || token == null) && (
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

					{token !== '' && token != null && <SearchBar />}

					<Nav>
						<NavDropdown
							id='user-dropdown'
							title={
								<img
									src={
										localStorage.getItem('profile-image') == null || localStorage.getItem('profile-image') === ''
											? userIcon
											: localStorage.getItem('profile-image')
									}
									alt=''
									className='img-fluid rounded'
									style={{ width: '30px' }}
								/>
							}
							align='end'
							size='xl'
							className={`d-none d-${expand}-inline`}>
							{token === '' || token == null ? (
								<>
									<NavDropdown.Item href='/login'>로그인</NavDropdown.Item>
									<NavDropdown.Item href='/join'>회원가입</NavDropdown.Item>
								</>
							) : (
								<>
									<NavDropdown.Item onClick={(e) => handleLogout(e)}>로그아웃</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate('/qna')}>QNA</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate('/faq')}>FAQ</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='/settings'>설정</NavDropdown.Item>
								</>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

const SearchBar = ({ expand = 'lg' }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const [keyword, setKeyword] = useState('')
	useEffect(() => {
		if (location.pathname.startsWith('/search')) {
			setKeyword(decodeURI(location.pathname.substring(8)))
		}
	}, [location])

	const handleSearch = (keyword, e) => {
		e.target[0].blur()
		e.preventDefault()

		if (keyword.length >= 2) {
			navigate(`/search/${keyword}`)
		} else {
			toast.error('2글자 이상의 검색어를 입력해 주세요')
		}
	}

	return (
		<Form className='d-flex' onSubmit={(e) => handleSearch(keyword, e)} onKeyDown={(e) => { if(e.keyCode === 13) this.blur() }}>
			<Form.Control
				type='search'
				placeholder='책 검색'
				className='me-2'
				aria-label='Search'
				value={keyword}
				onChange={(e) => {
					setKeyword(e.target.value)
				}}
			/>
			<Button type='submit' variant={`outline-success col-${expand}-3 col-2`}>
				검색
			</Button>
		</Form>
	)
}

export default Topnav
