import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import ToastSettings from '../settings/ToastSettings'
import LocationSettings from '../settings/LocationSettings'
import TimerSettings from '../settings/TimerSettings'
import Topnav from '../common/topnav/Topnav'
import BookFloatingButton from './BookFloatingButton'
import TimerFloatingButton from './TimerFloatingButton'
import CommunityFloatingButton from './CommunityFloatingButton'

const Root = () => {
    return (
		<>
			<Toaster />
			<ToastSettings />
			<LocationSettings />
			<TimerSettings />

			<Topnav />
			<div style={{ marginBottom: '70px' }} />

			<Outlet />

			<TimerFloatingButton />
			<CommunityFloatingButton />
			<BookFloatingButton />

			<div className="pb-4"/>
		</>
	)
}

export default Root