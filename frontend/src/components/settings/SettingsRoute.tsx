import SettingsLinkCard from "./SettingsLinkCard"

const SettingsRoute = () => {
	return (
		<div className='container-xl'>
			<div className='row row-eq-height justify-content-start'>
				<div className='col-12 col-md-6 mb-4'>
					<SettingsLinkCard 
						title='개인 정보 수정' 
						contentList={['이메일 변경', '비밀번호 변경', '이름 변경']} 
						link='/settings/personal-info' 
					/>
				</div>

				<div className='col-12 col-md-6 mb-4'>
					<SettingsLinkCard
						title='검색 설정'
						contentList={['검색할 곳 지정', '내 책 검색 범위 지정', '도서관 검색 설정']}
						link='/settings/search'
					/>
				</div>

				<div className='col-12 col-md-6 mb-4'>
					<SettingsLinkCard 
						title='커뮤니티 설정' 
						contentList={['커뮤니티 프로필 설정', '알림 설정']} 
						link='/settings/community' 
					/>
				</div>
			</div>
		</div>
	)
}


export default SettingsRoute
