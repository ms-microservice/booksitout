import React from 'react'
import loadingBookCover from '../../images/placeholder/default-book-cover-loading.png'
import { Card, Placeholder } from 'react-bootstrap'

const HorizontalBookViewLoading = () => {
    return (
		<Card>
			<Card.Body>
				<div className="d-flex justify-content-center">
					<img id="book-cover" className={`img-fluid rounded `} src={loadingBookCover} alt="" />
				</div>

				<div className="mt-3 text-center mb-4">
					<Placeholder as={Card.Text} animation="glow" className="mb-0">
						<h5 style={{ overflow: 'hidden', height: '50px' }}>
							<Placeholder xs={8} />
						</h5>

						<h6 className="text-muted mb-md-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
							<Placeholder xs={5} />
						</h6>
					</Placeholder>

					<Placeholder as={Card.Text} animation="glow" className="mb-0">
						<div className="row align-items-center mt-2">
							<div className="col-12 col-md-6 col-xl-7">
								<Placeholder xs={12} />
							</div>

							<div className="col-12 col-md-6 col-xl-5 mt-md-0">
								<span className="align-middle" style={{ whiteSpace: 'nowrap' }}>
									<b className="text-book">
										<Placeholder xs={2} />
									</b>
									/
									<Placeholder xs={2} />
								</span>
							</div>
						</div>
					</Placeholder>
				</div>

				<div className="row mt-3 mt-md-2">
					<Placeholder as={Card.Text} animation="glow" className="mb-0">
						<div className="col-12 mb-2">
							<Placeholder.Button variant="book" className="w-100" />
						</div>

						<div className="col-12 mb-2">
							<Placeholder.Button variant="book-danger" className="w-100" />
						</div>
					</Placeholder>
				</div>
			</Card.Body>
		</Card>
	)
}

export default HorizontalBookViewLoading