import React from 'react'
import { Card } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { BsFillImageFill as ImageIcon } from 'react-icons/bs'
import { booksitoutServer } from '../../../functions/axios'
import { toast } from 'react-hot-toast'

import './membershipAddForm.scss'
import { ImageMembershipType } from './ImageRecognitionType'
import CardTitle from '../../../common/CardTitle'
import booksitoutIcon from '../../../common/icons/booksitoutIcon';
import MembershipImageModal from './MembershipImageModal'

const MembershipAddFormImage = () => {
	const [image, setImage] = React.useState<string>()
	const [recognizedData, setRecognizedData] = React.useState<ImageMembershipType>()
	const [show, setShow] = React.useState<boolean>(false)

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
		setShow(true)
		const formData = new FormData()
		formData.append('file', imageData ?? '')

		booksitoutServer
			.post('v5/library/membership/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
			.then(res => setRecognizedData(res.data))
			.then(() => toast.success('회원증을 인식했어요! 잘못된 정보가 있다면 수정하고 회원증을 추가해 주세요'))
			.catch(() => toast.error('오류가 났어요! 잠시 후 다시 시도해 주세요'))
	}

	return (
		<Card className="mb-5">
			<MembershipImageModal
				image={image}
				membership={recognizedData}
				setMembership={setRecognizedData}
				show={show}
				onHide={() => setShow(false)}
			/>

			<Card.Body>
				<CardTitle
					icon={<booksitoutIcon.membership />}
					title={'사진으로 도서관 회원증 추가'}
					subTitle="책잇아웃의 AI가 사진을 분석해서 회원증 정보를 인식해 줘요"
				/>

				<Card {...getRootProps()} style={{ minHeight: '300px' }} className="mt-4">
					<Card.Body className="text-center h-100 row align-items-center">
						<input {...getInputProps()} />

						<div>
							<ImageIcon className={isDragActive ? 'text-book h1' : 'text-secondary h1'} />

							<p className="m-0 mt-2 text-secondary">
								{isDragActive ? (
									<span className="text-book">맞아요! 여기에 올려 주세요</span>
								) : (
									<>여기에 이미지를 올리거나 클릭해서 올릴 이미지를 선택할 수 있어요</>
								)}
							</p>
						</div>
					</Card.Body>
				</Card>

				<div className="mb-3" />
			</Card.Body>
		</Card>
	)
}

export default MembershipAddFormImage