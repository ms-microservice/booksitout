import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"

import { User } from "../../types/PostType"
import SettingsCard from "./SettingsCard"

import { BsFillPatchCheckFill as PaidIcon, BsFillImageFill as ImageIcon } from 'react-icons/bs'
import { useDropzone } from "react-dropzone"
import urls from "../../settings/urls"
import axios from "axios"
import utils from "../../functions/utils"

import Loading from "../common/Loading"
import Error from '../common/Error'
import { toast } from "react-hot-toast"

const CommunitySettings = () => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		onDrop: dropedImage => {
			// setUser({ ...user, profileImage: dropedImage.toString() })
			console.log(dropedImage)
		}
	})

	const [initialFetch, setInitialFetch] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	const [name, setName] = useState('')
	const [profileImage, setProfileImage] = useState<string | null>(null)

	const [user, setUser] = useState<User>()
	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 500)

		axios
			.get(`${urls.api.base}/v4/user/public-user/${utils.getUserId()}`)
			.then((res) => {
				if (res.status === 204) {
					setError(true)
				} else {
					setUser(res.data)
					setName(res.data.name)
				}
			})
			.catch(() => setError(true))
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}, [])

	const handleEditUser = (e) => {
		e.preventDefault()

		if (name === '') {
			toast.error('이름을 입력해 주세요.')
			document.getElementById('input-name')?.focus()
			return
		}

		const editRequest = {
			nickName: name,
			profileImage: profileImage
		}

		axios
			.put(`${urls.api.base}/v4/user/public-user/${utils.getUserId()}`, editRequest, { headers: { Authorization: utils.getToken() } })
			.then((res) => setUser(res.data.updated))
			.catch((e) => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요.')
			})
	}

	if (initialFetch) return <></>
	if (loading) return <Loading/>
	if (error || user == null) return <Error />

    return (
		<div className='container-xl'>
			<Card>
				<Card.Body>
					<h3 className='mb-5'>커뮤니티 설정</h3>

					<SettingsCard
						title='프로필 설정'
						content={
							<div className='row'>
								<div className='col-12'>
									<ProfileCard user={user} />
								</div>

								<hr className='mt-5 mb-5' />

								<Form className='row m-0' onSubmit={handleEditUser}>
									<div className='col-12 col-md-6 mb-3'>
										<Form.Label>프로필 사진</Form.Label>
										<Card {...getRootProps()}>
											<Card.Body>
												<input {...getInputProps()} />

												<ImageIcon className='text-book h3' />

												<p className='m-0 text-secondary'>
													{isDragActive ? (
														<>맞아요! 여기에 올려 주세요</>
													) : (
														<>여기에 이미지를 올리거나 클릭해서 올릴 이미지를 선택할 수 있어요</>
													)}
												</p>
											</Card.Body>
										</Card>
									</div>

									<div className='col-12 col-md-6 mb-3'>
										<Form.Label>이름</Form.Label>
										<Form.Control onChange={(e) => setName(e.target.value)} value={name} id='input-name'/>

										<Button
											type='submit'
											variant='book'
											className='w-100 mt-4 mt-md-3'
											disabled={name === user.name && profileImage == null}>
											저장하기
										</Button>
									</div>
								</Form>
							</div>
						}
					/>

					<SettingsCard
						title={'알림 설정'}
						content={
							<Form>
								<div className='row justify-content-center'>
									<div className='col-12 col-md-6'>
										<Form.Check className='mt-2 switch-book' type='switch' label='새로운 글' />
										<Form.Check className='mt-2 switch-book' type='switch' label='새로운 퀴즈' />
										<Form.Check className='mt-2 switch-book' type='switch' label='새로운 조사' />
										<Form.Check className='mt-2 switch-book' type='switch' label='새로운 독서모임 모집글' />
										<Form.Check className='mt-2 switch-book' type='switch' label='새로운 책잇아웃 꿀팁' />
									</div>

									<div className='col-12 col-md-6'>
										<Form.Check className='mt-2 switch-book' type='switch' label='내 글에 댓글' />
										<Form.Check className='mt-2 switch-book' type='switch' label='내 댓글에 답글' />
										<Form.Check className='mt-2 switch-book' type='switch' label='내 댓글 좋아요 / 싫어요' />
										<Form.Check className='mt-2 switch-book' type='switch' label='내 독서모임 모집글에 신청' />
									</div>

									<div className='mt-4 col-12 col-md-6'>
										<Button variant='book' className='w-100' disabled>
											알림 설정 저장하기
										</Button>
									</div>
								</div>
							</Form>
						}
					/>
				</Card.Body>
			</Card>
		</div>
	)
}

const ProfileCard = ({user}) => {
	return (
		<div className='d-flex align-items-center text-center'>
			{/* <img src={user.profileImage} alt='' className='img-fluid rounded' style={{ width: '100px', height: '100px' }} /> */}
			<img src='https://booksitout-bucket.s3.ap-northeast-2.amazonaws.com/profile-image/f2465ed2-8' alt='' className='img-fluid rounded' style={{ width: '100px', height: '100px' }} />

			<div className='row ms-4 text-start'>
				<h4>{user.name}</h4>
				<h6  className='text-secondary'>{user.email}</h6>
			</div>

			<PaidIcon className='text-book h3 ms-2' />
		</div>
	)
}

export default CommunitySettings