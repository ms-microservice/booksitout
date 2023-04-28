import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, ButtonGroup, Card, Form, Modal, ToggleButton, Placeholder } from 'react-bootstrap'
import { AiFillCheckCircle as CheckIcon, AiFillMinusCircle as RemoveIcon } from 'react-icons/ai'
import toast from 'react-hot-toast'
// Components
import NoContent from '../common/NoContent'
// Functions, Settings
import search from '../../functions/search'
import messages from '../../settings/messages'
import urls from '../../settings/urls'
// Resources
import libraryLoading from '../../resources/images/common/library-loading.png'
import '../../resources/css/button.css'
import '../../resources/css/library-search.css'
import utils from '../../functions/utils'

const SearchLibrarySettings = () => {
  return (
		<div className='container'>
			<SearchMethodSettings />
			<RegionBasedSearchSettings />
			<SpecificSearchSettings />
		</div>
  )
}

const SearchMethodSettings = () => {
    const [currentApiKey, setCurrentApiKey] = useState('')
	useEffect(() => {
		// fetch(`${urls.api.base}/v3/search/library/settings/method`, {
		// 	method: 'GET',
		// 	headers: {
		// 		Authorization: utils.getToken()!!,
		// 	},
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		console.log(data)
		// 		setCurrentApiKey(data.method)
		// 	})
	}, [])

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
        }
    ]

    const changeSetting = (apiKey: string) => {
		if (apiKey === currentApiKey) {
			toast.error(apiKey === 'REGION' ? '이미 지역으로 검색하고 있어요' : '이미 지정하신 도서관으로 검색하고 있어요')
			return
		}

		// TODO : Post Search Method

		if (apiKey === 'REGION') {
			toast.success('이제 도서관은 지역으로 검색할게요')
		}

		if (apiKey === 'SPECIFIC') {
			toast.success('이제 직접 지정하신 도서관을 검색할게요')
		}

		setCurrentApiKey(apiKey)
	}

    return (
		<Card className='text-center mb-4'>
			<Card.Body>
				<h3 className='mt-3 mb-3'>검색 방법</h3>

				<div className='row justify-content-center'>
					<ButtonGroup className='col-12 col-md-8 col-xl-6'>
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
			</Card.Body>
		</Card>
	)
}

const RegionBasedSearchSettings = () => {
	const regionData = search.data.region
	const regionDetailData = search.data.regionDetail.get('SEOUL')

	const [modalOpen, setModalOpen] = useState(false)

	const [region, setRegion] = useState(search.local.settings.library.display.region())
	const [regionDetail, setRegionDetail] = useState(search.local.settings.library.display.regionDetail())

	const [editedRegion, setEditedRegion] = useState(region === '' ? 'SEOUL' : search.local.settings.library.api.region())
	const [editedRegionDetail, setEditedRegionDetail] = useState(regionDetail === '' ? 'JONGNOGU' : search.local.settings.library.api.regionDetail())

	const handleSubmit = (e) => {
		e.preventDefault()

		if (editedRegion === region && editedRegionDetail === regionDetail) {
			toast.error('지역이 변경되지 않았어요')
			return
		}

		search.api.settings.library.changeRegion(editedRegion, editedRegionDetail).then((status) => {
			if (status === 200) {
				toast.success('지역을 변경했어요')

				search.local.settings.library.update.region(editedRegion)
				search.local.settings.library.update.regionDetail(editedRegionDetail)

				setRegion(search.local.settings.library.display.region())
				setRegionDetail(search.local.settings.library.display.regionDetail())

				setModalOpen(false)
			} else {
				toast.error(messages.error)
			}
		})
	}

	const handleDeleteRegion = () => {
		if (window.confirm('설정된 지역을 삭제할까요?')) {
			search.api.settings.library.deleteRegion().then((status) => {
				if (status === 200) {
					toast.success('지역을 삭제했어요. 이제 도서관은 검색하지 않을게요')
					localStorage.setItem('search-library-region-api', '')
					localStorage.setItem('search-library-region-detail-api', '')
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
							{regionDetailData?.map((r) => {
								return (
									<option value={r.value} selected={r.displayName === regionDetail}>
										{r.displayName}
									</option>
								)
							})}
						</Form.Select>

						<Button variant='book' type='submit' className='w-100 mt-4 mt-md-0'>
							저장하기
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

			<Card className='h-100 text-center mb-4'>
				<Card.Body>
					<h3 className='mb-4'>지역으로 검색하기</h3>

					<div className='row justify-content-center'>
						<h5>
							{`설정된 지역 :`} <b>{`${region === '' && regionDetail === '' ? '없음' : `${region} ${regionDetail}`}`}</b>
						</h5>

						{region !== '' && regionDetail !== '' && (
							<div className='col-12 col-lg-6 mt-3'>
								<Button variant='book-danger' className='w-100' onClick={() => handleDeleteRegion()}>
									도서관은 검색 하지 않기
								</Button>
							</div>
						)}

						<div className='col-12 col-lg-6 mt-3'>
							<Button variant='book' className='w-100' onClick={() => setModalOpen(true)}>
								{region === '' && regionDetail === '' ? '지역 설정하기' : '지역 변경하기'}
							</Button>
						</div>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

const SpecificSearchSettings = () => {
	interface LibraryResponse {
		name: string;
		icon: string;
		link: string | undefined;
		address: string;
		added: boolean;
	}

	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [query, setQuery] = useState<String>('')
	const [searchResult, setSearchResult] = useState<LibraryResponse[]>([])

	const handleSearch = (e) =>  {
		setQuery(e.target.value)
	}

	useEffect(() => {
		setLoading(query !== '')

		if (query === '') {
			setSearchResult([])
		}

		const typingTimer = setTimeout(() => {
			if (query !== '') {
				axios
					.get(`${urls.api.base}/v3/search/library/available-library/${query}`)
					.then((res) => setSearchResult(res.data))
					.catch(() => setError(true))
					.finally(() => {
						setLoading(false)
					})
			}
		}, 500)

		return () => clearTimeout(typingTimer)
	}, [query])

	const [addedLibrary, setAddedLibrary] = useState<LibraryResponse[]>([])
	const [selectedLibrary, setSelectedLibrary] = useState<LibraryResponse | null>(null)
	const [modalOpen, setModalOpen] = useState<Boolean>(false)

	useEffect(() => {
		// TODO : initial added library fetch
	}, [])

	const handleLibraryClicked = (library: LibraryResponse) => {
		setModalOpen(true)
		setSelectedLibrary(library)
	}
	const handleAddLibrary = () => {
		setModalOpen(false)

		// TODO : POST

		toast.success(`${selectedLibrary?.name.replaceAll(' ', '')}을 검색범위에 추가했어요`)
		setAddedLibrary([...addedLibrary, selectedLibrary!!])
		setSearchResult(searchResult.map((r) => {
			if (r.name === selectedLibrary?.name) return { ...r, added: true }
			else return r
		}))
	}
	const handleRemoveLibrary = (library: LibraryResponse) => {
		const confirm = window.confirm(`${library.name.replaceAll(' ', '')}을 검색범위에서 삭제할까요?`)
		if (!confirm) return
		
		setAddedLibrary(addedLibrary.filter((l) => l.name !== library.name))
		setSearchResult(
			searchResult.map((r) => {
				if (r.name === library.name) return { ...r, added: false }
				else return r
			})
		)

		toast.error(<>{library.name.replaceAll(' ', '')}은 이제 검색하지 않을게요</>)
	}

    return (
		<>
			<LibraryDetailModal library={selectedLibrary} show={modalOpen} setShow={setModalOpen} handleAddLibrary={handleAddLibrary} />

			<Card className='mb-4 text-center'>
				<Card.Body>
					<h3 className='mt-3 mb-4'>도서관 직접 지정해서 검색하기</h3>

					<Card className='mb-3'>
						<Card.Body>
							<h4 className='mt mb-3'>추가된 도서관</h4>

							<div style={{ height: '280px', overflowX: 'hidden', overflowY: 'scroll' }}>
								{addedLibrary.length === 0 ? (
									<div className='mt-4'>
										<NoContent message='추가된 도서관이 없어요' style={{ width: '100px' }} />
									</div>
								) : (
									<div className='row row-eq-height'>
										{addedLibrary.map((library) => {
											return (
												<div className='col-3 mb-3 button-hover' onClick={() => handleRemoveLibrary(library)}>
													<Card className='h-100'>
														<Card.Body className='h-100'>
															<div className='position-absolute' style={{ right: '-10px', top: '-10px' }}>
																<h1 className='text-danger'>
																	<RemoveIcon />
																</h1>
															</div>

															<img src={library.icon} alt='' className='img-fluid' style={{ width: '100px' }} />
															<h6 className='mt-2 mb-0'>{library.name}</h6>
														</Card.Body>
													</Card>
												</div>
											)
										})}
									</div>
								)}
							</div>
						</Card.Body>
					</Card>

					<Card>
						<Card.Body>
							<Form>
								<div id='library-list'>
									{loading ? (
										<div className="row">
											{
												Array(4)
												.fill(0)
												.map(() => {
													return (
														<div className='col-6 col-md-3 mb-3 h-100'>
															<LibraryLoadingPlaceholder />
														</div>
													)
												})
											}
										</div>
									) : searchResult.length === 0 ? (
										<>
											<div className='mt-3'>.</div>
											<div className='mt-5'>
												<NoContent message='검색 결과가 없어요' style={{ width: '100px' }} />
											</div>
										</>
									) : (
										<div className='row row-eq-height'>
											{searchResult.map((library) => {
												return (
													<div
														className='col-6 col-md-3 mb-3 h-100 pb-0 mb-0'
														onClick={() => {
															if (library.added) {
																toast.error('이미 추가된 도서관이에요')
															} else {
																handleLibraryClicked(library)
															}
														}}>
														<Card className='h-100'>
															{library.added && (
																<div className='position-absolute' style={{ right: '-10px', top: '-10px' }}>
																	<h1 className='text-book'>
																		<CheckIcon />
																	</h1>
																</div>
															)}

															<Card.Body className='h-100'>
																<img src={library.icon} alt='' className='mb-0 rounded library-image'  />
																<h6 className={(library.name.length <= 12 ? 'pt-2' : 'mt-1')} style={{height: '30px'}}>{library.name}</h6>
															</Card.Body>
														</Card>
													</div>
												)
											})}
										</div>
									)}
								</div>

								<Form.Control type='text' placeholder='추가할 도서관을 검색해 주세요' onChange={handleSearch} />
							</Form>
						</Card.Body>
					</Card>
				</Card.Body>
			</Card>
		</>
	)
}

const LibraryDetailModal = ({library, show, setShow, handleAddLibrary}) => {
	const onHide = () => {
		setShow(false)
	}

	if (library == null) return <></>

	return (
		<Modal show={show} onHide={onHide} fullscreen='md-down' size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>도서관 자세히 보기</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<h2 className='text-center'> {library.name}</h2>
				<h5 className='text-secondary text-center'>{library.address}</h5>

				<div className='row justify-content-center mt-4 mb-4'>
					<div className='col-6'>
						{library.link === '' || library.link === null ? (
							<Button variant='dark' className='w-100' disabled>
								홈페이지
							</Button>
						) : (
							<a href={library.link} target='_blank' rel='noreferrer' className='text-white text-decoration-none'>
								<Button variant='book' className='w-100'>
									홈페이지
								</Button>
							</a>
						)}
					</div>
				</div>

				<hr />

				<div className='row'>
					<div className='col-6'>
						<Button variant='book-danger' className='w-100' onClick={onHide}>
							취소
						</Button>
					</div>

					<div className='col-6'>
						<Button variant='book' className='w-100' onClick={() => handleAddLibrary()}>
							이 도서관 추가하기
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

const LibraryLoadingPlaceholder = () => {
	return (
		<Card className='text-center mt-3 mb-3'>
			<Card.Body>
				<img src={libraryLoading} alt='book cover' className='img-fluid border rounded' style={{ height: '100px' }} />

				<div className=''>
					<Placeholder as={Card.Text} animation='glow'>
						<Placeholder xs='8' />
					</Placeholder>
				</div>
			</Card.Body>
		</Card>
	)
}

export default SearchLibrarySettings

