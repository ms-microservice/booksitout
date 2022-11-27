import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import { JOIN_API_URL } from '../resources/data/urls'

const Join = () => {
	const navigate = useNavigate()

	const EMAIL_MESSAGE = `ID로 사용하실 이메일을 입력해 주세요`
	const EMAIL_VERIFICATION_MESSAGE = `이메일로 온 인증번호를 입력해 주세요`
	const PASSWORD_MESSAGE = `비밀번호를 입력해 주세요`
	const NAME_MESSAGE = `이름을 알려주세요`

	const [email, setEmail] = useState('')
	const [emailVerification, setEmailVerification] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const handleJoin = (e) => {
		e.preventDefault()

		fetch(JOIN_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
				name: name,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.message)

				if (data.status.toString().startsWith(2)) {
					navigate('/login')
				}
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className='mt-5 container'>
			<div className='row justify-content-center'>
				<Card className='col-12 col-lg-7 text-center'>
					<Card.Body>
						<h1>📗 회원가입</h1>

						<Form onSubmit={handleJoin}>
							<InputWithLabel label='email' displayLabel='이메일' placeholder={EMAIL_MESSAGE} setInputVariable={setEmail} />

							<InputWithLabel
								label='email-verification'
								displayLabel='인증번호'
								placeholder={EMAIL_VERIFICATION_MESSAGE}
								setInputVariable={setEmailVerification}
								disabled={true}
							/>

							<InputWithLabel type='name' displayLabel='이름' placeholder={NAME_MESSAGE} setInputVariable={setName} />

							<InputWithLabel type='password' displayLabel='비밀번호' placeholder={PASSWORD_MESSAGE} setInputVariable={setPassword} />

							<div className='row justify-content-center mt-3'>
								<div className='col-4'>
									<Button type='submit' className='w-100'>
										회원가입
									</Button>
								</div>

								<div className='col-4'>
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
						required
						disabled={disabled}
					/>
				</div>
			</div>
		</Form.Group>
	)
}

export default Join
