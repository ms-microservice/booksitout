import koreanIcon from '../resources/images/book-classifications/languages/korea.png'
import englishIcon from '../resources/images/book-classifications/languages/usa.png'
import japaneseIcon from '../resources/images/book-classifications/languages/japan.png'
import chineseIcon from '../resources/images/book-classifications/languages/china.png'
import frenchIcon from '../resources/images/book-classifications/languages/france.png'
import spanishIcon from '../resources/images/book-classifications/languages/spain.png'

const white = '#FFFFFF'
const black = '#000000'

const languageConfigMap = new Map([
	[
		'ENGLISH',
		{
			emoji: '🇺🇸',
			korean: '영어',
			image: englishIcon,
			color: ['#C8102E', '#012169'],
			hoverColor: '',
		},
	],
	[
		'KOREAN',
		{
			emoji: '🇰🇷',
			korean: '한국어',
			image: koreanIcon,
			color: ['#CD2E3A', '#0F64CD', black],
			hoverColor: '',
		},
	],
	[
		'JAPANESE',
		{
			emoji: '🇯🇵',
			korean: '일본어',
			image: japaneseIcon,
			color: [white, '#BC002D'],
			hoverColor: '',
		},
	],
	[
		'CHINESE',
		{
			emoji: '🇨🇳',
			korean: '중국어',
			image: chineseIcon,
			color: ['#EE1C25', '#FFFF00'],
			hoverColor: '',
		},
	],
	[
		'FRENCH',
		{
			emoji: '🇫🇷',
			korean: '프랑스어',
			image: frenchIcon,
			color: ['#002395', white, '#ED2939'],
			hoverColor: '',
		},
	],
	[
		'SPANISH',
		{
			emoji: '🇪🇸',
			korean: '스페인어',
			image: spanishIcon,
			color: ['#AA151B', '#F1BF00'],
			hoverColor: '',
		},
	],
	[
		'GERMAN',
		{
			emoji: '🇩🇪',
			korean: '독일어',
			image: null,
			color: [black, '#DD0000', '#FFCC00'],
			hoverColor: '',
		},
	],
	[
		'ITALIAN',
		{
			emoji: '🇮🇹',
			korean: '이탈리아어',
			image: null,
			color: ['#008C45', '#F4F9FF', '#CD212A'],
			hoverColor: '',
		},
	],
	[
		'UNKNOWN',
		{
			emoji: '❓',
			korean: '없음',
			image: null,
			color: null,
			hoverColor: '',
		},
	],
])

const languageConfig = (language: string) => {
    return languageConfigMap.get(language) ?? languageConfigMap.get('KOREAN')
}

export default languageConfig