import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { HiUserCircle as UserIcon, HiOutlineUserAdd as JoinIcon } from 'react-icons/hi'
import { FiLogIn as LoginIcon, FiSettings as SettingIcon } from 'react-icons/fi'

const Topnav = ({ token }) => {
	const expand = 'lg'

	const navigate = useNavigate()
	const location = useLocation()

	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		checkLogin(token)
	}, [])

	const checkLogin = (token) => {
		if (token === '') {
			if (!location.pathname.includes('join')) {
				navigate('/login')
			}
		}
	}

	const handleSearch = (e) => {
		e.preventDefault()
		if (keyword !== '') {
			navigate(`/search/${keyword}`)
		} else {
			alert('검색어를 입력해 주세요')
		}
	}

	const handleLogout = (e) => {
		e.preventDefault()
		localStorage.setItem('login-token', '')
		navigate('/login')
	}

	return (
		<Navbar key={expand} expand={expand} fixed='top' bg='light'>
			<Container fluid>
				<Navbar.Brand href='/'>📗 책-it-out</Navbar.Brand>

				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}></Navbar.Toggle>

				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto text-center'>
						<Nav.Link href='/book/not-done'>추가된 책</Nav.Link>
						<Nav.Link href='/book/done'>다 읽은 책</Nav.Link>
						<Nav.Link href='/statistics'>독서 통계</Nav.Link>
					</Nav>

					<Nav className={`d-inline d-${expand}-none text-center`}>
						<Nav.Link href='/login'>
							<div className='row justify-content-center'>
								<div className='col-xs-3 col-2'>
									<div className='row'>
										<div className='col-4'>
											<LoginIcon className='me-2 ' />
										</div>
										{token === '' ? (
											<div className='col-xs-10 col-8'>로그인</div>
										) : (
											<div className='col-xs-10 col-8' onClick={handleLogout}>
												로그아웃
											</div>
										)}
									</div>
								</div>
							</div>
						</Nav.Link>
						<Nav.Link href='/join'>
							<div className='row justify-content-center'>
								<div className='col-xs-3 col-2'>
									<div className='row'>
										<div className='col-4'>
											<JoinIcon className='me-2 ' />
										</div>
										<div className='col-xs-10 col-8'>회원가입</div>
									</div>
								</div>
							</div>
						</Nav.Link>
						{token != '' && (
							<Nav.Link href='/settings'>
								<div className='row justify-content-center'>
									<div className='col-xs-3 col-2'>
										<div className='row'>
											<div className='col-4'>
												<SettingIcon className='me-2 ' />
											</div>
											<div className='col-xs-10 col-8'>설정</div>
										</div>
									</div>
								</div>
							</Nav.Link>
						)}
					</Nav>

					<Nav>
						<Form className='d-flex' onSubmit={handleSearch}>
							<Form.Control
								type='search'
								placeholder='책 검색'
								className='me-2'
								aria-label='Search'
								onChange={(e) => {
									setKeyword(e.target.value)
								}}
							/>
							<Button type='submit' variant={`outline-success col-${expand}-3 col-2`}>
								검색
							</Button>
						</Form>

						<NavDropdown id='user-dropdown' title={<UserIcon />} align='end' size='xl' className={`d-none d-${expand}-inline`}>
							{token === '' ? (
								<NavDropdown.Item href='/login'>로그인</NavDropdown.Item>
							) : (
								<NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
							)}

							<NavDropdown.Item href='/join'>회원가입</NavDropdown.Item>
							{token != '' && (
								<>
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

export default Topnav
