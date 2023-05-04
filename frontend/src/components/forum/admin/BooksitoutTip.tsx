import { Card } from "react-bootstrap"

import logo from '../../../resources/images/logo/logo.png'
import { useState } from "react"
import AdminPostListGroup from "./AdminPostListGroup"

const BooksitoutTip = () => {
    const [tipPost, setTipPost] = useState([])

	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body>
				<div className='d-flex mb-3'>
					<img src={logo} alt='' className='img-fluid rounded me-2 mt-0 mt-md-1' style={{ width: '40px', height: '40px' }} />
					<h3 className='mt-2'>책잇아웃 꿀팁</h3>
				</div>

				<AdminPostListGroup postList={tipPost} />
			</Card.Body>
		</Card>
	)
}

export default BooksitoutTip