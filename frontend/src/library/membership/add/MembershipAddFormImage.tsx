import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { BsFillImageFill as ImageIcon } from 'react-icons/bs'
import MembershipCard from '../MembershipCard'
import MembershipCardLoading from '../MembershipCardLoading'
import { booksitoutServer } from '../../../functions/axios'
import { toast } from 'react-hot-toast'

const MembershipAddFormImage = () => {
	const [imageData, setImageData] = React.useState<Blob>()
	const [image, setImage] = React.useState<string>()
	const [recognizedData, setRecognizedData] = React.useState()

	const [loading, setLoading] = React.useState<boolean>(false)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		onDrop: React.useCallback((image) => {
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				const buffer = reader.result as ArrayBuffer
				const blob = new Blob([buffer])
				const imageUrl = URL.createObjectURL(blob)

				setImage(imageUrl)
				setImageData(image[0])
			}

			reader.readAsArrayBuffer(image[0])
		}, []),
	})

	const addImage = () => {
		const formData = new FormData()
		formData.append('file', image ?? '')

		booksitoutServer
			.post('v5/library/membership/add/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
			.then((res) => setRecognizedData(res.data))
	}

	const addMembership = () => {
		toast.loading('회원증을 추가하고 있어요')
	}

	return (
		<Card style={{ minHeight: '500px' }} className='mb-5'>
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

				{loading ? <MembershipCardLoading /> : <></>}
				{/* <MembershipCard membership={{ region: { logo: '', koreanName: '', }, number:  }} /> */}

				<div className='row justify-content-center w-100' style={{ position: 'absolute', bottom: '20px' }}>
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