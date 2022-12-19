import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
// Functions
import { join } from '../../functions/user'
// Messages
import { EMAIL_MESSAGE, EMAIL_VERIFICATION_MESSAGE, PASSWORD_MESSAGE, NAME_MESSAGE } from '../../messages/joinMessages'

const Join = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [emailVerification, setEmailVerification] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	return (
		<div className='mt-5 container'>
			<div className='row justify-content-center'>
				<Card className='col-12 col-lg-7 text-center'>
					<Card.Body>
						<h1>📗 회원가입</h1>

						<Form onSubmit={(e) => join(e, navigate, email, emailVerification, password, name)}>
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
						disabled={disabled}
					/>
				</div>
			</div>
		</Form.Group>
	)
}

export default Join
