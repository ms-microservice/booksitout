import React from 'react'
// Components
import Error from '../common/Error'
// Functions
import { getLangaugeImage, getLanguageKoreanLabel } from '../../functions/language'

const LanguageTable = ({ languageData }) => {
	return (
		<>
			{languageData == null ? (
				<Error />
			) : (
				<table className='table table-hover mt-3 rounded rounded-3 overflow-hidden'>
					<thead className='table-dark'>
						<tr>
							<th></th>
							<th>언어</th>
							<th>다 읽은 책</th>
							<th>읽는 중</th>
						</tr>
					</thead>

					<tbody>
						{languageData.map((language) => {
							return (
								<tr>
									<td className='col-2 col-1 text-center align-items-center'>
										<img src={getLangaugeImage(language.language)} alt='' className='img-fluid mt-2 mb-2' style={{ width: '20px' }} />
									</td>

									<td className='col-3'>
										<p className='mt-2 mb-2'>{getLanguageKoreanLabel(language.language)}</p>
									</td>

									<td className='col-4'>
										<p className='mt-2 mb-2'>{language.doneBook}권</p>
									</td>

									<td className='col-4'>
										<p className='mt-2 mb-2'>{language.notDoneBook}권</p>
									</td>
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
