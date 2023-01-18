import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Functions
import { join, verifyEmail } from '../../functions/user'
import utils from '../../functions/utils'
// Messages
import userMessage from '../../messages/userMessage'
import { ERROR_MESSAGE } from '../../messages/commonMessages'

const Join = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [emailVerification, setEmailVerification] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const [isEmailSent, setIsEmailSent] = useState(false)
	const handleVerifyEmail = () => verifyEmail(email).then((success) => success && setIsEmailSent(true))

	const handleJoin = (e) => {
		e.preventDefault()

		if (email === '') {
			toast.error(userMessage.join.error.email.null)
			return
		}

		if (
			!email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			toast.error(userMessage.join.error.email.invalid)
			return
		}

		if (emailVerification === '') {
			toast.error(userMessage.join.error.email.notVerified)
			return
		}

		if (name === '') {
			toast.error(userMessage.join.error.name.null)
			return
		}

		if (password === '') {
			toast.error(userMessage.join.error.pw.null)
			return
		}

		if (password.length < 6) {
			toast.error(userMessage.join.error.pw.short)
			return
		}

		toast.loading(userMessage.join.loading)

		const joinRequest = {
			email: email,
			code: emailVerification,
			password: password,
			name: name,
		}

		join(joinRequest).then((status) => {
			if (status === 200) {
				toast.success(`책-it-out에 오신걸 환영해요, ${name}님!`)
				navigate('/login')
			} else if (status.includes('400')) {
				toast.error(userMessage.join.error.email.codeNotMatch)
			} else if (status.includes('412')) {
				toast.error(userMessage.join.error.email.notVerified)
			} else {
				toast.error(ERROR_MESSAGE)
			}
		})
	}

	return (
		<div className='mt-5 container'>
			<div className='row justify-content-center'>
				<Card className='col-12 col-lg-7 text-center'>
					<Card.Body>
						<h1>📗 회원가입</h1>

						<Form onSubmit={(e) => handleJoin(e)}>
							<Form.Group class='mt-3'>
								<div className='row'>
									<label for='text' class='col-12 col-sm-2 col-form-label text-start'>
										이메일
									</label>

									<div className='col-12 col-sm-7'>
										<input
											type='text'
											class='form-control'
											placeholder={userMessage.join.placeHolder.email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>

									<div className='col-12 col-sm-3 mt-3 mt-sm-0'>
										<Button className='w-100' onClick={() => handleVerifyEmail()} disabled={!utils.isEmailValid(email)}>
											인증번호 보내기
										</Button>
									</div>
								</div>
							</Form.Group>

							<InputWithLabel
								label='email-verification'
								displayLabel='인증번호'
								placeholder={userMessage.join.placeHolder.emailVerification}
								setInputVariable={setEmailVerification}
								disabled={!isEmailSent}
							/>
							<InputWithLabel
								type='name'
								displayLabel='이름'
								placeholder={userMessage.join.placeHolder.name}
								setInputVariable={setName}
							/>
							<InputWithLabel
								type='password'
								displayLabel='비밀번호'
								placeholder={userMessage.join.placeHolder.password}
								setInputVariable={setPassword}
							/>

							<div className='row justify-content-center mt-3'>
								<div className='col-12 col-md-4 mt-2'>
									<Button type='submit' className='w-100'>
										회원가입
									</Button>
								</div>

								<div className='col-12 col-md-4 mt-2'>
									<a className='btn btn-success w-100' href='login'>
										로그인
									</a>
								</div>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

const InputWithLabel = ({ type, displayLabel, placeholder, setInputVariable, disabled = false }) => {
	return (
		<Form.Group class='mt-3'>
			<div className='row'>
				<label for={type} class='col-sm-2 col-form-label text-start'>
					{displayLabel}
				</label>

				<div class='col-sm-10'>
					<input
						type={type}
						class='form-control'
						placeholder={placeholder}
						onChange={(e) => setInputVariable(e.target.value)}
						disabled={disabled}
					/>
				</div>
			</div>
		</Form.Group>
	)
}

export default Join
