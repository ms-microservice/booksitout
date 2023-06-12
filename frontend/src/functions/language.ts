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

const getLanguageKoreanLabel = (language: string) => {
	return languageTextKoreanMap.get(language) ?? '한국어'
}

const getLangaugeImage = (language: string) => {
	return languageImageMap.get(language) ?? koreanIcon
}

const getLanguageEmoji = (language: string) => {
	return languageEmojiMap.get(language) ?? '🇰🇷'
}

export { getLangaugeImage, getLanguageKoreanLabel, getLanguageEmoji }
