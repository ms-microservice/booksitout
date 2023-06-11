import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { BsFillImageFill as ImageIcon } from 'react-icons/bs'
import MembershipCard from '../MembershipCard'
import MembershipCardLoading from '../MembershipCardLoading'
import { booksitoutServer } from '../../../functions/axios'
import { toast } from 'react-hot-toast'
import MembershipAddFormImageEditCard from './MembershipAddFormImageEditCard'

import './membershipAddForm.scss'
import { useNavigate } from 'react-router-dom'
import { ImageMembershipType } from './ImageRecognitionType'
import NoContent from '../../../common/NoContent'

const MembershipAddFormImage = () => {
	const navigate = useNavigate()

	const [image, setImage] = React.useState<string>()
	const [recognizedData, setRecognizedData] = React.useState<ImageMembershipType>()

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		onDrop: React.useCallback((image) => {
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				toast.loading('이미지를 분석하고 있어요')

				const buffer = reader.result as ArrayBuffer
				const blob = new Blob([buffer])
				const imageUrl = URL.createObjectURL(blob)

				setImage(imageUrl)
				addImage(image[0])
			}

			reader.readAsArrayBuffer(image[0])
		}, []),
	})

	const addImage = (imageData) => {
		const formData = new FormData()
		formData.append('file', imageData ?? '')

		booksitoutServer
			.post('v5/library/membership/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
			.then((res) => setRecognizedData(res.data))
			.then(() => toast.success('회원증을 인식했어요! 잘못된 정보가 있다면 수정하고 회원증을 추가해 주세요'))
			.catch(() => toast.error('오류가 났어요! 잠시 후 다시 시도해 주세요'))
	}

	const addMembership = () => {
		toast.loading('회원증을 추가하고 있어요')

		const membership = {
			number: recognizedData?.number,
			typeId: recognizedData?.typeId,
			memo: ''
		}

		booksitoutServer
			.post('v5/library/membership', membership)
			.then(() => {
				toast.success('회원증을 추가했어요')
				navigate('/library/membership/all')
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

	return (
		<Card style={{ minHeight: '1000px' }} className='mb-5'>
			<Card.Body>
				<h5 className='text-center clamp-1-line'>도서관 회원증 사진을 업로드해서 회원증을 추가할 수 있어요</h5>
				<div className='mb-4' />

				<Card {...getRootProps()}>
					<Card.Body className='text-center'>
						<input {...getInputProps()} />

						<ImageIcon className='text-book h3' />

						<p className='m-0 text-secondary'>
							{isDragActive ? (
								<span className='text-book'>맞아요! 여기에 올려 주세요</span>
							) : (
								<>여기에 이미지를 올리거나 클릭해서 올릴 이미지를 선택할 수 있어요</>
							)}
						</p>
					</Card.Body>
				</Card>
				<div className='mb-4' />

				<Card className='membership-container'>
					<Card.Body>
						{image == null ? (
							<div style={{ minHeight: '680px' }}>
								<NoContent message='이미지를 업로드 해 주세요' move={-250} />
							</div>
						) : (
							<div className='row justify-content-center align-items-center'>
								<div className='col-12 col-md-4 text-center'>
									<img src={image} alt='' className='img-fluid rounded' style={{ maxHeight: '600px' }} />
								</div>

								<div className='col-12 col-md-8 mt-4 mt-md-0'>
									{image == null ? (
										<></>
									) : recognizedData == null ? (
										<MembershipCardLoading />
									) : (
										<div className='not-clickable'>
											<MembershipCard membership={recognizedData} />
										</div>
									)}

									<div className='mt-3' />

									{image == null ? (
										<></>
									) : recognizedData == null ? (
										<Card style={{ minHeight: '440px' }}></Card>
									) : (
										<MembershipAddFormImageEditCard membership={recognizedData} />
									)}
								</div>
							</div>
						)}
					</Card.Body>
				</Card>

				<div className='row justify-content-center w-100' style={{ position: 'absolute', bottom: '30px' }}>
					<div className='col-12 col-md-6'>
						<Button variant='book' className='w-100' onClick={() => addMembership()}>
							회원증 추가하기
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MembershipAddFormImage