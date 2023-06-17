import React from 'react'
import { Button, Card, Placeholder } from 'react-bootstrap';
import bookCoverLoading from '../resources/images/common/loading-default-book-cover.png'
import CardTitle from '../common/CardTitle';
import {BsBookHalf as BookIcon} from 'react-icons/bs'
import styled from 'styled-components';

const MainLastReadBookCardLoading = () => {
    return (
		<Card className="h-100" style={{ minHeight: '380px' }}>
			<Card.Body>
				<CardTitle icon={<BookIcon />} title={'마지막으로 읽은 책'} mb={0} />

				<BookInfoContainer className="row row-eq-height pb-5">
					<div className="col-12 col-lg-4 text-center">
						<img
							className="img-fluid rounded text-decoration-none text-black"
							src={bookCoverLoading}
							style={{ maxHeight: '250px' }}
							alt=""
						/>
					</div>

					<div className="col-12 col-lg-8 pt-3 pt-md-0 mb-4">
						<Placeholder as={Card.Text} animation="wave">
							<h4>
								<Placeholder xs="10" />
							</h4>

							<h6 className="text-muted">
								<Placeholder xs="4" />
							</h6>

							<div className="pb-1"/>

							<div className="pb-3">
								<Placeholder xs="12" />
							</div>
						</Placeholder>
					</div>
				</BookInfoContainer>

				<div className="row w-100" style={{ position: 'absolute', bottom: '20px' }}>
					<div className="col-6 mt-md-2">
						<Button variant="book-danger" className="w-100">
							포기하기
						</Button>
					</div>

					<div className="col-6 mt-md-2">
						<Button variant="book" className="w-100">
							이어서 읽기
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const BookInfoContainer = styled.div`
	justify-content: center;
	align-items: center;
	height: 100%;

	@media (min-width: 768px) {
		transform: translateY(-50px);
	}
`

export default MainLastReadBookCardLoading