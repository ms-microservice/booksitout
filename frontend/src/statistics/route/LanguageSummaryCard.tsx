import React from 'react'
import { Card, Modal } from 'react-bootstrap'
import LanguageTable from '../LanguageTable'
import CardTitle from '../../common/CardTitle'
import { MdOutlineLanguage as LanguageIcon } from 'react-icons/md'
import styled from 'styled-components';
import { Chart, ArcElement } from 'chart.js'
import AllButton from '../../common/AllButton'
import PieChart from '../PieChart'
import { LanguageType } from '../../types/StatisticsType'
import Error from '../../common/Error';
import languageConfig from '../../config/languageConfig'

const LanguageSummaryCard = ({ languageData }) => {
	Chart.register(ArcElement);
	const [show, setShow] = React.useState<boolean>(false)

	const [languageSorted, setLanguageSorted] = React.useState<LanguageType[] | null>(null)
	React.useEffect(() => {
		console.log(languageData)

		setLanguageSorted(
			languageData == null
				? []
				: languageData
						.filter(l => l.doneBook !== 0 || l.notDoneBook !== 0)
						.sort((a, b) => a.doneBook + a.notDoneBook - (b.doneBook + b.notDoneBook)),
		)
	}, [])

	const pieLabel = languageSorted == null ? [] : languageSorted.map(l => languageConfig(l.language)?.korean ?? '')
	const pieData = languageSorted == null ? [] : languageSorted.map(l => l.doneBook + l.notDoneBook)
	const pieColor = languageSorted == null ? [] : languageSorted.map(l => languageConfig(l.language)?.color ?? [])

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} centered fullscreen="md-down">
				<Modal.Header closeButton>
					<CardTitle icon={<LanguageIcon />} title={'언어별 독서현황'} mb={0} />
				</Modal.Header>

				<Modal.Body className="pt-0">
					<LanguageTable languageData={languageData} />
				</Modal.Body>
			</Modal>

			<Card className="h-100">
				<Card.Body>
					<CardTitle icon={<LanguageIcon />} title={'언어별 독서현황'} iconSize={1} />

					{languageData == null ? (
						<Error />
					) : (
						<>
							<div className="row">
								<div className="col-12">
									<PieContainer>
										<PieChart size={250} labels={pieLabel} data={pieData} background={pieColor} />
									</PieContainer>
								</div>

								<div className="col-4"></div>
							</div>

							<AllButton url="" onClick={() => setShow(true)} />
						</>
					)}
				</Card.Body>
			</Card>
		</>
	)
}

const PieContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 15px;
`

export default LanguageSummaryCard