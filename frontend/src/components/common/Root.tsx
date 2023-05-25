import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import ToastSettings from '../../settings/ToastSettings'
import LocationSettings from '../../settings/LocationSettings'
import TimerSettings from '../../settings/TimerSettings'
import Topnav from './Topnav'
import BookFloatingButton from './BookFloatingButton'
import ReadingButton from './ReadingButton'
import CommunityFloatingButton from './CommunityFloatingButton'

const Root = () => {
    return (
		<>
			<Toaster />
			<ToastSettings />
			<LocationSettings />
			<TimerSettings />

			<Topnav />
			<div style={{ marginBottom: '80px' }} />

			<Outlet />

			<CommunityFloatingButton />
			<ReadingButton />
			<BookFloatingButton />
		</>
	)
}

export default Root