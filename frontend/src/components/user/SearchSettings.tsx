import { useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import search from '../../functions/search'
import toast from 'react-hot-toast'
import messages from '../../settings/messages'
import '../../resources/css/button.css'

import { MdAddCircle as AddIcon } from 'react-icons/md'
import { AiFillMinusCircle as DeleteIcon } from 'react-icons/ai'

import aladin from '../../resources/images/search/aladin.png'
import interpark from '../../resources/images/search/interpark.png'
import kyobo from '../../resources/images/search/kyobo.jpg'
import millie from '../../resources/images/search/millie.png'
import ridi from '../../resources/images/search/ridi.png'
import yes24 from '../../resources/images/search/yes24.png'

import seoulLibrary from '../../resources/images/search/seoul-library.png'
import seoulEducationLibrary from '../../resources/images/search/seoul-education-library.png'
import nationalAssemblyLibrary from '../../resources/images/search/national-assembly-library.png'

const SearchSettings = () => {
	const onlineLibraryList = [
		{
			icon: seoulLibrary,
			name: '서울 전자도서관',
			key: 'SEOUL_LIBRARY',
			included: search.settings.onlineLibrary.isPresent('SEOUL_LIBRARY'),
		},
		{
			icon: seoulEducationLibrary,
			name: '서울교육청 전자도서관',
			key: 'SEOUL_EDUCATION_LIBRARY',
			included: search.settings.onlineLibrary.isPresent('SEOUL_EDUCATION_LIBRARY'),
		},
		{
			icon: nationalAssemblyLibrary,
			name: '국회 전자도서관',
			key: 'NATIONAL_ASSEMBLY_LIBRARY',
			included: search.settings.onlineLibrary.isPresent('NATIONAL_ASSEMBLY_LIBRARY'),
		},
	]
	const subscriptionList = [
		{
			icon: millie,
			name: '밀리의 서재',
			key: 'MILLIE',
			included: search.settings.subscription.isPresent('MILLIE'),
		},
		{
			icon: ridi,
			name: '리디 셀렉트',
			key: 'RIDI',
			included: search.settings.subscription.isPresent('RIDI'),
		},
		{
			icon: yes24,
			name: 'YES24 북클럽',
			key: 'YES24',
			included: search.settings.subscription.isPresent('YES24'),
		},
		{
			icon: kyobo,
			name: '교보문고 SAM',
			key: 'KYOBO',
			included: search.settings.subscription.isPresent('KYOBO'),
		},
	]
	const usedOnlineList = [
		{
			icon: aladin,
			name: '알라딘 직접배송',
			key: 'ALADIN',
			included: search.settings.usedOnline.isPresent('ALADIN'),
		},
		{
			icon: yes24,
			name: 'YES24',
			key: 'YES24',
			included: search.settings.usedOnline.isPresent('YES24'),
		},
		{
			icon: kyobo,
			name: '교보문고 중고',
			key: 'KYOBO',
			included: search.settings.usedOnline.isPresent('KYOBO'),
		},
		{
			icon: interpark,
			name: '인터파크 중고도서',
			key: 'INTERPARK',
			included: search.settings.usedOnline.isPresent('INTERPARK'),
		},
	]
	const usedOfflineList = [
		{
			icon: aladin,
			name: '알라딘 우주점',
			key: 'ALADIN',
			included: search.settings.usedOffline.isPresent('ALADIN'),
		},
		{
			icon: yes24,
			name: 'YES24',
			key: 'YES24',
			included: search.settings.usedOffline.isPresent('YES24'),
		},
	]

	return (
		<Card className='mb-5'>
			<Card.Body className='text-center'>
				<h3 className='mb-4'>검색 설정</h3>

				<div className='row row-eq-height '>
					<div className='col-12 col-lg-6 mb-3'>
						<MyBookSettings />
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<LibrarySearchSettings />
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings title='전자 도서관 검색' includedLabel='검색 범위로 설정된 전자 도서관' excludedLabel='제외된 전자 도서관' initialServiceList={onlineLibraryList} apiFunction={search.api.libraryOnline.changeSearchRange} localStorageKey='search-library-online' />
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings title='구독 서비스 검색' includedLabel='검색 범위로 설정된 구독 서비스' excludedLabel='제외된 구독 서비스' initialServiceList={subscriptionList} apiFunction={search.api.subscription.changeSearchRange} localStorageKey='search-subscription' />
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings title='중고 (온라인) 검색' includedLabel='검색 범위로 설정된 구독 서비스' excludedLabel='제외된 중고 온라인' initialServiceList={usedOnlineList} apiFunction={search.api.usedOnline.changeSearchRange} localStorageKey='search-used-online' />
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings title='중고 매장 검색' includedLabel='검색 범위로 설정된 중고 매장' excludedLabel='제외된 중고 매장' initialServiceList={usedOfflineList} apiFunction={search.api.usedOffline.changeSearchRange} localStorageKey='search-used-offline' />
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const MyBookSettings = () => {
	const initialRange: string = search.settings.myBook.range()
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [selectedRange, setSelectedRange] = useState(initialRange)

	useEffect(() => {
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

		search.api.myBook.changeSearchRange(selectedRange).then((status) => {
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
		<>
			<Card className='h-100'>
				<Card.Body>
					<h4 className='mt-3 mb-3'>내 책 검색</h4>

					<Form className='row justify-content-center align-items-center' onSubmit={(e) => handleSubmit(e)}>
						<div className='col-4'>
							<h6 className='mt-2'>검색 범위</h6>
						</div>

						<div className='col-8'>
							<Form.Select onChange={(e) => setSelectedRange(e.target.value)}>
								{options.map((option) => {
									return (
										<option value={option.value} selected={initialRange === option.value}>
											{option.display}
										</option>
									)
								})}
							</Form.Select>
						</div>

						<div className='col-12 col-lg-6 mt-4'>
							<Button type='submit' className='w-100' disabled={buttonDisabled}>
								검색 범위 수정하기
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</>
	)
}

const LibrarySearchSettings = () => {
	const regionData = [
		{ displayName: '서울', value: 'SEOUL' },
		{ displayName: '부산', value: 'BUSAN' },
		{ displayName: '대구', value: 'DAEGU' },
		{ displayName: '인천', value: 'INCHEON' },
		{ displayName: '광주', value: 'GWANGJU' },
		{ displayName: '대전', value: 'DAEJEON' },
		{ displayName: '울산', value: 'ULSAN' },
		{ displayName: '세종', value: 'SEJONG' },
		{ displayName: '경기도', value: 'GYEONGGIDO' },
		{ displayName: '강원도', value: 'GANGWONDO' },
		{ displayName: '충청북도', value: 'CHUNGCHEONGBUKDO' },
		{ displayName: '충청남도', value: 'CHUNGCHEONGNAMDO' },
		{ displayName: '전라북도', value: 'JEOLLABUKDO' },
		{ displayName: '전라남도', value: 'JEOLLANAMDO' },
		{ displayName: '경상북도', value: 'GYEONGSANGBUKDO' },
		{ displayName: '경상남도', value: 'GYEONGSANGNAMDO' },
		{ displayName: '제주', value: 'JEJU' },
	]
	const regionDetailData = [
		{ value: 'JONGNOGU', displayName: '종로구' },
		{ value: 'JUNGGU', displayName: '중구' },
		{ value: 'YONGSANGU', displayName: '용산구' },
		{ value: 'SEONGDONGGU', displayName: '성동구' },
		{ value: 'GWANGJINGU', displayName: '광진구' },
		{ value: 'DONGDAEMUNGU', displayName: '동대문구' },
		{ value: 'JUNGNANGGU', displayName: '중랑구' },
		{ value: 'SEONGBUKGU', displayName: '성북구' },
		{ value: 'GANGBUKGU', displayName: '강북구' },
		{ value: 'DOBONGGU', displayName: '도봉구' },
		{ value: 'NOWONGU', displayName: '노원구' },
		{ value: 'EUNPYEONGGU', displayName: '은평구' },
		{ value: 'SEODAEMUNGU', displayName: '서대문구' },
		{ value: 'MAPOGU', displayName: '마포구' },
		{ value: 'YANGCHEONGU', displayName: '양천구' },
		{ value: 'GANGSEOGU', displayName: '강서구' },
		{ value: 'GUROGU', displayName: '구로구' },
		{ value: 'GEUMCHEONGU', displayName: '금천구' },
		{ value: 'YEONGDEUNGPOGU', displayName: '영등포구' },
		{ value: 'DONGJAKGU', displayName: '동작구' },
		{ value: 'GWANAKGU', displayName: '관악구' },
		{ value: 'SEOCHOGU', displayName: '서초구' },
		{ value: 'GANGNAMGU', displayName: '강남구' },
		{ value: 'SONGPAGU', displayName: '송파구' },
		{ value: 'GANGDONGGU', displayName: '강동구' },
	]

	const [modalOpen, setModalOpen] = useState(false)

	const [region, setRegion] = useState(search.settings.library.display.region())
	const [regionDetail, setRegionDetail] = useState(search.settings.library.display.regionDetail())

	const [editedRegion, setEditedRegion] = useState(region === '' ? 'SEOUL' : search.settings.library.api.region())
	const [editedRegionDetail, setEditedRegionDetail] = useState(regionDetail === '' ? 'JONGNOGU' : search.settings.library.api.regionDetail())

	const handleSubmit = (e) => {
		e.preventDefault()

		if (editedRegion === region && editedRegionDetail === regionDetail) {
			toast.error('지역이 변경되지 않았어요')
			return
		}

		search.api.library.changeRegion(editedRegion, editedRegionDetail).then((status) => {
			if (status === 200) {
				toast.success('지역을 변경했어요')

				search.settings.library.update.region(regionData.find((r) => r.value === editedRegion)?.displayName ?? '', editedRegion)
				search.settings.library.update.regionDetail(regionDetailData.find((r) => r.value === editedRegionDetail)?.displayName ?? '', editedRegionDetail)

				setRegion(search.settings.library.display.region())
				setRegionDetail(search.settings.library.display.regionDetail())

				setModalOpen(false)
			} else {
				toast.error(messages.error)
			}
		})
	}

	const handleDeleteRegion = () => {
		if (window.confirm('설정된 지역을 삭제할까요?')) {
			search.api.library.deleteRegion().then((status) => {
				if (status === 200) {
					toast.success('지역을 삭제했어요. 이제 도서관은 검색하지 않을게요')
					localStorage.setItem('search-library-region-api', '')
					localStorage.setItem('search-library-region-display', '')
					localStorage.setItem('search-library-region-detail-api', '')
					localStorage.setItem('search-library-region-detail-display', '')
					setRegion('')
					setRegionDetail('')
				} else {
					toast.error(messages.error)
				}
			})
		}
	}

	return (
		<>
			<Modal show={modalOpen} onHide={() => setModalOpen(false)} fullscreen='md-down'>
				<Modal.Header closeButton>
					<h5 className='text-center w-100'>지역 설정하기</h5>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Label>시 / 도</Form.Label>
						<Form.Select className='mb-3' onChange={(e) => setEditedRegion(e.currentTarget.value)} disabled>
							{regionData.map((r) => {
								return (
									<option value={r.value} selected={r.displayName === region}>
										{r.displayName}
									</option>
								)
							})}
						</Form.Select>

						<Form.Label>동 / 시</Form.Label>
						<Form.Select className='mb-3' onChange={(e) => setEditedRegionDetail(e.currentTarget.value)}>
							{regionDetailData.map((r) => {
								return (
									<option value={r.value} selected={r.displayName === regionDetail}>
										{r.displayName}
									</option>
								)
							})}
						</Form.Select>

						<Button variant='success' type='submit' className='w-100 mt-4 mt-md-0'>
							저장하기
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

			<Card className=' h-100'>
				<Card.Body>
					<h4 className='mb-4'>도서관 검색</h4>

					<div className='row justify-content-center'>
						<h5>
							{`설정된 지역 :`} <b>{`${region === '' && regionDetail === '' ? '없음' : `${region} ${regionDetail}`}`}</b>
						</h5>

						<div className='col-12 col-lg-6 mt-3'>
							<Button className='w-100 mb-2' onClick={() => setModalOpen(true)}>
								{region === '' && regionDetail === '' ? '지역 설정하기' : '지역 변경하기'}
							</Button>
						</div>

						{region !== '' && regionDetail !== '' && (
							<div className='col-12 col-lg-6 mt-3'>
								<Button variant='danger' className='w-100 mb-2' onClick={() => handleDeleteRegion()}>
									도서관은 검색 하지 않기
								</Button>
							</div>
						)}
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

const AddOrExcludeSearchSettings = ({ title, includedLabel, excludedLabel, initialServiceList, apiFunction, localStorageKey }) => {
	const iconStyle = { widht: '50px', height: '50px' }

	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [serviceList, setServiceList] = useState(initialServiceList)

	const includeExclude = (key: string) => {
		setServiceList(serviceList.map((s) => (s.key === key ? { ...s, included: !s.included } : s)))
	}

	useEffect(() => {
		const filteredList = serviceList.filter((service) => initialServiceList.find((s) => s.key === service.key).included === service.included)
		setButtonDisabled(filteredList.length >= serviceList.length)
	}, [serviceList, initialServiceList])

	const handleSubmit = (e) => {
		e.preventDefault()

		const range: string = serviceList
			.filter((s) => s.included)
			.map((s) => s.key)
			.join(',')
		const rangeDisplay: string = serviceList
			.filter((s) => s.included)
			.map((s) => s.name)
			.join(',')

		apiFunction(range).then((status) => {
			if (status === 200) {
				localStorage.setItem(`${localStorageKey}-api`, range.toUpperCase())
				localStorage.setItem(`${localStorageKey}-display`, rangeDisplay)
				toast.success(`${title} 범위를 수정했어요`)
				setButtonDisabled(true)
			} else {
				toast.error(messages.error)
			}
		})
	}

	return (
		<Card className='h-100'>
			<Card.Body className='h-100'>
				<h4 className='mt-3 mb-3'>{title}</h4>

				<Form onSubmit={(e) => handleSubmit(e)}>
					<Card className='mb-3' style={{ height: '180px' }}>
						<Card.Header style={{ backgroundColor: 'rgb(83, 165, 81)', color: 'white' }}>{includedLabel}</Card.Header>

						<Card.Body>
							<div className='row justify-content-center'>
								{serviceList
									.filter((s) => s.included)
									.map((service) => {
										return (
											<div className='col-3 button-hover' onClick={() => includeExclude(service.key)}>
												<DeleteIcon className='h5 text-danger ms-5 position-absolute' />

												<img src={service.icon} alt='' className='img-fluid rounded' style={iconStyle} />
												<h6 className='mt-2'>{service.name}</h6>
											</div>
										)
									})}
							</div>
						</Card.Body>
					</Card>

					<Card className='mb-3' style={{ height: '180px' }}>
						<Card.Header style={{ backgroundColor: 'rgb(203, 68, 74)', color: 'white' }}>{excludedLabel}</Card.Header>

						<Card.Body>
							<div className='row justify-content-center'>
								{serviceList
									.filter((s) => !s.included)
									.map((service) => {
										return (
											<div className='col-3 button-hover' onClick={() => includeExclude(service.key)}>
												<AddIcon className='h5 text-success ms-5 position-absolute' />

												<img src={service.icon} alt='' className='img-fluid rounded' style={iconStyle} />
												<h6 className='mt-2'>{service.name}</h6>
											</div>
										)
									})}
							</div>
						</Card.Body>
					</Card>

					<div className='row justify-content-center'>
						<div className='col-12 col-lg-6'>
							<Button type='submit' className='w-100' disabled={buttonDisabled}>
								수정하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default SearchSettings
