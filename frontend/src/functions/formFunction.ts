import physicalBookIcon from '../resources/images/book-classifications/forms/physical-book.png'
import ebookBookIcon from '../resources/images/book-classifications/forms/ebook.png'
import audioBookIcon from '../resources/images/book-classifications/forms/audio-book.png'

const formKoreanLabelMap = new Map([
	['PHYSICAL', '종이책'],
	['EBOOK', '이북'],
	['AUDIO', '오디오북'],
])
const formIconMap = new Map([
	['PHYSICAL', physicalBookIcon],
	['EBOOK', ebookBookIcon],
	['AUDIO', audioBookIcon],
])

const getFormImage = (form: string) => {
	return formIconMap.get(form.toUpperCase())
}
const getFormKoreanLabel = (form: string) => {
	return formKoreanLabelMap.get(form.toUpperCase())
}

export { getFormImage, getFormKoreanLabel }
