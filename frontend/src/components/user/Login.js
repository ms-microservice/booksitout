import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
// Functions
import { login } from '../../functions/user'
// Urls
import urls from '../../settings/urls'
// Messages
import userMessage from '../../messages/userMessage'
// OAuth
import kakaoButton from '../../resources/images/login-button/small-kakao.png'
import naverButton from '../../resources/images/login-button/small-naver.png'
import googleButton from '../../resources/images/login-button/small-google.png'
import facebookButton from '../../resources/images/login-button/small-facebook.png'
import utils from '../../functions/utils'

const Login = ({ setToken }) => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [stayLogin, setStayLogin] = useState(true)

	const oauthButton = [
		{
			id: 1,
			image: googleButton,
			redirectUrl: '',
		},
		{
			id: 2,
			image: facebookButton,
			redirectUrl: '',
		},
		{
			id: 3,
			image: kakaoButton,
			redirectUrl: urls.api.user.login.oauth.kakao.loginPage,
		},
		{
			id: 4,
			image: naverButton,
			redirectUrl: urls.api.user.login.oauth.naver.loginPage,
		},
	]

	return (
		<div className='container mt-5'>
			<div className='row row-eq-height justify-content-center'>
				<div className='col-12 col-lg-7 mb-5'>
					<Card className='text-center'>
						<Card.Body>
							<h1>📗 로그인</h1>

							<Form onSubmit={(e) => login(e, navigate, setToken, email, password, stayLogin)}>
								<Form.Group class='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label class='col-form-label text-start'>이메일</label>
									</div>

									<div class='col-9 col-lg-10'>
										<input
											maxlength='30'
											type='email'
											class='form-control'
											placeholder={userMessage.login.placeHolder.email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</Form.Group>

								<Form.Group class='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label class='text-start'>비밀번호</label>
									</div>

									<div class='col-9 col-lg-10'>
										<input
											type='password'
											class='form-control'
											placeholder={userMessage.login.placeHolder.password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</Form.Group>

								<div class='form-check mt-3 ms-3 text-start'>
									<label
										onClick={() => {
											setStayLogin(!stayLogin)
										}}>
										<label class='form-check-label' for='stay-login'>
											일주일간 로그인 유지하기
										</label>

										<input type='checkbox' class='form-check-input' checked={stayLogin} value={stayLogin} />
									</label>
								</div>

								<div className='row justify-content-center mt-3'>
									<div className='col-6 col-lg-4'>
										<Button variant='success' type='submit' className='w-100'>
											로그인
										</Button>
									</div>

									<div className='col-6 col-lg-4'>
										<Button variant='danger' className='w-100' href='join'>
											회원가입
										</Button>
									</div>

									<div className='mt-4'>
										<hr />
										<div className='text-secondary mb-3'>외부계정으로 로그인 / 가입하기</div>
										{oauthButton.map((oauth) => {
											return (
												<a href={oauth.redirectUrl}>
													<img
														style={{
															width: '50px',
														}}
														className='img-fluid ms-3 me-3 ms-md-3 me-md-3 rounded'
														src={oauth.image}
														alt=''
													/>
												</a>
											)
										})}
									</div>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-5'>
					<a href={urls.local.introduction} className='text-decoration-none text-black h-100'>
						<Card className='h-100'>
							<Card.Body className='text-center'>
								<h4>{userMessage.login.label.introduction}</h4>

								<h6 className='mt-5 mb-4'>책 읽는 모든 이들을 위한 곳, 책-it-out을 더 알고 싶으면 여기를 클릭해 주세요</h6>
							</Card.Body>
						</Card>
					</a>
				</div>

				<div className='col-12 col-lg-6 mb-5'>
					<Card className='h-100'>
						<Card.Body className='text-center'>
							<h4 className='text-center'>{userMessage.login.label.faqQna}</h4>

							<div className='row row-eq-height mt-3'>
								<div className='col-12 col-md-6'>
									<a href={urls.local.faq} className='text-decoration-none text-black'>
										<Card className='mb-3'>
											<Card.Header>{userMessage.login.label.faq.title}</Card.Header>
											<Card.Body>{userMessage.login.label.faq.content}</Card.Body>
										</Card>
									</a>
								</div>

								<div className='col-12 col-md-6'>
									<a href={urls.local.qna} className='text-decoration-none text-black'>
										<Card className='mb-3'>
											<Card.Header>{userMessage.login.label.qna.title}</Card.Header>
											<Card.Body>{userMessage.login.label.qna.content}</Card.Body>
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
