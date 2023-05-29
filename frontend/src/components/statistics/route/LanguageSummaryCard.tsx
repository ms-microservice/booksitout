import React from 'react'
import { Card } from 'react-bootstrap'
import LanguageTable from '../LanguageTable'
import CardTitle from '../../../common/CardTitle'
import { MdOutlineLanguage as LanguageIcon } from 'react-icons/md'

const LanguageSummaryCard = ({ languageData }) => {
	return (
		<Card className='h-100'>
			<Card.Body>
				<CardTitle icon={<LanguageIcon />} title={'언어별 독서현황'} iconSize='h1' />

				<LanguageTable languageData={languageData} />
			</Card.Body>
		</Card>
	)
}

export default LanguageSummaryCard