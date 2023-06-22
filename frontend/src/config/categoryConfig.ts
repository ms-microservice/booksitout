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

const categoryConfigMap = new Map([
	[
		'OTHERS',
		{
			image: othersIcon,
			emoji: '',
			icon: '',
			korean: '총류',
			color: ['#02AF50'],
			hoverColor: '',
		},
	],
	[
		'PHILOSOPHY',
		{
			image: philosophyIcon,
			emoji: '',
			icon: '',
			korean: '철학',
			color: ['#E73D36'],
			hoverColor: '',
		},
	],
	[
		'RELIGION',
		{
			image: religionIcon,
			emoji: '',
			icon: '',
			korean: '종교',
			color: ['#A6A6A6'],
			hoverColor: '',
		},
	],
	[
		'SOCIAL_SCIENCE',
		{
			image: socialScienceIcon,
			emoji: '',
			icon: '',
			korean: '사회',
			color: ['#FE7F00'],
			hoverColor: '',
		},
	],
	[
		'NATURAL_SCIENCE',
		{
			image: naturalScienceIcon,
			emoji: '',
			icon: '',
			korean: '과학',
			color: ['#06B0F1'],
			hoverColor: '',
		},
	],
	[
		'TECHNOLOGY',
		{
			image: technologyIcon,
			emoji: '',
			icon: '',
			korean: '기술',
			color: ['#1E1F14'],
			hoverColor: '',
		},
	],
	[
		'ART',
		{
			image: artIcon,
			emoji: '',
			icon: '',
			korean: '예술',
			color: ['#FFCF36'],
			hoverColor: '',
		},
	],
	[
		'LANGUAGE',
		{
			image: languageIcon,
			emoji: '',
			icon: '',
			korean: '언어',
			color: ['#92D051'],
			hoverColor: '',
		},
	],
	[
		'LITERATURE',
		{
			image: literatureIcon,
			emoji: '',
			icon: '',
			korean: '문학',
			color: ['#016FC1'],
			hoverColor: '',
		},
	],
	[
		'HISTORY',
		{
			image: historyIcon,
			emoji: '',
			icon: '',
			korean: '역사',
			color: ['#7D53AA'],
			hoverColor: '',
		},
	],
	[
		'UNKNOWN',
		{
			image: null,
			emoji: '',
			icon: '',
			korean: '모름',
			color: ['#1E1F14'],
			hoverColor: '',
		},
	],
])

const categoryConfig = (category: string) => {
    return categoryConfigMap.get(category) ?? categoryConfigMap.get('UNKNOWN')
}

export default categoryConfig