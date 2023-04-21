import { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import search from '../../functions/search'
import toast from 'react-hot-toast'
import messages from '../../settings/messages'
import '../../resources/css/button.css'

import { MdAddCircle as AddIcon } from 'react-icons/md'
import { AiFillMinusCircle as DeleteIcon } from 'react-icons/ai'

const SearchSettings = () => {
	return (
		<Card className='mb-5'>
			<Card.Body className='text-center'>
				<h3 className='mb-4'>검색 설정</h3>

				<div className='row row-eq-height '>
					<div className='col-12 col-lg-6 mb-3'>
						<MyBookSettings />
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<a href='/settings/search/library' className='text-decoration-none text-black '>
							<Card className=' h-100'>
								<Card.Body>
									<h4 style={{ marginTop: '65px', marginBottom: '65px' }}>도서관 검색</h4>
								</Card.Body>
							</Card>
						</a>
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings
							title='전자 도서관 검색'
							includedLabel='검색 범위로 설정된 전자 도서관'
							excludedLabel='제외된 전자 도서관'
							initialServiceList={search.data.onlineLibrary}
							apiFunction={search.api.settings.libraryOnline.changeSearchRange}
							localStorageKey='search-library-online'
						/>
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings
							title='구독 서비스 검색'
							includedLabel='검색 범위로 설정된 구독 서비스'
							excludedLabel='제외된 구독 서비스'
							initialServiceList={search.data.subscription}
							apiFunction={search.api.settings.subscription.changeSearchRange}
							localStorageKey='search-subscription'
						/>
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings
							title='중고 (온라인) 검색'
							includedLabel='검색 범위로 설정된 중고 온라인'
							excludedLabel='제외된 중고 온라인'
							initialServiceList={search.data.usedOnline}
							apiFunction={search.api.settings.usedOnline.changeSearchRange}
							localStorageKey='search-used-online'
						/>
					</div>

					<div className='col-12 col-lg-6 mb-3'>
						<AddOrExcludeSearchSettings
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
	)
}

const MyBookSettings = () => {
	const initialRange: string = search.local.settings.myBook.range()
	
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
							<Button variant='book' type='submit' className='w-100' disabled={buttonDisabled}>
								검색 범위 수정하기
							</Button>
						</div>
					</Form>
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

		apiFunction(range).then((status) => {
			if (status === 200) {
				localStorage.setItem(`${localStorageKey}-api`, range.toUpperCase())
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
					<Card className='mb-3' style={{ height: '180px', overflow: serviceList.filter((s) => s.included).length > 4 ? 'scroll' : 'hidden'} }>
						<Card.Header style={{ backgroundColor: 'rgb(83, 165, 81)', color: 'white' }}>{includedLabel}</Card.Header>

						<Card.Body>
							<div className='row justify-content-center'>
								{serviceList
									.filter((s) => s.included)
									.map((service) => {
										return (
											<div className='col-3 button-hover p-0 mb-3' onClick={() => includeExclude(service.key)}>
												<DeleteIcon className='h5 text-danger ms-5 position-absolute' />

												<img src={service.icon} alt='' className='img-fluid rounded' style={iconStyle} />
												<h6 className='mt-2'>{service.name}</h6>
											</div>
										)
									})}
							</div>
						</Card.Body>
					</Card>

					<Card className='mb-3' style={{ height: '180px', overflow: serviceList.filter((s) => !s.included).length > 4 ? 'scroll' : 'hidden'} }>
						<Card.Header style={{ backgroundColor: 'rgb(203, 68, 74)', color: 'white' }}>{excludedLabel}</Card.Header>

						<Card.Body>
							<div className='row justify-content-center'>
								{serviceList
									.filter((s) => !s.included)
									.map((service) => {
										return (
											<div className='col-3 button-hover mb-3' onClick={() => includeExclude(service.key)}>
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
							<Button variant='book' type='submit' className='w-100' disabled={buttonDisabled}>
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
