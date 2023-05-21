import { useState } from "react"
import search from "../../../functions/search"
import toast from "react-hot-toast"
import messages from "../../../settings/messages"
import { Button, Form, Modal } from 'react-bootstrap'
import SettingsCard from "../SettingsCard"

const LibraryRegionSettings = () => {
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

			<SettingsCard
				title='지역으로 검색하기'
				content={
					<div className='row justify-content-center'>
						<div className='ms-5 text-secondary'>
							<p className='mb-2'>현재 서울 지역만 추가할 수 있어요</p>
						</div>

						<div className='text-center'>
							<h5 className='mt-3'>
								{`설정된 지역 :`} <b>{`${region === '' && regionDetail === '' ? '없음' : `${region} ${regionDetail}`}`}</b>
							</h5>

							{region !== '' && regionDetail !== '' && (
								<div className='button-bottom-half-left'>
									<Button variant='book-danger' className='w-100' onClick={() => handleDeleteRegion()}>
										도서관은 검색 하지 않기
									</Button>
								</div>
							)}

							<div className='button-bottom-half-right'>
								<Button variant='book' className='w-100' onClick={() => setModalOpen(true)}>
									{region === '' && regionDetail === '' ? '지역 설정하기' : '지역 변경하기'}
								</Button>
							</div>
						</div>
					</div>
				}
			/>
		</>
	)
}

export default LibraryRegionSettings