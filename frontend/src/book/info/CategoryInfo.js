import React from 'react'
import { Card } from 'react-bootstrap'

import philosophyIcon from '../../resources/images/category/philosophy.png'
import religionIcon from '../../resources/images/category/religion.png'
import socialScienceIcon from '../../resources/images/category/social-science.png'
import naturalScienceIcon from '../../resources/images/category/science.png'
import technologyIcon from '../../resources/images/category/technology.png'
import artIcon from '../../resources/images/category/art.png'
import languageIcon from '../../resources/images/category/language.png'
import literatureIcon from '../../resources/images/category/drama.png'
import historyIcon from '../../resources/images/category/history.png'
import othersIcon from '../../resources/images/common/others.png'

const CategoryInfo = ({ category }) => {
	const categoryTextMap = new Map([
		['PHILOSOPHY', '철학'],
		['RELIGION', '종교'],
		['SOCIAL_SCIENCE', '사회과학'],
		['NATURAL_SCIENCE', '자연과학'],
		['TECHNOLOGY', '기술'],
		['ART', '예술'],
		['LANGUAGE', '언어'],
		['LITERATURE', '문학'],
		['HISTORY', '역사'],
		['OTHERS', '기타'],
	])
	const categoryIconMap = new Map([
		['PHILOSOPHY', philosophyIcon],
		['RELIGION', religionIcon],
		['SOCIAL_SCIENCE', socialScienceIcon],
		['NATURAL_SCIENCE', naturalScienceIcon],
		['TECHNOLOGY', technologyIcon],
		['ART', artIcon],
		['LANGUAGE', languageIcon],
		['LITERATURE', literatureIcon],
		['HISTORY', historyIcon],
		['OTHERS', othersIcon],
	])

	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={categoryIconMap.get(category)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{categoryTextMap.get(category)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default CategoryInfo
