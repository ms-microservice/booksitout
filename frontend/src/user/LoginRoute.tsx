import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Functions
import user from './user'
// Settings
import urls from '../settings/urls'
import messages from '../settings/messages'
// OAuth
import kakaoButton from '../resources/images/login-button/small-kakao.png'
import naverButton from '../resources/images/login-button/small-naver.png'
import googleButton from '../resources/images/login-button/small-google.png'
import facebookButton from '../resources/images/login-button/small-facebook.png'

import utils from '../functions/utils'
import { checkIsLogin, loginToken, logoutToken } from '../redux/userSlice'
import logo from '../images/logo.png'
import axios from 'axios'
import { RootState } from '../redux/store'

const LoginRoute = () => {
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [stayLogin, setStayLogin] = React.useState<boolean>(true)

	React.useEffect(() => {
		if (isLogin) {
			navigate('/')
		}
	}, [isLogin, navigate])

	const oauthButton = [
		{
			id: 1,
			image: googleButton,
			redirectUrl: urls.api.user.login.oauth.get('GOOGLE')!!.loginPage,
			active: true,
		},
		{
			id: 2,
			image: facebookButton,
			redirectUrl: urls.api.user.login.oauth.get('FACEBOOK')!!.loginPage,
			active: false,
		},
		{
			id: 3,
			image: kakaoButton,
			redirectUrl: urls.api.user.login.oauth.get('KAKAO')!!.loginPage,
			active: true,
		},
		{
			id: 4,
			image: naverButton,
			redirectUrl: urls.api.user.login.oauth.get('NAVER')!!.loginPage,
			active: true,
		},
	]

	const handleLogin = (e) => {
		e.preventDefault()
		toast.dismiss()
		dispatch(logoutToken())

		if (email === '') {
			toast.error('이메일을 입력해 주세요')
			document.getElementById('email')!!.focus()
			return
		}

		if (!email.includes('@')) {
			toast.error('이메일 형식에 맞지 않아요')
			document.getElementById('email')!!.focus()
			return
		}

		if (password === '') {
			toast.error('비밀번호를 입력해 주세요')
			document.getElementById('password')!!.focus()
			return
		}

		if (password.length < 6) {
			toast.error('비밀번호는 6자 이상이에요')
			document.getElementById('password')!!.focus()
			return
		}

		toast.loading('로그인하고 있어요')

		const loginRequest = {
			email: email,
			password: password,
			stayLogin: stayLogin,
		}

		user.login(loginRequest).then((res) => {
			if (!res.status.toString().startsWith('2')) {
				toast.dismiss()
				if (res.data.message !== '' && res.data.message != null) {
					toast.error(res.data.message)
					return
				}

				if (res.status === 503) {
					toast.error('서버에 오류가 났어요. 열심히 복구하고 있으니 잠시만 기다려 주세요!')
					return
				}

				toast.error('알 수 없는 오류가 났어요. 잠시후 다시 시도해 주세요')
				return
			}

			localStorage.setItem('login-token', res.data.token)
			localStorage.setItem('user-name', res.data.name)
			localStorage.setItem('register-year', new Date().getFullYear().toString())
			localStorage.setItem('login-date', new Date().toString())
			localStorage.setItem('login-method', res.data.loginMethod)
			localStorage.setItem('user-id', res.data.appUserId)

			toast.dismiss()
			toast(res.data.message, { icon: '✋' })
			dispatch(loginToken(utils.getToken()))
			dispatch(checkIsLogin())

			axios.get(`${urls.api.base}/v3/search/settings/search-range/all`, { headers: { Authorization: res.data.token } }).then((res) => {
				localStorage.setItem('search-library-region-api', res.data.region)
				localStorage.setItem('search-library-region-detail-api', res.data.regionDetail)
				localStorage.setItem('search-my-book-range', res.data.myBookSearchRange)
				localStorage.setItem('search-library-online-api', res.data.libraryOnlineSearchRange)
				localStorage.setItem('search-subscription-api', res.data.subscriptionSearchRange)
				localStorage.setItem('search-used-online-api', res.data.usedOnlineSearchRange)
				localStorage.setItem('search-used-offline-api', res.data.usedOfflineSearchRange)
				localStorage.setItem('library-search-method', res.data.librarySearchMethod)
			})

			navigate('/')
		})
	}

	return (
		<div className='container mt-5'>
			<div className='row row-eq-height justify-content-center'>
				<div className='col-12 col-lg-7 mb-5'>
					<Card className='text-center'>
						<Card.Body>
							<div className='d-flex justify-content-center'>
								<img
									src={logo}
									alt=''
									className='img-fluid rounded me-2 me-md-3 mt-0 mt-md-1'
									style={{ width: '40px', height: '40px' }}
								/>
								<h1 className='mt-1 mt-md-0 mb-0'>로그인</h1>
							</div>

							<Form onSubmit={(e) => handleLogin(e)}>
								<Form.Group className='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label className='col-form-label text-start'>이메일</label>
									</div>

									<div className='col-9 col-lg-10'>
										<input
											id='email'
											maxLength={30}
											type='email'
											className='form-control'
											placeholder={messages.user.login.placeHolder.email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</Form.Group>

								<Form.Group className='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label className='text-start'>비밀번호</label>
									</div>

									<div className='col-9 col-lg-10'>
										<input
											id='password'
											type='password'
											className='form-control'
											placeholder={messages.user.login.placeHolder.password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</Form.Group>

								<Form.Group className='d-flex mt-3'>
									<Form.Switch type='switch' onClick={() => setStayLogin(!stayLogin)} checked={stayLogin} className='me-2'/>
									<Form.Label htmlFor='stay-login'>일주일간 로그인 유지하기</Form.Label>
								</Form.Group>

								<div className='bottom-btn-container'>
									<div className='bottom-btn'>
										<Button variant='book' type='submit' className='w-100'>
											로그인
										</Button>
									</div>

									<div className='bottom-btn'>
										<Button variant='outline-book' className='w-100' href='join'>
											회원가입
										</Button>
									</div>

									<div>
										<hr />
										<div className='text-secondary mb-3'>3초만에 로그인 / 가입하기</div>
										{oauthButton.map((oauth) => {
											return (
												<a href={oauth.redirectUrl} style={{ pointerEvents: !oauth.active ? 'none' : 'auto' }}>
													<img
														style={{ width: '50px' }}
														className={'img-fluid ms-1 me-1 ms-md-3 me-md-3 rounded ' + (!oauth.active && 'opacity-50')}
														src={oauth.image}
														alt=''
													/>
												</a>
											)
										})}
									</div>
								</div>

								<h6 className='text-secondary mt-5 mt-md-4'>카카오계정으로 가입하실 때 반드시 이메일을 허용해 주세요</h6>
								<h6 className='text-secondary mt-4'>현재 책잇아웃은 정식 출시하지 않았어요</h6>
								<h6 className='text-secondary mt-1'>일부 작동하지 않는 기능이 있어요</h6>
								<h6 className='text-secondary mt-1'>서버가 자주 멈출 수 있어요</h6>
							</Form>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-5'>
					<a href={urls.local.introduction} className='text-decoration-none text-black h-100'>
						<Card className='h-100'>
							<Card.Body className='text-center'>
								<h4>{messages.user.login.label.introduction}</h4>

								<h6 className='mt-5'>불편한 독서생활을 편하게하는,</h6>
								<h6 className='mb-4'>책잇아웃을 더 알고 싶으면 여기를 클릭해 주세요</h6>
							</Card.Body>
						</Card>
					</a>
				</div>

				<div className='col-12 col-lg-6 mb-5'>
					<Card className='h-100'>
						<Card.Body className='text-center'>
							<h4 className='text-center'>{messages.user.login.label.faqQna}</h4>

							<div className='row row-eq-height mt-3'>
								<div className='col-12 col-md-6'>
									<a href={urls.local.faq} className='text-decoration-none text-black'>
										<Card className='mb-3'>
											<Card.Header>{messages.user.login.label.faq.title}</Card.Header>
											<Card.Body>{messages.user.login.label.faq.content}</Card.Body>
										</Card>
									</a>
								</div>

								<div className='col-12 col-md-6'>
									<a href={urls.local.qna} className='text-decoration-none text-black'>
										<Card className='mb-3'>
											<Card.Header>{messages.user.login.label.qna.title}</Card.Header>
											<Card.Body>{messages.user.login.label.qna.content}</Card.Body>
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

export default LoginRoute
