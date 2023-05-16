import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import parse from 'html-react-parser'
import ChangeNameModal from './ChageNameModal'
import ChangePasswordModal from './ChangePasswordModal'

const PersonalInfoSettings = () => {
	const [passwordModalShow, setPasswordModalShow] = useState(false)
	const [nameModalShow, setNameModalShow] = useState(false)

	return (
		<div className='container-xl'>
			<ChangePasswordModal show={passwordModalShow} setShow={setPasswordModalShow} />
			<ChangeNameModal show={nameModalShow} setShow={setNameModalShow} />

			<Card className='mb-5'>
				<Card.Body>
					<h3 className='mb-5'>개인 정보 수정</h3>

					<PersonalInfoCard
						title='이메일'
						contentList={[
							'아이디로 사용되는 이메일이에요',
							'알림 메일을 변경하고 싶으시면 <a href="/settings/notification">여기</a>를 눌러 주세요',
						]}
						button={
							<Button variant='book-danger' className='w-100' disabled>
								이메일 변경
							</Button>
						}
					/>

					<PersonalInfoCard
						title='비밀번호'
						contentList={['간편 로그인(소셜 로그인) 만 사용하셔서 로그인 하셨을 경우 비밀번호가 없어요']}
						button={
							<Button
								variant='book'
								className='w-100'
								disabled={localStorage.getItem('login-method') !== 'MANUAL'}
								onClick={() => setPasswordModalShow(true)}>
								비밀번호 변경
							</Button>
						}
					/>

					<PersonalInfoCard
						title='이름'
						contentList={[
							'책잇아웃 내에서 사용되는 이름이에요',
							'커뮤니티에서 보이는 이름과는 달라요',
							'커뮤니티 프로필을 바꾸고 싶으시면 <a href="/settings/community">여기</a>를 눌러 주세요',
						]}
						button={
							<Button variant='book' className='w-100' onClick={() => setNameModalShow(true)}>
								이름 변경
							</Button>
						}
					/>
				</Card.Body>
			</Card>
		</div>
	)
}

const PersonalInfoCard = ({ title, contentList, button }) => {
	return (
		<Card style={{ height: '250px' }} className='mb-4'>
			<Card.Body>
				<h4>{title}</h4>

				<div className='ms-md-3'>
					{contentList.map((content) => {
						return <div className='text-secondary'>{parse(content)}</div>
					})}
				</div>

				<div className='row justify-content-center'>
					<div className='col-12 col-md-6' style={{ position: 'absolute', bottom: '20px' }}>
						{button}
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default PersonalInfoSettings
