import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import userIcon from '../../resources/images/user/user3.png'
import uiSettings from '../../settings/ui'
import booksitoutIcon from '../icons/booksitoutIcon';

const TopnavDropdown = ({ isLogin, handleLogout }) => {
	const expand = uiSettings.topnav.collapse

	return (
		<NavDropdown
			id="user-dropdown"
			title={
				<img
					src={
						localStorage.getItem('profile-image') == null || localStorage.getItem('profile-image') === ''
							? userIcon
							: localStorage.getItem('profile-image') ?? ''
					}
					alt=""
					className="img-fluid rounded"
					style={{ width: '30px', height: '30px' }}
				/>
			}
			align="end"
			className={`d-none d-${expand}-block`}
		>
			{!isLogin ? (
				<>
					<NavDropdown.Item href="/login">
						<booksitoutIcon.login className="text-book me-2 mb-1" /> 로그인
					</NavDropdown.Item>

					<NavDropdown.Item href="/join">
						<booksitoutIcon.join className="text-book me-2 mb-1" /> 회원가입
					</NavDropdown.Item>

					<NavDropdown.Item href="/faq">
						<booksitoutIcon.faq className="text-book me-2 mb-1 bold" /> 자주 묻는 질문
					</NavDropdown.Item>

					<NavDropdown.Item href="/suggestion">
						<booksitoutIcon.faq className="text-book me-2 mb-1 bold" /> 제안 / 피드백
					</NavDropdown.Item>
				</>
			) : (
				<>
					<NavDropdown.Item href="/faq">
						<booksitoutIcon.faq className="text-book me-2 mb-1 bold" />
						자주 묻는 질문
					</NavDropdown.Item>

					<NavDropdown.Item href="/suggestion">
						<booksitoutIcon.suggestion className="text-book me-2 mb-1 bold" />
						제안 / 피드백
					</NavDropdown.Item>

					<NavDropdown.Divider />

					<NavDropdown.Item href={`/user/${localStorage.getItem('user-name-public')}`}>
						<booksitoutIcon.user className="text-book me-2 mb-1" /> 내 프로필
					</NavDropdown.Item>

					<NavDropdown.Item href="/settings">
						<booksitoutIcon.settings className="text-book me-2 mb-1" /> 설정
					</NavDropdown.Item>

					<NavDropdown.Item onClick={e => handleLogout(e)}>
						<booksitoutIcon.login className="text-book me-2 mb-1" /> 로그아웃
					</NavDropdown.Item>
				</>
			)}
		</NavDropdown>
	)
}

export default TopnavDropdown