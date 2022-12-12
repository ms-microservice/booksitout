import React from 'react'
import { Card } from 'react-bootstrap'
import { getLangaugeImage, getLanguageKoreanLabel } from '../../../functions/language'

const LanguageInfo = ({ language }) => {
	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={getLangaugeImage(language)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{getLanguageKoreanLabel(language)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default LanguageInfo
