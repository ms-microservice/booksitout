import { google, kakao, naver, facebook } from '../settings/oauth'

const apiBase = process.env.REACT_APP_API_URL

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
				basic: `${apiBase}/user/v3/login`,
				oauth: new Map([
					[
						'KAKAO',
						{
							api: (code, additional) => `${apiBase}/user/v2/login/oauth2/kakao?code=${code}`,
							loginPage: `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientId}&redirect_uri=${kakao.redirectUrl}&response_type=${kakao.responseType}`,
						},
					],
					[
						'NAVER',
						{
							api: (code, state) => `${apiBase}/user/v2/login/oauth2/naver?code=${code}&state=${state}`,
							loginPage: `https://nid.naver.com/oauth2.0/authorize?client_id=${naver.clientId}&redirect_uri=${naver.redirectUrl}&response_type=${naver.responseType}&state=bookitout&version=js-2.0.1`,
						},
					],
					[
						'GOOGLE',
						{
							api: (code, scope) => `${apiBase}/user/v2/login/oauth2/google?code=${code}&scope=${scope}`,
							loginPage: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google.clientId}&redirect_uri=${google.redirectUrl}&response_type=${google.responseType}&scope=${google.scope}`,
						},
					],
					[
						'FACEBOOK',
						{
							api: (code) => `${apiBase}/user/v2/login/oauth2/facebook?code=${code}`,
							loginPage: `https://www.facebook.com/v15.0/dialog/oauth?client_id=${facebook.clientId}&redirect_uri=${facebook.redirectUrl}&state=${facebook.state}`,
						},
					],
				]),
			},
			join: `${apiBase}/user/v1/join`,
			email: (email) => `${apiBase}/user/v1/join/email-verification/${email}`,
			change: {
				name: `${apiBase}/user/v1/change-name`,
				password: {
					verify: `${apiBase}/user/v1/change-name`,
					change: `${apiBase}/user/v1/change-password`,
				},
			},
		},

		book: {
			get: {
				last: `${apiBase}/v1/book/last`,
				detail: (bookId) => `${apiBase}/v1/book/${bookId}`,
				all: (range: string, page: number, size: number) => `${apiBase}/v1/book/all/${range}?page=${page}&size=${size}`,
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
				summary: (year) => `${apiBase}/v3/statistics/year/${year}`,
				language: `${apiBase}/v1/statistics/language`,
				category: `${apiBase}/v1/statistics/category`,
			},
		},

		search: {
			myBook: (query) => `${apiBase}/v2/search/my-book?query=${query}&range=${localStorage.getItem('search-my-book-range') || 'ALL'}`,
			used: (query: string, includeOnline: string, includeOffline: string) =>
				`${apiBase}/v2/search/used?query=${query}&include-online=${includeOnline}&include-offline=${includeOffline}`,
			subscription: (query, include) => `${apiBase}/v2/search/subscription?query=${query}&include=${include}`,
			libraryByLibrary: (query, includeLibraryCodeList) =>
				`${apiBase}/v2/search/library/by-library?query=${query}&include=${includeLibraryCodeList}`,
			libraryByRegion: (query, region, regionDetail) =>
				`${apiBase}/v2/search/library/offline/by-region?query=${query}&region=${region}&region-detail=${regionDetail}`,
			libraryOnline: (query, include) => `${apiBase}/v2/search/library/online?query=${query}&include=${include}`,

			settings: {
				myBook: {
					changeRange: () => `${apiBase}/v2/settings/search/my-book/search-range`,
				},

				changeRegion: () => `${apiBase}/v2/settings/search/library-offline/region`,

				libraryOnline: {
					searchRange: () => `${apiBase}/v2/settings/search/library-online/search-range`,
				},
				subscription: {
					searchRange: () => `${apiBase}/v2/settings/search/subscription/search-range`,
				},
				usedOnline: {
					searchRange: () => `${apiBase}/v2/settings/search/used-online/search-range`,
				},
				usedOffline: {
					searchRange: () => `${apiBase}/v2/settings/search/used-offline/search-range`,
				},
			},
		},
	},

	exclude: ['join', 'introduction', 'qna', 'faq', '/login/oauth/kakao', '/login/oauth/naver', '/login/oauth/google', '/login/oauth/facebook'],
}

export default urls
