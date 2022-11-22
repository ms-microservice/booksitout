import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form } from 'react-bootstrap'

const Login = (props) => {
	const LOGIN_API_URL = `http://localhost/login`

	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [stayLogin, setStayLogin] = useState(true)

	const handleLogin = (e) => {
		e.preventDefault()
		props.setToken('')

		if (password === '') {
			alert('비밀번호를 입력해 주세요')
			return
		}

		if (password.length < 6) {
			alert('비밀번호는 6자 이상이에요')
			return
		}

		fetch(LOGIN_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
				stayLogin: stayLogin,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status.toString().startsWith(4)) {
					alert(data.message)
					localStorage.setItem('login-token', '')
					localStorage.setItem('user-name', '')
				} else if (data.status.toString().startsWith(2)) {
					localStorage.setItem('login-token', data.token)
					localStorage.setItem('user-name', data.name)
					props.setToken(data.token)
					alert(data.message)

					navigate('/')
				}
			})
			.catch((e) => console.log(e))
	}

	return (
		<div className='container mt-5'>
			<div className='row justify-content-center'>
				<Card className='col-12 col-lg-6 text-center'>
					<Card.Body>
						<h1>📗 로그인</h1>

						<Form onSubmit={handleLogin}>
							<Form.Group class='row mt-3'>
								<label for='email' class='col-sm-2 col-form-label text-start'>
									이메일
								</label>
								<div class='col-sm-10'>
									<input
										type='email'
										class='form-control'
										placeholder='이메일을 입력해 주세요'
										onChange={(e) => setEmail(e.target.value)}
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
										placeholder='비밀번호를 입력해 주세요'
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
							</Form.Group>

							<div class='form-check mt-3 text-start ms-3'>
								<label
									onClick={() => {
										setStayLogin(!stayLogin)
									}}>
									<label class='form-check-label' for='stay-login'>
										로그인 유지하기
									</label>

									<input type='checkbox' class='form-check-input' checked={stayLogin} value={stayLogin} />
								</label>
							</div>

							<div className='row justify-content-center mt-3'>
								<div className='col-4'>
									<button type='submit' className='btn btn-success w-100'>
										로그인
									</button>
								</div>
								<div className='col-4'>
									<a className='btn btn-danger w-100' href='join'>
										회원가입
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

export default Login
