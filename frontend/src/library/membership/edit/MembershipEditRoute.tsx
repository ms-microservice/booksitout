import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { MembershipType } from '../MembershipType'
import { booksitoutServer } from '../../../functions/axios'
import RouteTitle from '../../../common/RouteTitle'
import booksitoutIcon from '../../../common/icons/booksitoutIcon';
import MembershipEditForm from './MembershipEditForm'
import ScrollToTop from '../../../common/topnav/ScrollToTop'

export async function loader({params}) {
    return booksitoutServer
        .get(`/v5/library/membership/${params.id}`)
        .then((res) => res.data)
}

const MembershipEditRoute = () => {
    const { id } = useParams()
    const membership = useLoaderData() as MembershipType

    return (
		<div className='container-xl mb-5'>
			<ScrollToTop />

			<RouteTitle icon={<booksitoutIcon.membership />} title={'회원증 수정하기'} />
			<MembershipEditForm membership={membership} />
		</div>
	)
}

export default MembershipEditRoute