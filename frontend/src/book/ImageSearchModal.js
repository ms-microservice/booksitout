import React from 'react'
import { useEffect, useState } from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
import Error from '../common/Error'

const ImageSearchModal = ({ showModal, setShowModal, setCover, title, author }) => {
	const GOOGLE_URL = `https://customsearch.googleapis.com/customsearch/v1`
	const GOOGLE_CX = `453ed0713d27f46bb`
	const GOOGLE_API_KEY = `AIzaSyC2YmfHVVN3U6ZPHHANULvMSq_eNx97q4Q`

	const coverImageStyle = { maxHeight: '300px', width: '100%', objectPosition: 'center' }
	const coverSelectedStyle = { opacity: 0.7, maxHeight: '300px', width: '100%', objectPosition: 'center' }
	const [selectedImageIndex, setSelectedImageIndex] = useState(-1)
	const [imageSearchResult, setImageSearchResult] = useState([])

	const closeModal = () => setShowModal(false)
	const closeModalSuccess = () => {
		console.log(imageSearchResult[selectedImageIndex].image)
		setCover(imageSearchResult[selectedImageIndex].image)
		setSelectedImageIndex(-1)
		setShowModal(false)
	}

	useEffect(() => {
		if (!showModal) return

		fetch(`${GOOGLE_URL}?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${title}&searchType=image`)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				console.log(data)

				const imageLink = data.items.map((item, index) => {
					return { id: index, image: item.link }
				})

				setImageSearchResult(imageLink)
			})
	}, [showModal])

	return (
		<Modal show={showModal} onHide={closeModal} backdrop='static' size='xl'>
			<Modal.Header closeButton>
				<Modal.Title>이미지 검색</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{imageSearchResult == null || imageSearchResult === undefined || imageSearchResult.length == 0 ? (
					<Error message='검색 결과가 없어요' />
				) : (
					<div className='row'>
						{imageSearchResult.map((link) => {
							return (
								<div className='col-6 col-xl-3'>
									<Card className='mb-4' onClick={() => setSelectedImageIndex(link.id)}>
										<Card.Body>
											<img
												src={link.image}
												alt=''
												className='img-fluid'
												style={link.id == selectedImageIndex ? coverSelectedStyle : coverImageStyle}
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
				<Button variant='danger' onClick={closeModal}>
					취소
				</Button>
				<Button variant='primary' onClick={closeModalSuccess}>
					선택한 이미지로 결정하기
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageSearchModal
