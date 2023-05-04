import { Card } from "react-bootstrap"
import MainLogin from "./MainLogin"

const MainNoLoginPrompt = () => {
	return (
		<div className='row justify-content-center'>
			<Card id='login-prompt' className='col-12 col-md-10 col-xl-6 shadow'>
				<Card.Body>
					<MainLogin />
				</Card.Body>
			</Card>
		</div>
	)
}

export default MainNoLoginPrompt