import React from 'react'
import Error from '../common/Error'
import { getCategoryKoreanDisplayName } from '../functions/category'
import booksitoutIcon from '../common/icons/booksitoutIcon'

const CategoryTable = ({ categoryData }) => {
	const categoryReactIconMap: Map<string, any> = new Map([
		['PHILOSOPHY', <booksitoutIcon.categoryPhilosophy />],
		['RELIGION', <booksitoutIcon.categoryReligion />],
		['SOCIAL_SCIENCE', <booksitoutIcon.categorySocialScience />],
		['NATURAL_SCIENCE', <booksitoutIcon.categoryNaturalScience />],
		['TECHNOLOGY', <booksitoutIcon.categoryTechnology />],
		['ART', <booksitoutIcon.categoryArt />],
		['LANGUAGE', <booksitoutIcon.categoryLanguage />],
		['LITERATURE', <booksitoutIcon.categoryLiterature />],
		['HISTORY', <booksitoutIcon.categoryHistory />],
		['OTHERS', <booksitoutIcon.categoryOthers />],
	])

	const getCategoryReactIcon = (category: string) => {
		return categoryReactIconMap.get(category) ?? booksitoutIcon.categoryOthers
	}
	
	return (
		<>
			{categoryData == null ? (
				<Error move={0} mt={20} />
			) : (
				<table className="table table-hover rounded rounded-3 overflow-hidden">
					<thead className="table-dark">
						<tr className="text-center">
							<th></th>
							<th>장르</th>
							<th>다 읽은 책</th>
							<th>읽는 중</th>
						</tr>
					</thead>

					<tbody>
						{categoryData.map(category => {
							return (
								<tr className="text-center">
									<td className="col-2">
										<h2 className="mt-1 mb-3 text-book">{getCategoryReactIcon(category.category)}</h2>
									</td>

									<td className="col-2">
										<h5 className="mb-3 mt-3">{getCategoryKoreanDisplayName(category.category)}</h5>
									</td>

									<td className="col-4">
										<h5 className="mb-3 mt-3">
											<b className="text-book">{category.doneCategory}</b>권
										</h5>
									</td>

									<td className="col-4">
										<h5 className="mb-3 mt-3">
											<b className="text-book">{category.notDoneCategory}</b>권
										</h5>
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
