const localBase = process.env.REACT_APP_LOCAL_URL

const kakao = {
	clientId: 'e0b8e02a9826e15029e2182d1d03bf2b',
	responseType: 'code',
	redirectUrl: `${localBase}/login/oauth/kakao/`,
}

const naver = {
	clientId: 'WWI0nkWyzfAIMmjR0Y8N',
	responseType: 'code',
	redirectUrl: `${localBase}/login/oauth/naver/`,
	state: 'bookitout',
}

const google = {}

const facebook = {}

export { kakao, naver, google, facebook }
