import { useState } from "react"
import { Card } from "react-bootstrap"

import TipPostListGroup from "./TipPostListGroup"
import TipPost from "./Tip"

import logo from '../../../resources/images/logo/logo.png'

const MainTipCard = () => {
    const [tipPost, setTipPost] = useState<TipPost[]>([])

	return (
		<a href='/introduction/tips/all' className='text-decoration-none text-black'>
			<Card className='h-100' style={{ minHeight: '400px' }}>
				<Card.Body>
					<div className='d-flex mb-3'>
						<img src={logo} alt='' className='img-fluid rounded me-2 mt-0 mt-md-1' style={{ width: '40px', height: '40px' }} />
						<h3 className='mt-2'>책잇아웃 꿀팁</h3>
					</div>

					<TipPostListGroup postList={tipPost} />
				</Card.Body>
			</Card>
		</a>
	)
}

export default MainTipCard