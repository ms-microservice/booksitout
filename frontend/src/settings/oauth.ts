const kakao = {
	clientId: 'e0b8e02a9826e15029e2182d1d03bf2b',
	responseType: 'code',
	redirectUrl: `https%3A%2F%2Fbooksitout.com%2Flogin%2Foauth%2Fkakao%2F`,
}

const naver = {
	clientId: 'WWI0nkWyzfAIMmjR0Y8N',
	responseType: 'code',
	redirectUrl: `https%3A%2F%2Fbooksitout.com%2Flogin%2Foauth%2Fnaver%2F`,
	state: 'bookitout',
}

const google = {
	clientId: '1006818294840-ukep9b2djha66u8on652mjkmmi93q94h.apps.googleusercontent.com',
	responseType: 'code',
	redirectUrl: `https%3A%2F%2Fbooksitout.com%2Flogin%2Foauth%2Fgoogle`,
	scope: `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
}

const facebook = {
	clientId: ``,
	redirectUrl: `https%3A%2F%2Fbooksitout.com%2Flogin%2Foauth%2Ffacebook`,
	state: ``,
}

export { kakao, naver, google, facebook }
