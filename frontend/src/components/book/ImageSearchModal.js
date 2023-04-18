import { useState, useEffect } from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
// Resources
import Error from '../common/Error'
import checkIcon from '../../resources/images/common/check.png'
import urls from '../../settings/urls'
import uiSettings from '../../settings/ui';

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
			fetch(`${urls.api.base}/v3/search/image/google?query=${title}%20${author}`)
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
				<Modal.Title>이미지 검색</Modal.Title>
				<span className='text-secondary ms-5'>책 제목이 흔하면 저자도 입력하면 더 정확하게 나와요</span>
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
					<div className='row mt-5'>
						<Error message='검색 결과가 없어요' />
					</div>
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
