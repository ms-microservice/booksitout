import philosophyIcon from '../resources/images/book-classifications/categories/philosophy.png'
import religionIcon from '../resources/images/book-classifications/categories/religion.png'
import socialScienceIcon from '../resources/images/book-classifications/categories/social-science.png'
import naturalScienceIcon from '../resources/images/book-classifications/categories/science.png'
import technologyIcon from '../resources/images/book-classifications/categories/technology.png'
import artIcon from '../resources/images/book-classifications/categories/art.png'
import languageIcon from '../resources/images/book-classifications/categories/language.png'
import literatureIcon from '../resources/images/book-classifications/categories/drama.png'
import historyIcon from '../resources/images/book-classifications/categories/history.png'
import othersIcon from '../resources/images/common/others.png'

const categoryKoreanDisplayNameMap: Map<string, string> = new Map([
	['PHILOSOPHY', '철학'],
	['RELIGION', '종교'],
	['SOCIAL_SCIENCE', '사회'],
	['NATURAL_SCIENCE', '과학'],
	['TECHNOLOGY', '기술'],
	['ART', '예술'],
	['LANGUAGE', '언어'],
	['LITERATURE', '문학'],
	['HISTORY', '역사'],
	['OTHERS', '기타'],
])
const categoryIconMap: Map<string, any> = new Map([
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

const getCategoryIcon = (category: string) => {
	return categoryIconMap.get(category) ?? categoryIconMap.get('OTHERS')
}

const getCategoryKoreanDisplayName = (category: string) => {
	return categoryKoreanDisplayNameMap.get(category) ?? '기타'
}

export { getCategoryIcon, getCategoryKoreanDisplayName }
