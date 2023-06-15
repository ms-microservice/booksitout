import React from 'react'
import RouteTitle from '../common/RouteTitle'
import booksitoutIcon from '../common/icons/booksitoutIcon';
import PwaAddButton from './PwaAddButton';
import PwaNotSupportedFunctionCard from './PwaNotSupportedFunctionCard';
import PwaInfoCard from './PwaInfoCard';

const PwaRoute = () => {
    return (
		<div className='container-xl'>
			<RouteTitle icon={<booksitoutIcon.pwa />} title={'앱으로 추가하기'} />

			<div className='row justify-content-center'>
				<div className='col-12 col-md-6'>
					<PwaAddButton />
				</div>

				<div className='mt-4' />

				<div className='col-12'>
					<PwaNotSupportedFunctionCard />
				</div>

				<div className='mt-4' />

				<div className='col-12'>
					<PwaInfoCard />
				</div>
			</div>
		</div>
	)
}

export default PwaRoute
