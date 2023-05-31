import React from 'react'
import { Nav } from 'react-bootstrap'
import { HiOutlineUserAdd as JoinIcon } from 'react-icons/hi'
import { FiLogIn as LoginIcon, FiSettings as SettingIcon } from 'react-icons/fi'
import { ImLibrary as LibraryIcon} from 'react-icons/im'
import { BsPeopleFill as CommunityIcon, BsFileEarmarkBarGraphFill as StatisticsIcon, BsBookHalf as BookIcon } from 'react-icons/bs'
import uiSettings from '../../settings/ui'
import { useLocation } from 'react-router-dom'

const TopnavNav = ({ isLogin, handleLogout }) => {
	const location = useLocation()

	const link = [
		{
			id: 1,
			url: '/book/not-done',
			activeUrl: '/book',
			icon: <BookIcon />,
			label: '내 책',
		},
		{
			id: 2,
			url: '/statistics',
			activeUrl: '/statistics',
			icon: <StatisticsIcon />,
			label: '독서통계',
		},
		{
			id: 3,
			url: '/community',
			activeUrl: '/community',
			icon: <CommunityIcon />,
			label: '커뮤니티',
		},
		{
			id: 4,
			url: '/library',
			activeUrl: '/library',
			icon: <LibraryIcon />,
			label: '도서관',
		},
	]

	const expand = uiSettings.topnav.collapse

	return (
		<div>
			<Nav className='me-auto text-center'>
				{link.map((url) => (
					<Nav.Link
						href={url.url}
						className={`d-flex align-items-center justify-content-center ${
							location.pathname.startsWith(url.activeUrl) ? 'text-book' : ''
						}`}>
						<div className='topnav-link-container'>
							<span className='me-1 topnav-icon'>{url.icon}</span>
							<span className='topnav-text'>{url.label}</span>
						</div>
					</Nav.Link>
				))}

				<Nav.Link
					href='/login'
					className={`d-flex d-${expand}-none align-items-center justify-content-center`}
					onClick={(e) => isLogin && handleLogout(e)}>
					<div className='topnav-link-container'>
						<span className='me-1 topnav-icon'>
							<LoginIcon />
						</span>

						<span className='topnav-text'> {!isLogin ? '로그인' : '로그아웃'}</span>
					</div>
				</Nav.Link>

				{!isLogin && (
					<Nav.Link href='/join' className={`d-flex d-${expand}-none align-items-center justify-content-center`}>
						<div className='topnav-link-container'>
							<span className='me-1 topnav-icon'>
								<JoinIcon />
							</span>

							<span className='topnav-text'> 회원가입</span>
						</div>
					</Nav.Link>
				)}

				{isLogin && (
					<Nav.Link href='/settings' className={`d-flex d-${expand}-none align-items-center justify-content-center`}>
						<div className='topnav-link-container'>
							<span className='me-1 topnav-icon'>
								<SettingIcon />
							</span>

							<span className='topnav-text'> 설정</span>
						</div>
					</Nav.Link>
				)}
			</Nav>
		</div>
	)
}

export default TopnavNav