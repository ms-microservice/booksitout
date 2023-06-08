import React from 'react'
import { useParams } from 'react-router-dom'

import MembershipAddMethodButtonGroup from './MembershipAddMethodButtonGroup'
import MembershipAddFormImage from './MembershipAddFormImage'
import MembershipAddFormManual from './manual/MembershipAddFormManual'
import ScrollToTop from '../../../common/topnav/ScrollToTop'

const MembershipAddForm = () => {
    const { method } = useParams()

    return (
		<div className='container-xl'>
			<ScrollToTop />
			
			<MembershipAddMethodButtonGroup method={method} />

			<div className='mt-4' />

			{method === 'image' ? <MembershipAddFormImage /> : method === 'manual' ? <MembershipAddFormManual /> : <></>}
		</div>
	)
}

export default MembershipAddForm