import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import axios from 'axios'

import user from '../../functions/user'
import urls from '../../settings/urls'
import utils from '../../functions/utils'
import messages from '../../settings/messages'

import { checkIsLogin, loginToken, logoutToken } from '../../redux/userSlice'

import logo from '../../resources/images/logo/logo.png'
import kakaoButton from '../../resources/images/login-button/small-kakao.png'
import naverButton from '../../resources/images/login-button/small-naver.png'
import googleButton from '../../resources/images/login-button/small-google.png'
import facebookButton from '../../resources/images/login-button/small-facebook.png'

const MainLogin = () => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [stayLogin, setStayLogin] = useState(true)

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
				if (res.data.message != '' && res.data.message != null) {
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

			toast.dismiss()
			toast(res.data.message, { icon: '✋' })
			dispatch(loginToken(utils.getToken()))

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

			dispatch(checkIsLogin())
		})
	}

	return (
		<div className='h-100'>
			<div className='d-flex justify-content-center p-3'>
				<img src={logo} alt='' className='img-fluid rounded me-2 me-md-3 mt-0 mt-md-1' style={{ width: '40px', height: '40px' }} />
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
							className='form-control'
							id='password'
							type='password'
							placeholder={messages.user.login.placeHolder.password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</Form.Group>

				<div className='form-check mt-3 ms-3 text-start'>
					<label
						onClick={() => {
							setStayLogin(!stayLogin)
						}}>
						<label className='form-check-label' htmlFor='stay-login'>
							일주일간 로그인 유지하기
						</label>

						<input type='checkbox' className='form-check-input' checked={stayLogin} value={stayLogin.toString()} />
					</label>
				</div>

				<div className='row justify-content-center mt-3 mt-md-4'>
					<div className='col-6 col-lg-4'>
						<Button variant='book-danger' className='w-100' href='join'>
							회원가입
						</Button>
					</div>

					<div className='col-6 col-lg-4'>
						<Button variant='book' type='submit' className='w-100'>
							로그인
						</Button>
					</div>

					<div className='mt-4'>
						<hr />

						<div className='text-secondary mb-3 text-center'>외부계정으로 로그인 / 가입하기</div>

						<div className='text-center'>
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
				</div>
			</Form>
		</div>
	)
}

export default MainLogin
