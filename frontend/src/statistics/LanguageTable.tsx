import React from 'react'
import Error from '../common/Error'
import { getLangaugeImage, getLanguageConfig, getLanguageKoreanLabel } from '../functions/language'

const LanguageTable = ({ languageData }) => {
	React.useEffect(() => {
		console.log(languageData)
	}, [])

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
									<td className="col-2 col-1 text-center align-items-center">
										<h1 className="mt-1">{getLanguageConfig(language.language)?.emoji}</h1>
									</td>

									<td className="col-3">
										<h5 className="mt-3">{getLanguageConfig(language.language)?.korean}</h5>
									</td>

									<td className="col-4">
										<h5 className="mt-3">
											<b className="text-book me-1">{language.doneBook}</b>권
										</h5>
									</td>

									<td className="col-4">
										<h5 className="mt-3">
											<b className="text-book me-1">{language.notDoneBook}</b>권
										</h5>
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
