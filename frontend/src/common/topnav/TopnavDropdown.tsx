import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import userIcon from '../../resources/images/user/user3.png'
import uiSettings from '../../settings/ui'

import { FiLogIn as LoginIcon, FiSettings as SettingIcon } from 'react-icons/fi'
import { HiOutlineUserAdd as JoinIcon } from 'react-icons/hi'
import { GrCircleQuestion as QuestionIcon } from 'react-icons/gr'

const TopnavDropdown = ({ isLogin, handleLogout }) => {
	const expand = uiSettings.topnav.collapse

	return (
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
	)
}

export default TopnavDropdown