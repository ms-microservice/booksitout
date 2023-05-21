import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import utils from "../../../functions/utils"
import messages from "../../../settings/messages"
import { ButtonGroup, ToggleButton } from "react-bootstrap"
import urls from "../../../settings/urls"
import SettingsCard from "../SettingsCard"

const LibrarySearchMethodSettings = () => {
	const [currentApiKey, setCurrentApiKey] = useState(localStorage.getItem('library-search-method') || 'REGION')

	const settingsList = [
		{
			key: 1,
			label: '지역',
			apiKey: 'REGION',
		},
		{
			key: 2,
			label: '직접 지정',
			apiKey: 'SPECIFIC',
		},
	]

	const changeSetting = (apiKey: string) => {
		if (apiKey === currentApiKey) {
			toast.error(apiKey === 'REGION' ? '이미 지역으로 검색하고 있어요' : '이미 지정하신 도서관으로 검색하고 있어요')
			return
		}

		axios
			.put(
				`${urls.api.base}/v3/search/settings/offline-library/search-method`,
				{ method: apiKey },
				{ headers: { Authorization: utils.getToken() } }
			)
			.then((res) => {
				if (res.status === 200) {
					if (apiKey === 'REGION') {
						toast.success('이제 도서관은 지역으로 검색할게요')
					}

					if (apiKey === 'SPECIFIC') {
						toast.success('이제 직접 지정하신 도서관을 검색할게요')
					}

					localStorage.setItem('library-search-method', apiKey)
					setCurrentApiKey(apiKey)
				} else {
					toast.error(messages.error)
				}
			})
			.catch(() => {
				toast.error(messages.error)
			})
	}

	return (
		<SettingsCard
			title='검색 방법'
			content={
				<div className='row justify-content-center'>
					<div className='ms-md-5 mb-5'>
						<p className='text-secondary mb-3 mb-md-2'>특정 지역에 있는 모든 도서관을 검색하거나 내가 검색하고 싶은 도서관을 지정할 수 있어요</p>
						<p className='text-secondary mb-3 mb-md-2'>지역은 1곳만 지정할 수 있어요</p>
					</div>

					<ButtonGroup className='col-12 col-md-8 col-xl-6' style={{ position: 'absolute', bottom: '20px' }}>
						{settingsList.map((setting) => {
							return (
								<ToggleButton
									className='w-100'
									value={setting.apiKey}
									key={setting.key}
									type='radio'
									checked={false}
									onClick={() => changeSetting(setting.apiKey)}
									variant={setting.apiKey === currentApiKey ? 'book' : 'outline-book'}>
									{setting.label}
								</ToggleButton>
							)
						})}
					</ButtonGroup>
				</div>
			}
		/>
	)
}

export default LibrarySearchMethodSettings