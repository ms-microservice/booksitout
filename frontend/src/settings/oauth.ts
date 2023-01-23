const localBase = process.env.REACT_APP_LOCAL_URL

const kakao = {
	clientId: 'e0b8e02a9826e15029e2182d1d03bf2b',
	responseType: 'code',
	redirectUrl: `https%3A%2F%2Fbook.jinkyumpark.com%2Flogin%2Foauth%2Fkakao%2F`,
}

const naver = {
	clientId: 'WWI0nkWyzfAIMmjR0Y8N',
	responseType: 'code',
	redirectUrl: `https%3A%2F%2Fbook.jinkyumpark.com%2Flogin%2Foauth%2Fnaver%2F`,
	// redirectUrl: `http://localhost:3000/login/oauth/naver/`,
	state: 'bookitout',
}

const google = {
	clientId: '1054186388784-pvv99ifu26lc883obgl6lf05s0utdv7v.apps.googleusercontent.com',
	responseType: 'code',
	redirectUrl: `https%3A%2F%2Fbook.jinkyumpark.com%2Flogin%2Foauth%2Fgoogle`,
	scope: `https://www.googleapis.com/auth/userinfo.profile`,
}

const facebook = {}

export { kakao, naver, google, facebook }
