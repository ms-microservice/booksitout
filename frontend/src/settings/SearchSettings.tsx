import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import search from '../functions/search'
import toast from 'react-hot-toast'
import messages from '../settings/messages'
import '../resources/css/button.css'

import axios from 'axios'
import urls from '../settings/urls'
import utils from '../functions/utils'

import SettingsLinkCard from './SettingsLinkCard'
import AddRemoveSearchSettings from './library-settings/AddRemoveSearchSettings'

const SearchSettings = () => {
	React.useEffect(() => {
		axios.get(`${urls.api.base}/v3/search/settings/search-range/all`, { headers: { Authorization: utils.getToken() } }).then((res) => {
			localStorage.setItem('search-library-region-api', res.data.region)
			localStorage.setItem('search-library-region-detail-api', res.data.regionDetail)
			localStorage.setItem('search-my-book-range', res.data.myBookSearchRange)
			localStorage.setItem('search-library-online-api', res.data.libraryOnlineSearchRange)
			localStorage.setItem('search-subscription-api', res.data.subscriptionSearchRange)
			localStorage.setItem('search-used-online-api', res.data.usedOnlineSearchRange)
			localStorage.setItem('search-used-offline-api', res.data.usedOfflineSearchRange)
			localStorage.setItem('library-search-method', res.data.librarySearchMethod)
		})
	}, [])

	return (
		<div className='container-xl'>
			<Card className='mb-5 h-100'>
				<Card.Body>
					<h3 className='mb-5'>검색 설정</h3>

					<div className='row row-eq-height h-100'>
						<div className='col-12 col-lg-6 mb-4' style={{ height: '300px' }}>
							<MyBookSettings />
						</div>

						<div className='col-12 col-lg-6 mb-4' style={{ height: '300px' }}>
							<SettingsLinkCard
								title='도서관 검색'
								contentList={['검색 방법 (지역, 직접지정)', '지역 설정', '도서관 검색해서 추가']}
								link='/settings/search/library'
							/>
						</div>

						<div className='col-12 mb-4'>
							<AddRemoveSearchSettings
								title='전자 도서관 검색'
								includedLabel='검색 범위로 설정된 전자 도서관'
								excludedLabel='제외된 전자 도서관'
								initialServiceList={search.data.onlineLibrary}
								apiFunction={search.api.settings.libraryOnline.changeSearchRange}
								localStorageKey='search-library-online'
							/>
						</div>

						<div className='col-12 mb-4'>
							<AddRemoveSearchSettings
								title='구독 서비스 검색'
								includedLabel='검색 범위로 설정된 구독 서비스'
								excludedLabel='제외된 구독 서비스'
								initialServiceList={search.data.subscription}
								apiFunction={search.api.settings.subscription.changeSearchRange}
								localStorageKey='search-subscription'
							/>
						</div>

						<div className='col-12 mb-4'>
							<AddRemoveSearchSettings
								title='중고 (온라인) 검색'
								includedLabel='검색 범위로 설정된 중고 온라인'
								excludedLabel='제외된 중고 온라인'
								initialServiceList={search.data.usedOnline}
								apiFunction={search.api.settings.usedOnline.changeSearchRange}
								localStorageKey='search-used-online'
							/>
						</div>

						<div className='col-12 mb-4'>
							<AddRemoveSearchSettings
								title='중고 매장 검색'
								includedLabel='검색 범위로 설정된 중고 매장'
								excludedLabel='제외된 중고 매장'
								initialServiceList={search.data.usedOffline}
								apiFunction={search.api.settings.usedOffline.changeSearchRange}
								localStorageKey='search-used-offline'
							/>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

const MyBookSettings = () => {
	const initialRange: string = search.local.settings.myBook.range()
	
	const [buttonDisabled, setButtonDisabled] = React.useState(true)
	const [selectedRange, setSelectedRange] = React.useState(initialRange)

	React.useEffect(() => {
		setButtonDisabled(selectedRange === initialRange)
	}, [selectedRange, initialRange])

	const options = [
		{
			value: 'ALL',
			display: '전체',
		},
		{
			value: 'ONLY_READING',
			display: '읽고 있는 책만',
		},
		{
			value: 'ONLY_DONE',
			display: '다 읽은 책만',
		},
		{
			value: 'EXCLUDE_GIVE_UP',
			display: '포기한 책만 빼고',
		},
	]

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		search.api.settings.myBook.changeSearchRange(selectedRange).then((status) => {
			if (status === 200) {
				toast.success('내 책 검색 범위를 수정했어요')
				localStorage.setItem('search-my-book-range', selectedRange)
				setButtonDisabled(true)
			} else {
				toast.error(messages.error)
			}
		})
	}

	return (
		<Card className='h-100'>
			<Card.Body>
				<h4>내 책 검색</h4>

				<Form className='h-100 mt-5' onSubmit={handleSubmit}>
					<Form.Label>검색 범위</Form.Label>

					<Form.Select onChange={(e) => setSelectedRange(e.target.value)}>
						{options.map((option) => {
							return (
								<option value={option.value} selected={initialRange === option.value}>
									{option.display}
								</option>
							)
						})}
					</Form.Select>

					<div style={{ position: 'absolute', bottom: '20px', width: '95%', left: '2.5%' }}>
						<Button variant='book' type='submit' className='w-100' disabled={buttonDisabled}>
							검색 범위 수정하기
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default SearchSettings
