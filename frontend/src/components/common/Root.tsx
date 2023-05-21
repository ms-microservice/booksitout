import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import ToastSettings from '../../settings/ToastSettings'
import LocationSettings from '../../settings/LocationSettings'
import TimerSettings from '../../settings/TimerSettings'
import Topnav from './Topnav'
import FloatingAddButton from './FloatingAddButton'
import ReadingButton from './ReadingButton'

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

			<FloatingAddButton />
			<ReadingButton />
		</>
	)
}

export default Root