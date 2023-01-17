const base = process.env.REACT_APP_API_URL

const urls = {
	local: {
		introduction: '/introduction',
		faq: '/faq',
		qna: '/qna',
	},

	api: {
		base: process.env.REACT_APP_API_URL,

		user: {
			login: {
				basic: `${base}/login`,
				oauth: {
					kakao: (code) => `${base}/v2/login/oauth2/kakao?code=${code}`,
				},
			},
			join: `${base}/v1/join`,
			email: (email) => `${base}/v1/join/email-verification/${email}`,
		},

		book: {
			get: {
				last: `${base}/v1/book/last`,
				detail: (bookId) => `${base}/v1/book/${bookId}`,
				all: (range: string, page: number) => `${base}/v1/book/all/${range}?page=${page}`,
			},
			add: `${base}/v1/book`,
			edit: {
				all: (bookId) => `${base}/v1/book/${bookId}`,
				giveup: (bookId) => `${base}/v1/book/give-up/${bookId}`,
				unGiveup: (bookId) => `${base}/v1/book/un-give-up/${bookId}`,
			},
			delete: (bookId) => `${base}/v1/book/${bookId}`,
		},

		reading: {
			get: {
				current: `${base}/v1/reading-session/current`,
			},
		},
	},

	exclude: ['join', 'introduction', 'qna', 'faq', '/login/oauth/kakao'],
}

export default urls
