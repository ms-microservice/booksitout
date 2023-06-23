import { Card } from 'react-bootstrap'

const BookInfoIcon = ({
	infoType,
	infoData,
	responsiveImageStyle = 'col-9 col-md-10 align-self-center p-0',
	responsiveTextStyle = 'col-12 col-md-12 mt-2 mt-md-0',
}) => {
	return (
		<Card style={{ height: '100px' }}>
			<Card.Body>
				<div className="row justify-content-center">
					<div className={responsiveImageStyle}>
						<img
							src={infoType.imageFunction(infoData)}
							alt=""
							className="img-fluid mb-0 mb-md-2 p-0"
							style={{ maxHeight: '50px' }}
						/>
					</div>

					<div className={responsiveTextStyle}>
						<h6 className="text-center mb-0" style={{ whiteSpace: 'nowrap' }}>
							{infoType.textFunction(infoData)}
						</h6>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default BookInfoIcon
