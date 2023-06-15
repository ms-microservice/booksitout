import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../../common/CardTitle'
import CategoryTable from '../CategoryTable'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const CategoryTableCard = ({ categoryData }) => {
	return (
		<Card className='h-100'>
			<Card.Body>
				<CardTitle icon={<booksitoutIcon.category />} title={'장르별 독서현황'} iconSize={1} />

				<CategoryTable categoryData={categoryData} />
			</Card.Body>
		</Card>
	)
}

export default CategoryTableCard