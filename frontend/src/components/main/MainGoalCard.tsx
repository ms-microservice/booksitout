import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"

import Goal from "../goal/Goal"
import Error from '../common/Error';

const MainGoalCard = ({statistics, goal}) => {
	const [initialFetch, setInitialFetch] = useState(true)

	useEffect(()=> {
		const timer = setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		return clearTimeout(timer)
	}, [])

	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100 mb-4'>
				<a href='/goal' className='text-decoration-none text-black h-100'>
					<h3>{new Date().getFullYear()}년 목표</h3>

					{statistics != null ? (
						<div className='h-100'>
							<Goal goal={goal} />
						</div>
					) : initialFetch ? (
						<></>
					) : (
						<Error message='오류가 났어요' />
					)}
				</a>
			</Card.Body>
		</Card>
	)
}


export default MainGoalCard