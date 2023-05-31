import React from 'react'
import { Navbar } from 'react-bootstrap'
import logo from '../../images/logo.png'

const TopnavLogo = () => {
    return (
		<Navbar.Brand href='/'>
			<img src={logo} alt='booksitout-logo' className='image-fluid me-2 mb-1 rounded' style={{ width: '30px', height: '30px' }} />
			책잇아웃
		</Navbar.Brand>
	)
}

export default TopnavLogo