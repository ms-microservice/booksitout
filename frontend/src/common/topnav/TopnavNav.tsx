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
			title: (
				<>
					<BookIcon className='me-1' />
					<span>내 책</span>
				</>
			),
		},
		{
			id: 2,
			url: '/statistics',
			activeUrl: '/statistics',
			title: (
				<>
					<StatisticsIcon className='me-1' />
					<span>독서통계</span>
				</>
			),
		},
		{
			id: 3,
			url: '/community',
			activeUrl: '/community',
			title: (
				<>
					<CommunityIcon className='me-1' />
					<span>커뮤니티</span>
				</>
			),
		},
		{
			id: 4,
			url: '/library',
			activeUrl: '/library',
			title: (
				<>
					<LibraryIcon className='me-1' />
					<span>도서관</span>
				</>
			),
		},
	]

	const expand = uiSettings.topnav.collapse

	return (
		<>
			<Nav className='me-auto text-center'>
				{link.map((url) => (
					<Nav.Link
						href={url.url}
						className={`d-flex align-items-center justify-content-center ${
							location.pathname.startsWith(url.activeUrl) ? 'text-book' : ''
						}`}>
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

								{!isLogin ? <div className='col-xs-10 col-8'>로그인</div> : <div className='col-xs-10 col-8'>로그아웃</div>}
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
		</>
	)
}

export default TopnavNav