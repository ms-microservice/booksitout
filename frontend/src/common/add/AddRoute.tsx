import React from 'react'
import RouteContainer from '../RouteContainer'
import { Outlet, useLocation } from 'react-router-dom'
import AddButtonGroup from './AddButtonGroup'

const AddRoute = () => {
	const location = useLocation();
	const pathSegments = location.pathname.split('/');
	const type = pathSegments[2] ?? ''

	React.useEffect(() => {
		console.log(location)
		console.log(type)
	}, [])

    return (
		<RouteContainer>
			<AddButtonGroup type={type} />
			<div className="mb-2" />

			<Outlet />
		</RouteContainer>
	)
}

export default AddRoute