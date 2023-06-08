import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'

import user from './user'
import utils from '../functions/utils'

import messages from '../settings/messages'
import logo from '../images/logo.png'

const JoinRoute = () => {
	const navigate = useNavigate()

	const [email, setEmail] = React.useState('')
	const [emailVerification, setEmailVerification] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [name, setName] = React.useState('')
	const [emailSent, setMailSent] = React.useState(false)

	const handleVerifyEmail = () => {
		user.joinVerification(email)
			.then((res) => {
				if (res.status === 200 || res.status === 208) {
					toast.success(res.data.message)
					setMailSent(true)
					return
				}

				if (res.status === 400 || res.status === 409) {
					toast.error(res.data.message)
					return
				}

				toast.error(`오류가 발생했어요. 잠시 후 다시 시도해 주세요. res.status: ${res.status}`)
			})
	}

	const handleJoin = (e) => {
		e.preventDefault()

		if (email === '') {
			toast.error(messages.user.join.error.email.null)
			document.getElementById('email-input')!!.focus()
			return
		}

		if (
			!email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			toast.error(messages.user.join.error.email.invalid)
			document.getElementById('email-input')!!.focus()
			return
		}

		if (emailVerification === '') {
			toast.error(messages.user.join.error.email.notVerified)
			document.getElementById('email-input')!!.focus()
			return
		}

		if (name === '') {
			toast.error(messages.user.join.error.name.null)
			document.getElementById('name-input')!!.focus()
			return
		}

		if (password === '') {
			toast.error(messages.user.join.error.pw.null)
			document.getElementById('password-input')!!.focus()
			return
		}

		if (password.length < 6) {
			toast.error(messages.user.join.error.pw.short)
			document.getElementById('password-input')!!.focus()
			return
		}

		toast.loading(messages.user.join.loading)

		const joinRequest = {
			email: email,
			code: emailVerification,
			password: password,
			name: name,
		}

		user.join(joinRequest).then((status) => {
			if (status === 200) {
				toast.success(`책잇아웃에 오신걸 환영해요, ${name}님!`)
				navigate('/login')
			} else if (status === 400) {
				toast.error(messages.user.join.error.email.codeNotMatch)
			} else if (status === 412) {
				toast.error(messages.user.join.error.email.notVerified)
			} else {
				toast.error(messages.error)
			}
		})
	}

	return (
		<div className='container mt-5 '>
			<div className='row justify-content-center'>
				<div className='col-12 col-lg-9 col-xl-7'>
					<Card className='text-center'>
						<Card.Body>
							<div className='d-flex justify-content-center'>
								<img
									src={logo}
									alt=''
									className='img-fluid rounded me-2 me-md-3 mt-0 mt-md-1'
									style={{ width: '40px', height: '40px' }}
								/>
								<h1 className='mt-1 mt-md-0 mb-0'>회원가입</h1>
							</div>

							<Form onSubmit={(e) => handleJoin(e)}>
								<Form.Group className='mt-3'>
									<div className='row'>
										<label className='col-12 col-sm-2 col-form-label text-start'>이메일</label>

										<div className='col-12 col-sm-7'>
											<Form.Control
											id = 'email-input'
												placeholder={messages.user.join.placeHolder.email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>

										<div className='col-12 col-sm-3 mt-3 mt-sm-0'>
											<Button
												variant='book'
												className='w-100'
												onClick={() => handleVerifyEmail()}
												disabled={!utils.isEmailValid(email)}>
												인증번호 보내기
											</Button>
										</div>
									</div>
								</Form.Group>

								<InputWithLabel
									type='email-verification'
									displayLabel='인증번호'
									placeholder={messages.user.join.placeHolder.emailVerification}
									setInputVariable={setEmailVerification}
									disabled={!emailSent}
								/>
								<InputWithLabel
									type='name'
									displayLabel='이름'
									placeholder={messages.user.join.placeHolder.name}
									setInputVariable={setName}
								/>
								<InputWithLabel
									type='password'
									displayLabel='비밀번호'
									placeholder={messages.user.join.placeHolder.password}
									setInputVariable={setPassword}
								/>

								<div className='bottom-btn-container'>
									<div className='bottom-btn'>
										<Button variant='book' type='submit' className='w-100'>
											회원가입
										</Button>
									</div>

									<div className='bottom-btn'>
										<a className='w-100' href='/login'>
											<Button variant='outline-book' className='w-100'>
												로그인
											</Button>
										</a>
									</div>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

const InputWithLabel = ({ type, displayLabel, placeholder, setInputVariable, disabled = false }) => {
	return (
		<Form.Group className='mt-3'>
			<div className='row'>
				<label htmlFor={type} className='col-sm-2 col-form-label text-start'>
					{displayLabel}
				</label>

				<div className='col-sm-10'>
					<Form.Control type={type} placeholder={placeholder} onChange={(e) => setInputVariable(e.target.value)} disabled={disabled} />
				</div>
			</div>
		</Form.Group>
	)
}

export default JoinRoute
