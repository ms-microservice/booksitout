import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import axios from "axios"

import Loading from "../../common/Loading"
import Error from '../../common/Error'

import TipPostListGroup from "./TipPostListGroup"
import TipPost from "./Tip"
import AllButton from "../../common/AllButton"

import logo from '../../../resources/images/logo/logo.png'

import urls from "../../../settings/urls"

const MainTipCard = () => {
	const [initialFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

    const [tipPost, setTipPost] = useState<TipPost[]>([])
	useEffect(() => {
		axios
			.get(`${urls.api.base}/v4/forum/tips?type=all&size=6`)
			.then((res) => {
				if (res.status !== 200) {
					throw Error()
				}

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
		<Card className='h-100' style={{ minHeight: '480px' }}>
			<Card.Body>
				<div className='d-flex mb-3'>
					<img src={logo} alt='' className='img-fluid rounded me-2 mt-0 mt-md-1' style={{ width: '40px', height: '40px' }} />
					<h3 className='mt-2'>책잇아웃 꿀팁</h3>
				</div>

				{error ? <Error mt='0px' mb='140px' /> : initialFetch ? <></> : loading ? <Loading /> : <TipPostListGroup postList={tipPost} />}

				<div className='d-inline-block mt-2 d-md-none' />

				<AllButton url='/introduction/tips/all'/>
			</Card.Body>
		</Card>
	)
}

export default MainTipCard