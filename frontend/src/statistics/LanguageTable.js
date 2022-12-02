import React from 'react'
// Icons
import koreanIcon from '../resources/images/language/korea.png'
import englishIcon from '../resources/images/language/usa.png'
import japaneseIcon from '../resources/images/language/japan.png'
import chineseIcon from '../resources/images/language/china.png'
import frenchIcon from '../resources/images/language/france.png'
import spanishIcon from '../resources/images/language/spain.png'

const LanguageTable = ({ languageData }) => {
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
		<table className='table table-hover mt-3'>
			<thead className='table-dark'>
				<tr>
					<th></th>
					<th>언어</th>
					<th>다 읽은 책</th>
					<th>아직 못 읽은 책</th>
				</tr>
			</thead>

			<tbody>
				{languageData.map((language) => {
					return (
						<tr>
							<td className='col-1'>
								<img src={languageImageMap.get(language.title)} alt='' className='img-fluid' style={{ width: '30px' }} />
							</td>
							<td className='col-3'>
								<p>{languageTextMap.get(language.title)}</p>
							</td>

							<td className='col-4'>{language.done}권</td>

							<td className='col-4'>{language.notDone}권</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default LanguageTable
