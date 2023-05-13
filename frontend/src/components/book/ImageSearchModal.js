import { useState, useEffect } from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
// Resources
import checkIcon from '../../resources/images/common/check.png'
import urls from '../../settings/urls'
import uiSettings from '../../settings/ui';
import NoContent from '../common/NoContent'

const ImageSearchModal = ({ showModal, setShowModal, setCover, title, author }) => {
	const coverImageStyle = {  width: '100%', objectPosition: 'center' }
	const coverSelectedStyle = {  width: '100%', objectPosition: 'center', opacity: 0.4 }
	const [selectedImageIndex, setSelectedImageIndex] = useState(-1)
	const [imageSearchResult, setImageSearchResult] = useState([])
	const [initialFetch, setInitialFetch] = useState(false)
	const [loading, setLoading] = useState(true)

	const closeModal = () => {
		setSelectedImageIndex(-1)
		setShowModal(false)
	}
	const closeModalSuccess = () => {
		setCover(imageSearchResult[selectedImageIndex].image)
		setSelectedImageIndex(-1)
		setShowModal(false)
	}

	useEffect(() => {
		if (!showModal) return

		setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		if (showModal) {
			fetch(`${urls.api.base}/v3/search/image/google/separate-title-author?title=${title}&author=${author}`)
				.then((res) => {
					return res.json()
				})
				.then((data) => {
					let index = 0
					setImageSearchResult(
						data.map((link) => {
							return { id: index++, image: link }
						}) ?? []
					)
				})
				.catch((e) => {
					// toast.error(`오류가 났어요. 잠시 후 다시 시도해 주세요 : ${e}`)
				})
				.finally(() => {
					setLoading(false)
					setInitialFetch(false)
				})
		}
	}, [showModal])

	return (
		<Modal show={showModal} onHide={closeModal} size='xl' fullscreen='md-down'>
			<Modal.Header closeButton>
				<div className='row'>
					<h3>이미지 검색</h3>

					<p className='text-secondary m-0' style={{ whiteSpace: 'nowrap' }}>
						제목이 흔할 경우 저자도 입력해야 정확하게 나와요
					</p>
				</div>
			</Modal.Header>

			<Modal.Body>
				{initialFetch ? (
					<></>
				) : loading ? (
					<div className='row justify-content-center text-center align-items-center mt-5 mb-5'>
						<div className='d-block mt-5 mt-md-1' />
						<div className='d-block mt-5 mt-md-1' />

						<div className='spinner-grow' role='status' style={{ width: '100px', height: '100px', color: uiSettings.color.theme }} />
						<div className='mt-4 h2'>이미지를 불러오고 있어요</div>
					</div>
				) : imageSearchResult == null || imageSearchResult === undefined || imageSearchResult.length === 0 ? (
					<NoContent useImage={false} message='검색 결과가 없어요'/>
				) : (
					<div className='row'>
						{imageSearchResult.map((link) => {
							return (
								<div className='col-6 col-xl-3'>
									<Card className='mb-4' onClick={() => setSelectedImageIndex(link.id)}>
										<Card.Body>
											{link.id === selectedImageIndex && (
												<img
													src={checkIcon}
													alt='selected'
													className='img-fluid'
													style={{
														widht: '50px',
														height: '50px',
														position: 'absolute',
														top: '-20px',
														right: '-10px',
														zIndex: 100,
													}}
												/>
											)}

											<img
												src={link.image}
												alt=''
												className='img-fluid'
												style={Number(link.id) === selectedImageIndex ? coverSelectedStyle : coverImageStyle}
											/>
										</Card.Body>
									</Card>
								</div>
							)
						})}
					</div>
				)}
			</Modal.Body>

			<Modal.Footer>
				<Button variant='book-danger' onClick={closeModal} className='w-25'>
					취소
				</Button>

				<Button variant='book' onClick={closeModalSuccess} disabled={Number(selectedImageIndex) === -1}>
					선택한 이미지로 결정하기
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageSearchModal
