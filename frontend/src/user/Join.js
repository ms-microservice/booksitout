import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form } from 'react-bootstrap'

const Join = () => {
	const JOIN_API_URL = `http://localhost/v1/join`

	const EMAIL_MESSAGE = `ID로 사용하실 이메일을 입력해 주세요`
	const PASSWORD_MESSAGE = `비밀번호를 입력해 주세요`
	const NAME_MESSAGE = `이름을 알려주세요`

	const navigate = useNavigate()
	const [email, setEmail] = useState('')
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
							<Form.Group class='row mt-3'>
								<label for='email' class='col-sm-2 col-form-label text-start'>
									이메일
								</label>
								<div class='col-sm-10'>
									<input
										type='email'
										class='form-control'
										placeholder={EMAIL_MESSAGE}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
							</Form.Group>

							<Form.Group class='row mt-3'>
								<label for='name' class='col-sm-2 col-form-label text-start'>
									이름
								</label>
								<div class='col-sm-10'>
									<input
										type='text'
										class='form-control'
										placeholder={NAME_MESSAGE}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
							</Form.Group>

							<Form.Group class='row mt-3'>
								<label for='inputPassword3' class='col-sm-2 col-form-labe text-start'>
									비밀번호
								</label>
								<div class='col-sm-10'>
									<input
										type='password'
										class='form-control'
										placeholder={PASSWORD_MESSAGE}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
							</Form.Group>

							<div className='row justify-content-center mt-3'>
								<div className='col-4'>
									<button type='submit' className='btn btn-primary w-100'>
										회원가입
									</button>
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

export default Join
