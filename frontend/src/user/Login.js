import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import { LOGIN_API_URL } from '../resources/data/urls'

const Login = ({ setToken }) => {
	const navigate = useNavigate()

	const INTRODUCTION_URL = `/introduction`
	const FAQ_URL = `/faq`
	const QNA_URL = `/qna`

	const EMAIL_PLACEHOLDER_MESSAGE = `이메일을 입력해 주세요`
	const PASSWORD_PLACEHOLDER_MESSAGE = `비밀번호를 입력해 주세요`
	const INTRODUCTION_TITLE = `책-it-out이 뭐 하는 곳인지 궁금하신가요? 🧐`
	const FAQ_TITLE = `FAQ`
	const FAQ_CONTENT = `자주 하시는 질문을 모아 봤어요`
	const QNA_TITLE = `QNA`
	const QNA_CONTENT = `직접 질문하실 수 있어요`
	const FAQ_QNA_TITLE = `책-it-out에 관한 질문 한 스푼 🥄`

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [stayLogin, setStayLogin] = useState(true)

	const handleLogin = (e) => {
		e.preventDefault()
		setToken('')

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
			.then((res) => {
				if (!res.status.toString().startsWith(2)) {
					throw new Error()
				}
				return res.json()
			})
			.then((data) => {
				localStorage.setItem('login-token', data.token)
				localStorage.setItem('user-name', data.name)
				setToken(data.token)
				alert(data.message)
				navigate('/')
			})
			.catch(() => {
				localStorage.setItem('login-token', '')
				localStorage.setItem('user-name', '')
			})
	}

	return (
		<div className='container mt-5'>
			<div className='row row-eq-height justify-content-center'>
				<div className='col-12 col-lg-7 mb-5'>
					<Card className='text-center'>
						<Card.Body>
							<h1>📗 로그인</h1>

							<Form onSubmit={handleLogin}>
								<Form.Group class='row mt-3'>
									<div className='col-2'>
										<label class='col-form-label text-start'>이메일</label>
									</div>

									<div class='col-10'>
										<input
											type='email'
											class='form-control'
											placeholder={EMAIL_PLACEHOLDER_MESSAGE}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>
								</Form.Group>

								<Form.Group class='row mt-3'>
									<div className='col-2'>
										<label class='text-start'>비밀번호</label>
									</div>

									<div class='col-10'>
										<input
											type='password'
											class='form-control'
											placeholder={PASSWORD_PLACEHOLDER_MESSAGE}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</div>
								</Form.Group>

								<div class='form-check mt-3 ms-3 text-start'>
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
										<Button varnt='success' type='submit' className='w-100'>
											로그인
										</Button>
									</div>

									<div className='col-4'>
										<Button variant='danger' className='w-100' href='join'>
											회원가입
										</Button>
									</div>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-4'>
					<a href={INTRODUCTION_URL} className='text-decoration-none text-black h-100'>
						<Card className='h-100'>
							<Card.Body className='text-center'>
								<h4>{INTRODUCTION_TITLE}</h4>

								<h6 className='mt-5 mb-4'>책 읽는 모든 이들을 위한 곳, 책-it-out을 더 알고 싶으면 여기를 클릭해 주세요</h6>
							</Card.Body>
						</Card>
					</a>
				</div>

				<div className='col-12 col-lg-6 mb-4'>
					<Card className='h-100'>
						<Card.Body className='text-center'>
							<h4 className='text-center'>{FAQ_QNA_TITLE}</h4>

							<div className='row mt-3'>
								<div className='col-12 col-md-6'>
									<a href={FAQ_URL} className='text-decoration-none text-black'>
										<Card>
											<Card.Header>{FAQ_TITLE}</Card.Header>
											<Card.Body>{FAQ_CONTENT}</Card.Body>
										</Card>
									</a>
								</div>
								<div className='col-12 col-md-6'>
									<a href={QNA_URL} className='text-decoration-none text-black'>
										<Card>
											<Card.Header>{QNA_TITLE}</Card.Header>
											<Card.Body>{QNA_CONTENT}</Card.Body>
										</Card>
									</a>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Login
