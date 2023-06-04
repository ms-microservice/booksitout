import React from "react"
import { Card, ListGroup } from "react-bootstrap"

import Loading from "../../components/common/Loading"
import Error from '../../components/common/Error'

import MainTipsListGroup from "./MainTipsListGroup"
import TipsType from "./TipsType"
import AllButton from "../../components/common/AllButton"

import logo from '../../images/logo.png'

import { booksitoutServer } from "../../functions/axios"
import CardTitle from "../../common/CardTitle"

const MainTipsCard = () => {
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [loading, setLoading] = React.useState(true)
	
    const [tipPost, setTipPost] = React.useState<TipsType[] | null>(null)
	React.useEffect(() => {
		booksitoutServer
			.get(`/v4/forum/tips?type=all&size=6`)
			.then((res) => {
				setTipPost(res.data.content)
			})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])

	return (
		<a href='/introduction/tips/all' className='text-black'>
			<Card className='h-100' style={{ minHeight: '480px' }}>
				<Card.Body>
					<CardTitle
						icon={<img src={logo} alt='' className='img-fluid rounded me-2 mt-0 mt-md-1' style={{ width: '40px', height: '40px' }} />}
						title='책잇아웃 꿀팁'
					/>

					{initialFetch ? (
						<></>
					) : tipPost == null ? (
						<Error />
					) : loading ? (
						<Loading />
					) : (
						<ListGroup>
							<MainTipsListGroup postList={tipPost} />
						</ListGroup>
					)}

					<div className='d-inline-block pb-4 d-md-none' />

					<AllButton url='/introduction/tips/all' />
				</Card.Body>
			</Card>
		</a>
	)
}

export default MainTipsCard