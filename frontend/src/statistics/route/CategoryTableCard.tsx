import React from 'react'
import { Card, Modal } from 'react-bootstrap'
import CardTitle from '../../common/CardTitle'
import CategoryTable from '../CategoryTable'
import booksitoutIcon from '../../common/icons/booksitoutIcon';
import AllButton from '../../common/AllButton';
import Error from '../../common/Error';
import PieChart from '../PieChart';
import styled from 'styled-components';

const CategoryTableCard = ({ categoryData }) => {
	const [show, setShow] = React.useState(false)

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} centered fullscreen="md-down">
				<Modal.Header closeButton>
					<CardTitle icon={<booksitoutIcon.category />} title={'장르별 독서현황'} mb={0} />
				</Modal.Header>

				<Modal.Body>
					<CategoryTable categoryData={categoryData} />
					<div className="mb-5" />
				</Modal.Body>
			</Modal>

			<Card className="h-100">
				<Card.Body>
					<CardTitle icon={<booksitoutIcon.category />} title={'장르별 독서현황'} iconSize={1} />

					{categoryData == null ? (
						<Error />
					) : (
						<>
							<div className="row">
								<div className="col-12">
									<PieContainer>
										<PieChart
											labels={categoryData.map(c => c.category)}
											data={categoryData.map(c => c.doneCategory + c.notDoneCategory)}
											background={[]}
											size={250}
										/>
									</PieContainer>
								</div>

								<div className="col-4"></div>
							</div>

							<AllButton url="" onClick={() => setShow(true)} />
						</>
					)}
				</Card.Body>
			</Card>
		</>
	)
}

const PieContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 15px;
`

export default CategoryTableCard