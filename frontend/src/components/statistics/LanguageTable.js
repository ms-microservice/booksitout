import React from 'react'
import Error from '../common/Error'
// Functions
import { getLangaugeImage, getLanguageKoreanLabel } from '../../functions/language'

const LanguageTable = ({ languageData }) => {
	return (
		<>
			{languageData == null ? (
				<Error />
			) : (
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
										<img src={getLangaugeImage(language.language)} alt='' className='img-fluid' style={{ width: '30px' }} />
									</td>
									<td className='col-3'>
										<p>{getLanguageKoreanLabel(language.language)}</p>
									</td>

									<td className='col-4'>{language.doneBook}권</td>

									<td className='col-4'>{language.notDoneBook}권</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</>
	)
}

export default LanguageTable
