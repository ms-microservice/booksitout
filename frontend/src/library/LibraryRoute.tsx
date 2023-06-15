import React from 'react'
import { ImLibrary as LibraryIcon} from 'react-icons/im'
import LibraryNearCard from './LibraryNearCard'
import LibrarySearchCard from './LibrarySearchCard'
import LibraryRouteMembershipCard from './membership/LibraryRouteMembershipCard'
import RouteTitle from '../common/RouteTitle'
import LibraryRouteRegionCard from './LibraryRouteRegionCard'

const LibraryRoute = () => {
	document.title = '도서관 | 책잇아웃'

    return (
		<div className='container-xl' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<RouteTitle icon={<LibraryIcon />} title={'도서관'} />

			<div className='row row-eq-height'>
				<div className='col-12 col-xl-6 mb-4'>
					<LibrarySearchCard />
				</div>

				<div className='col-12 col-xl-6 mb-4'>
					<LibraryNearCard />
				</div>

				<div className='col-12 col-xl-6 mb-4'>
					<LibraryRouteRegionCard />
				</div>

				<div className='col-12 col-xl-6 mb-4'>
					<LibraryRouteMembershipCard />
				</div>
			</div>
		</div>
	)
}

export default LibraryRoute