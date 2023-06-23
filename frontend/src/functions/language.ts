import koreanIcon from '../resources/images/book-classifications/languages/korea.png'
import englishIcon from '../resources/images/book-classifications/languages/usa.png'
import japaneseIcon from '../resources/images/book-classifications/languages/japan.png'
import chineseIcon from '../resources/images/book-classifications/languages/china.png'
import frenchIcon from '../resources/images/book-classifications/languages/france.png'
import spanishIcon from '../resources/images/book-classifications/languages/spain.png'

const languageTextKoreanMap = new Map([
	['ENGLISH', '영어'],
	['KOREAN', '한국어'],
	['JAPANESE', '일본어'],
	['CHINESE', '중국어'],
	['FRENCH', '프랑스어'],
	['SPANISH', '스페인어'],
])

const languageImageMap = new Map([
	['ENGLISH', englishIcon],
	['KOREAN', koreanIcon],
	['JAPANESE', japaneseIcon],
	['CHINESE', chineseIcon],
	['FRENCH', frenchIcon],
	['SPANISH', spanishIcon],
])

const languageEmojiMap = new Map([
	['ENGLISH', '🇺🇸'],
	['KOREAN', '🇰🇷'],
	['JAPANESE', '🇯🇵'],
	['CHINESE', '🇨🇳'],
	['FRENCH', '🇫🇷'],
	['SPANISH', '🇪🇸'],
])

const white = '#FFFFFF'

const languageConfig = new Map([
	[
		'ENGLISH',
		{
			emoji: '🇺🇸',
			korean: '영어',
			image: englishIcon,
			color: ['#0A3161', '#B31942', white],
			hoverColor: '',
		},
	],
	[
		'KOREAN',
		{
			emoji: '🇰🇷',
			korean: '한국어',
			image: koreanIcon,
			color: ['#0F64CD', '#CD2E3A', white, '#000000'],
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
			color: ['#002395', '#FFFFFF', '#ED2939'],
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
			color: ['#000000', '#DD0000', '#FFCC00'],
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

const getLanguageKoreanLabel = (language: string) => {
	return languageTextKoreanMap.get(language) ?? '한국어'
}

const getLangaugeImage = (language: string) => {
	return languageImageMap.get(language) ?? koreanIcon
}

const getLanguageEmoji = (language: string) => {
	return languageEmojiMap.get(language) ?? '🇰🇷'
}

const getLanguageConfig = (language: string) => {
	return languageConfig.get(language) ?? languageConfig.get('UNKNOWN')
}


export { getLangaugeImage, getLanguageKoreanLabel, getLanguageEmoji, getLanguageConfig }