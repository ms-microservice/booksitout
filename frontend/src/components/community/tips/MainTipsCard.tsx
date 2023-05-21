import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"

import Loading from "../../common/Loading"
import Error from '../../common/Error'

import MainTipsListGroup from "./MainTipsListGroup"
import TipsType from "../../../types/TipsType"
import AllButton from "../../common/AllButton"

import logo from '../../../resources/images/logo/logo.png'

import { booksitoutServer } from "../../../functions/axios"

const MainTipsCard = () => {
	const [initialFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

    const [tipPost, setTipPost] = useState<TipsType[]>([])
	useEffect(() => {
		booksitoutServer
			.get(`/v4/forum/tips?type=all&size=6`)
			.then((res) => {
				setTipPost(res.data.content)
			})
			.catch(() => {
				setError(true)
			})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])

	return (
		<a href='/introduction/tips/all' className="text-black">
			<Card className='h-100' style={{ minHeight: '480px' }}>
				<Card.Body>
					<div className='d-flex mb-3'>
						<img src={logo} alt='' className='img-fluid rounded me-2 mt-0 mt-md-1' style={{ width: '40px', height: '40px' }} />
						<h3 className='mt-2'>책잇아웃 꿀팁</h3>
					</div>

					{error ? <Error mt='0px' mb='140px' /> : initialFetch ? <></> : loading ? <Loading /> : <MainTipsListGroup postList={tipPost} />}

					<div className='d-inline-block mt-2 d-md-none' />

					<AllButton url='/introduction/tips/all' />
				</Card.Body>
			</Card>
		</a>
	)
}

export default MainTipsCard