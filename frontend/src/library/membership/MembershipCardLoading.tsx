import { Card, Placeholder } from 'react-bootstrap'

const MembershipCardLoading = ({ height = 80 }) => {
	return (
		<Card style={{ minHeight: height * 2.5 }}>
			<Card.Body>
				<div className="row">
					<div className="col-4">
						<Placeholder as={Card.Text} animation="glow">
							<Placeholder xs={4} />
						</Placeholder>
					</div>

					<div className="col-8 text-end">
						<Placeholder as={Card.Text} animation="glow">
							<Placeholder xs={5} />
						</Placeholder>
					</div>
				</div>

				<div className="w-100 text-center">
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={5} style={{ height: height + 23 }} className="mt-3" />
						<Placeholder xs={8} />
					</Placeholder>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MembershipCardLoading