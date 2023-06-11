import React from 'react'
import Error from '../common/Error'
import { getCategoryIcon, getCategoryKoreanDisplayName } from '../functions/category'

const CategoryTable = ({ categoryData }) => {
	return (
		<>
			{categoryData == null ? (
				<Error />
			) : (
				<table className='table table-hover mt-3 rounded rounded-3 overflow-hidden'>
					<thead className='table-dark'>
						<tr className='text-center'>
							<th>장르</th>
							<th>다 읽은 책</th>
							<th>읽는 중</th>
						</tr>
					</thead>

					<tbody>
						{categoryData.map((category) => {
							return (
								<tr className='text-center'>
									<td className='col-5 col-md-4'>
										<img
											src={getCategoryIcon(category.category)}
											alt=''
											className='img-fluid mt-1'
											style={{ width: '30px' }}
										/>
										<p className='mt-2 mb-0'>{getCategoryKoreanDisplayName(category.category)}</p>
									</td>

									<td className='col-4'>
										<p className='mt-3'>{category.doneCategory}권</p>
									</td>

									<td className='col-4'>
										<p className='mt-3'>{category.notDoneCategory}권</p>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</>
	)
}

export default CategoryTable
