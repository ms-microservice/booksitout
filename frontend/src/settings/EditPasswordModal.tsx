import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import user from '../user/user'
import messages from '../settings/messages'

const EditPasswordModal = ({ show, setShow }) => {
	const [oldPassword, setOldPassword] = React.useState<string>('')
	const [newPassword, setNewPassword] = React.useState<string>('')
	const [verificationCode, setVerificationCode] = React.useState<string>('')
	const [isVerificationRequested, setIsVerificationRequested] = React.useState<boolean>(false)

	const handleRequestVerificationCode = () => {
		toast.loading('인증번호를 보내고 있어요')

		user.change.verificationCode.password().then((success) => {
			if (success) {
				toast.success('인증번호를 보냈어요')
				setIsVerificationRequested(true)
			} else {
				toast.error(messages.error)
			}
		})
	}

	const handleChangePassword = (e) => {
		e.preventDefault()

		if (!isVerificationRequested) {
			toast.error('이메일 인증을 진행해 주세요')
			return
		}

		if (verificationCode === '') {
			toast.error('인증번호를 입력해 주세요')
			return
		}

		if (verificationCode.length < 5) {
			toast.error('인증번호가 일치하지 않아요')
			return
		}

		if (oldPassword === '') {
			toast.error('기존 비밀번호를 입력해 주세요')
			return
		}

		if (newPassword === '') {
			toast.error('새로운 비밀번호를 입력해 주세요')
			return
		}

		if (oldPassword === newPassword) {
			toast.error('기존 비밀번호와 새로운 비밀번호가 같아요')
			return
		}

		if (newPassword.length < 6) {
			toast.error('6자 이상의 비밀번호를 입력해 주세요')
			return
		}

		toast.loading('비밀번호를 변경하고 있어요')

		user.change.password(verificationCode, oldPassword, newPassword).then((status) => {
			if (status.startsWith('2')) {
				toast.success('비밀번호를 변경했어요')
				closeModal()
			} else if (status === '400') {
				toast.error('인증번호가 일치하지 않아요. 다시 확인해 주세요')
			} else {
				toast.error(messages.error)
			}
		})
	}

	const closeModal = () => {
		setOldPassword('')
		setNewPassword('')
		setVerificationCode('')
		setIsVerificationRequested(false)
		setShow(false)
	}

	return (
		<Modal show={show} onHide={() => closeModal()} fullscreen='md-down' backdrop='static' centered>
			<Modal.Header className='text-center' closeButton>
				<h4 className='w-100'>비밀번호 변경하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleChangePassword(e)}>
					<Form.Control
						className='mb-2'
						placeholder='인증번호를 입력해 주세요'
						onChange={(e) => setVerificationCode(e.target.value)}
						disabled={!isVerificationRequested}
					/>
					<Button className='mb-3 w-100' variant='book' onClick={() => handleRequestVerificationCode()} disabled={isVerificationRequested}>
						인증번호 요청하기
					</Button>

					<Form.Control
						type='password'
						className='mb-2'
						placeholder='기존 비밀번호를 입력해 주세요'
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<Form.Control
						type='password'
						className='mb-2'
						placeholder='새로운 비밀번호를 입력해 주세요'
						onChange={(e) => setNewPassword(e.target.value)}
					/>

					<div className='row mt-4'>
						<div className='col-12 col-md-6'>
							<Button className='mt-2 w-100' variant='book-danger' onClick={() => setShow(false)}>
								취소
							</Button>
						</div>

						<div className='col-12 col-md-6'>
							<Button className='mt-2 w-100' variant='book' type='submit'>
								비밀번호 변경
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default EditPasswordModal
