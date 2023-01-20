import { kakao, naver } from '../settings/oauth'

const apiBase = process.env.REACT_APP_API_URL
const localBase = process.env.REACT_APP_LOCAL_URL

const urls = {
	local: {
		base: process.env.REACT_APP_LOCAL_URL,

		introduction: '/introduction',
		faq: '/faq',
		qna: '/qna',
	},

	api: {
		base: process.env.REACT_APP_API_URL,

		user: {
			login: {
				basic: `${apiBase}/login`,
				oauth: {
					kakao: {
						api: (code) => `${apiBase}/v2/login/oauth2/kakao?code=${code}`,
						loginPage: `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientId}&redirect_uri=${localBase}/login/oauth/kakao/&response_type=${kakao.responseType}`,
					},
					naver: {
						api: (code, state) => `${apiBase}/v2/login/oauth2/naver?code=${code}&state=${state}`,
						loginPage: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver.clientId}&redirect_uri=${localBase}/login/oauth/naver/&version=js-2.0.1&state=bookitout`,
					},
				},
			},
			join: `${apiBase}/v1/join`,
			email: (email) => `${apiBase}/v1/join/email-verification/${email}`,
			change: {
				name: `${apiBase}/v1/change-name`,
				password: {
					verify: `${apiBase}/v1/change-name`,
					change: `${apiBase}/v1/change-password`,
				},
			},
		},

		book: {
			get: {
				last: `${apiBase}/v1/book/last`,
				detail: (bookId) => `${apiBase}/v1/book/${bookId}`,
				all: (range: string, page: number) => `${apiBase}/v1/book/all/${range}?page=${page}`,
			},
			add: `${apiBase}/v1/book`,
			edit: {
				all: (bookId) => `${apiBase}/v1/book/${bookId}`,
				giveup: (bookId) => `${apiBase}/v1/book/give-up/${bookId}`,
				unGiveup: (bookId) => `${apiBase}/v1/book/un-give-up/${bookId}`,
			},
			delete: (bookId) => `${apiBase}/v1/book/${bookId}`,
		},

		reading: {
			get: {
				current: `${apiBase}/v1/reading-session/current`,
				currentBook: `${apiBase}/v1/book/current-reading-session`,
				all: (bookId) => `${apiBase}/v1/reading-session/${bookId}`,
			},
			add: {
				start: (bookId) => `${apiBase}/v1/reading-session/${bookId}/start`,
				all: (bookId) => `${apiBase}/v1/reading-session/${bookId}`,
			},
			edit: {
				end: (bookId, endPage, seconds) => `${apiBase}/v1/reading-session/${bookId}/end?page=${endPage}&time=${seconds}`,
				id: (readingSessionId) => `${apiBase}/v1/reading-session/${readingSessionId}/all`,
			},
			delete: {
				notSaving: `${apiBase}/v1/reading-session/not-saving`,
				all: (readingSessionId) => `${apiBase}/v1/reading-session/${readingSessionId}`,
			},
		},

		memo: {
			get: {
				all: (bookId) => `${apiBase}/v1/memo/all/${bookId}`,
			},
			add: (bookId) => `${apiBase}/v1/memo/${bookId}`,
			edit: (memoId) => `${apiBase}/v1/memo/${memoId}`,
			delete: (memoId) => `${apiBase}/v1/memo/${memoId}`,
		},

		quotation: {
			get: {
				all: (bookId) => `${apiBase}/v1/quotation/all/${bookId}`,
			},
			add: (bookId) => `${apiBase}/v1/quotation/${bookId}`,
			edit: (quotationId) => `${apiBase}/v1/quotation/${quotationId}`,
			delete: (quotationId) => `${apiBase}/v1/quotation/${quotationId}`,
		},

		goal: {
			get: {
				duration: (duration) => `${apiBase}/v1/goal?duration=${duration}`,
				year: (year) => `${apiBase}/v1/goal/${year}`,
			},
			add: (year, goal) => `${apiBase}/v1/goal?year=${year}&goal=${goal}`,
			edit: '',
			delete: (year) => `${apiBase}/v1/goal/${year}`,
		},

		statistics: {
			get: {
				readTime: (duration) => `${apiBase}/v1/statistics/read-time/${duration}`,
				summary: (year) => `${apiBase}/v1/statistics/year/${year}`,
				language: `${apiBase}/v1/statistics/language`,
				category: `${apiBase}/v1/statistics/category`,
			},
		},
	},

	exclude: ['join', 'introduction', 'qna', 'faq', '/login/oauth/kakao', '/login/oauth/naver'],
}

export default urls
