import { Card } from "react-bootstrap"
import { BsFillArrowRightCircleFill as RightArrowIcon } from 'react-icons/bs'

const SettingsLinkCard = ({ title, contentList, link }) => {
	return (
		<Card className='mb-4'>
			<Card.Body style={{ minHeight: '300px' }}>
				<a href={link}>
					<div className='row row-eq-height'>
						<div className='col-10'>
							<h3 className='mb-4'>{title}</h3>
							<div className='ms-4 text-secondary'>
								{contentList.map((content) => (
									<p className='mb-2'>{content}</p>
								))}
							</div>
						</div>

						<div className='col-2' style={{ minHeight: '260px' }}>
							<div className='d-flex justify-content-end align-items-center h-100'>
								<RightArrowIcon className='text-book' size={30} />
							</div>
						</div>
					</div>
				</a>
			</Card.Body>
		</Card>
	)
}

export default SettingsLinkCard