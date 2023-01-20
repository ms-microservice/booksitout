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
	state: 'bookitout',
}

const google = {}

const facebook = {}

export { kakao, naver, google, facebook }
