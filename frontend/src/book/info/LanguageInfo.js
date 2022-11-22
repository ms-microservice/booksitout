import React from 'react'
import { Card } from 'react-bootstrap'

// Icons
import koreanIcon from '../../resources/images/language/korea.png'
import englishIcon from '../../resources/images/language/usa.png'
import japaneseIcon from '../../resources/images/language/japan.png'
import chineseIcon from '../../resources/images/language/china.png'
import frenchIcon from '../../resources/images/language/france.png'
import spanishIcon from '../../resources/images/language/spain.png'

const LanguageInfo = ({ language }) => {
	const languageTextMap = new Map([
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

	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={languageImageMap.get(language)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{languageTextMap.get(language)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default LanguageInfo
