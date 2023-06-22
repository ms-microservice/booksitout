import React from 'react'
import loadingBookCover from '../../images/placeholder/default-book-cover-loading.png'
import { Card, Placeholder } from 'react-bootstrap'
import styled from 'styled-components';
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const HorizontalBookViewDoneLoading = () => {
    return (
		<Card>
			<HorizontalBookDoneViewContainer>
				<Card.Body>
					<div className="d-flex justify-content-center">
						<img id="book-cover" className={`img-fluid rounded `} src={loadingBookCover} alt="" />
					</div>

					<div className="mt-3 text-center mb-4">
						<Placeholder as={Card.Text} animation="glow" className="mb-0">
							<h5>
								<Placeholder xs={8} />
							</h5>

							<h6 className="text-muted mb-md-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
								<Placeholder xs={5} />
							</h6>
						</Placeholder>
					</div>

					<Placeholder as={Card.Text} animation="glow" className="mb-0">
						<div
							className="row justify-content-center w-100"
							style={{ position: 'absolute', bottom: '0px' }}
						>
							{[1, 2, 3, 4, 5].map(() => {
								return (
									<div
										className={`col-2 text-center text-warning ps-0 pe-0 ms-0 me-0`}
										style={{ opacity: '0.7' }}
									>
										<StarLoading />
									</div>
								)
							})}
						</div>
					</Placeholder>
				</Card.Body>
			</HorizontalBookDoneViewContainer>
		</Card>
	)
}

const HorizontalBookDoneViewContainer = styled.div`
	min-height: 350px;
	overflow-y: hidden;
`

const StarContainer = styled.div`
	opacity: 0.7;
	color: transparent;
	animation: glowing 2s infinite;

	@keyframes glowing {
		0% {
			color: rgb(255, 211, 81);
		}
		50% {
			color: rgba(255, 224, 133, 0.7);
		}
		100% {
			color: rgb(255, 211, 81);
		}
	}
`
const StarLoading = () => {
    return (
		<Placeholder as={Card.Text} animation="glow" className="mb-0">
			<StarContainer>
				<h1>
					<booksitoutIcon.starFill />
				</h1>
			</StarContainer>
		</Placeholder>
	)
}

export default HorizontalBookViewDoneLoading