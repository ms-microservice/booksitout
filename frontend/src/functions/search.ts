import axios from 'axios'
import urls from '../settings/urls'
import utils from './utils'

import aladin from '../resources/images/search/aladin.png'
import interpark from '../resources/images/search/interpark.png'
import kyobo from '../resources/images/search/kyobo.jpg'
import millie from '../resources/images/search/millie.png'
import ridi from '../resources/images/search/ridi.png'
import yes24 from '../resources/images/search/yes24.png'

import seoulLibrary from '../resources/images/search/seoul-library.png'
import seoulEducationLibrary from '../resources/images/search/seoul-education-library.png'
import nationalAssemblyLibrary from '../resources/images/search/national-assembly-library.png'

const isKeyPresent = {
	libraryOnline: (apiKey: string) => {
		const keys = localStorage.getItem('search-library-online-api')
		if (keys == null) return false

		return typeof keys.split(',').find((k) => k === apiKey) !== 'undefined'
	},

	subscription: (apiKey: string) => {
		const keys = localStorage.getItem('search-subscription-api')
		if (keys == null) return false

		return typeof keys.split(',').find((k) => k === apiKey) !== 'undefined'
	},

	usedOnline: (apiKey: string) => {
		const keys = localStorage.getItem('search-used-online-api')
		if (keys == null) return false

		return typeof keys.split(',').find((k) => k === apiKey) !== 'undefined'
	},

	usedOffline: (apiKey: string) => {
		const keys = localStorage.getItem('search-used-offline-api')
		if (keys == null) return false

		return typeof keys.split(',').find((k) => k === apiKey) !== 'undefined'
	},
}

const search = {

	local: {
		settings: {
			myBook: {
				range: (): string => {
					return localStorage.getItem('search-my-book-range') ?? 'ALL'
				},
			},

			library: {
				isConfigured: (): boolean => {
					return localStorage.getItem('search-library-region-api') !== '' && localStorage.getItem('search-library-region-detail-api') !== ''
				},

				display: {
					region: () => {
						const apiKey = localStorage.getItem('search-library-region-api')
						if (apiKey === '') return ''

						return search.data.region.find((r) => r.value === apiKey)?.displayName
					},
					regionDetail: () => {
						const regionApiKey = localStorage.getItem('search-library-region-api')
						const apiKey = localStorage.getItem('search-library-region-detail-api')
						if (regionApiKey === '' || apiKey === '') return ''

						return search.data.regionDetail.get(regionApiKey!)?.find((r) => r.value === apiKey)?.displayName
					},
				},

				api: {
					region: (): string => {
						return localStorage.getItem('search-library-region-api') ?? ''
					},

					regionDetail: (): string => {
						return localStorage.getItem('search-library-region-detail-api') ?? ''
					},
				},

				update: {
					region: (displayRegion: string, apiRegion: string) => {
						localStorage.setItem('search-library-region-display', displayRegion)
						localStorage.setItem('search-library-region-api', apiRegion)
					},
					regionDetail: (displayRegionDetail: string, apiRegionDetail: string) => {
						localStorage.setItem('search-library-region-detail-display', displayRegionDetail)
						localStorage.setItem('search-library-region-detail-api', apiRegionDetail)
					},
				},
			},

			onlineLibrary: {
				isConfigured: (): boolean => {
					return localStorage.getItem('search-library-online-api') !== ''
				},
				display: () => {
					return localStorage.getItem('search-library-online-display') ?? ''
				},
				api: () => {
					return localStorage.getItem('search-library-online-api') ?? ''
				},
			},

			subscription: {
				isConfigured: (): boolean => {
					return localStorage.getItem('search-subscription-api') !== ''
				},
				display: () => {
					return localStorage.getItem('search-subscription-display') ?? ''
				},
				api: () => {
					return localStorage.getItem('search-subscription-api') ?? ''
				},
			},

			usedOnline: {
				isConfigured: (): boolean => {
					return localStorage.getItem('search-used-online-api') !== ''
				},
				display: () => {
					return localStorage.getItem('search-used-online-display') ?? ''
				},
				api: () => {
					return localStorage.getItem('search-used-online-api') ?? ''
				},
			},

			usedOffline: {
				isConfigured: (): boolean => {
					return localStorage.getItem('search-used-offline-api') !== ''
				},
				display: () => {
					return localStorage.getItem('search-used-offline-display') ?? ''
				},
				api: () => {
					return localStorage.getItem('search-used-offline-api') ?? ''
				},
			},
		},
	},

	api: {
		search: {
			myBook: (query: string) => {
				return axios
					.get(urls.api.search.myBook(query), { headers: { Authorization: utils.getToken() } })
					.then((res) => res.data)
					.catch(() => {
						return []
					})
			},

			used: (query: string, includeOnline: string, includeOffline: string) => {
				return axios
					.get(urls.api.search.used(query, includeOnline, includeOffline))
					.then((res) => res.data)
					.catch(() => {
						return []
					})
			},

			library: (query: string, region: string, regionDetail: string) => {
				return axios
					.get(urls.api.search.libraryByRegion(query, region, regionDetail))
					.then((res) => res.data)
					.catch(() => {
						return []
					})
			},

			subscription: (query: string, include: string) => {
				return axios
					.get(urls.api.search.subscription(query, include))
					.then((res) => res.data)
					.catch(() => {
						return []
					})
			},
		},

		settings: {
			myBook: {
				changeSearchRange: (range: string) => {
					return axios
						.put(urls.api.search.settings.myBook.changeRange(), { range: range }, { headers: { Authorization: utils.getToken() } })
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},
			},

			library: {
				changeRegion: (region: string | null, regionDetail: string | null) => {
					return axios
						.put(
							urls.api.search.settings.changeRegion(),
							{ region: region, regionDetail: regionDetail },
							{ headers: { Authorization: utils.getToken() } }
						)
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},

				deleteRegion: () => {
					return axios
						.delete(urls.api.search.settings.changeRegion(), { headers: { Authorization: utils.getToken() } })
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},
			},

			libraryOnline: {
				changeSearchRange: (range: string) => {
					return axios
						.put(urls.api.search.settings.libraryOnline.searchRange(), { range: range }, { headers: { Authorization: utils.getToken() } })
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},
			},

			subscription: {
				changeSearchRange: (range: string) => {
					return axios
						.put(urls.api.search.settings.subscription.searchRange(), { range: range }, { headers: { Authorization: utils.getToken() } })
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},
			},

			usedOnline: {
				changeSearchRange: (range: string) => {
					return axios
						.put(urls.api.search.settings.usedOnline.searchRange(), { range: range }, { headers: { Authorization: utils.getToken() } })
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},
			},

			usedOffline: {
				changeSearchRange: (range: string) => {
					return axios
						.put(urls.api.search.settings.usedOffline.searchRange(), { range: range }, { headers: { Authorization: utils.getToken() } })
						.then((res) => {
							return res.status
						})
						.catch(() => {
							return 500
						})
				},
			},
		},
	},

	data: {
		onlineLibrary: [
			{
				icon: seoulLibrary,
				name: '서울 전자도서관',
				key: 'SEOUL_LIBRARY',
				included: isKeyPresent.libraryOnline('SEOUL_LIBRARY'),
			},
			{
				icon: seoulEducationLibrary,
				name: '서울교육청 전자도서관',
				key: 'SEOUL_EDUCATION_LIBRARY',
				included: isKeyPresent.libraryOnline('SEOUL_EDUCATION_LIBRARY'),
			},
			{
				icon: nationalAssemblyLibrary,
				name: '국회 전자도서관',
				key: 'NATIONAL_ASSEMBLY_LIBRARY',
				included: isKeyPresent.libraryOnline('NATIONAL_ASSEMBLY_LIBRARY'),
			},
		],

		usedOnline: [
			{
				icon: aladin,
				name: '알라딘 직접배송',
				key: 'ALADIN',
				included: isKeyPresent.usedOnline('ALADIN'),
			},
			{
				icon: yes24,
				name: 'YES24',
				key: 'YES24',
				included: isKeyPresent.usedOnline('YES24'),
			},
			{
				icon: kyobo,
				name: '교보문고 중고',
				key: 'KYOBO',
				included: isKeyPresent.usedOnline('KYOBO'),
			},
			{
				icon: interpark,
				name: '인터파크 중고도서',
				key: 'INTERPARK',
				included: isKeyPresent.usedOnline('INTERPARK'),
			},	
		],

		usedOffline: [
			{
				icon: aladin,
				name: '알라딘 우주점',
				key: 'ALADIN',
				included: isKeyPresent.usedOffline('ALADIN'),
			},
			{
				icon: yes24,
				name: 'YES24',
				key: 'YES24',
				included: isKeyPresent.usedOffline('YES24'),
			},	
		],

		subscription: [
			{
				icon: millie,
				name: '밀리의 서재',
				key: 'MILLIE',
				included: isKeyPresent.subscription('MILLIE'),
			},
			{
				icon: ridi,
				name: '리디 셀렉트',
				key: 'RIDI',
				included: isKeyPresent.subscription('RIDI'),
			},
			{
				icon: yes24,
				name: 'YES24 북클럽',
				key: 'YES24',
				included: isKeyPresent.subscription('YES24'),
			},
			{
				icon: kyobo,
				name: '교보문고 SAM',
				key: 'KYOBO',
				included: isKeyPresent.subscription('KYOBO'),
			},	
		],

		region: [
			{ displayName: '서울', value: 'SEOUL' },
			{ displayName: '부산', value: 'BUSAN' },
			{ displayName: '대구', value: 'DAEGU' },
			{ displayName: '인천', value: 'INCHEON' },
			{ displayName: '광주', value: 'GWANGJU' },
			{ displayName: '대전', value: 'DAEJEON' },
			{ displayName: '울산', value: 'ULSAN' },
			{ displayName: '세종', value: 'SEJONG' },
			{ displayName: '경기도', value: 'GYEONGGIDO' },
			{ displayName: '강원도', value: 'GANGWONDO' },
			{ displayName: '충청북도', value: 'CHUNGCHEONGBUKDO' },
			{ displayName: '충청남도', value: 'CHUNGCHEONGNAMDO' },
			{ displayName: '전라북도', value: 'JEOLLABUKDO' },
			{ displayName: '전라남도', value: 'JEOLLANAMDO' },
			{ displayName: '경상북도', value: 'GYEONGSANGBUKDO' },
			{ displayName: '경상남도', value: 'GYEONGSANGNAMDO' },
			{ displayName: '제주', value: 'JEJU' },	
		],

		regionDetail: new Map([
			['SEOUL', [
				{ value: 'JONGNOGU', displayName: '종로구' },
				{ value: 'JUNGGU', displayName: '중구' },
				{ value: 'YONGSANGU', displayName: '용산구' },
				{ value: 'SEONGDONGGU', displayName: '성동구' },
				{ value: 'GWANGJINGU', displayName: '광진구' },
				{ value: 'DONGDAEMUNGU', displayName: '동대문구' },
				{ value: 'JUNGNANGGU', displayName: '중랑구' },
				{ value: 'SEONGBUKGU', displayName: '성북구' },
				{ value: 'GANGBUKGU', displayName: '강북구' },
				{ value: 'DOBONGGU', displayName: '도봉구' },
				{ value: 'NOWONGU', displayName: '노원구' },
				{ value: 'EUNPYEONGGU', displayName: '은평구' },
				{ value: 'SEODAEMUNGU', displayName: '서대문구' },
				{ value: 'MAPOGU', displayName: '마포구' },
				{ value: 'YANGCHEONGU', displayName: '양천구' },
				{ value: 'GANGSEOGU', displayName: '강서구' },
				{ value: 'GUROGU', displayName: '구로구' },
				{ value: 'GEUMCHEONGU', displayName: '금천구' },
				{ value: 'YEONGDEUNGPOGU', displayName: '영등포구' },
				{ value: 'DONGJAKGU', displayName: '동작구' },
				{ value: 'GWANAKGU', displayName: '관악구' },
				{ value: 'SEOCHOGU', displayName: '서초구' },
				{ value: 'GANGNAMGU', displayName: '강남구' },
				{ value: 'SONGPAGU', displayName: '송파구' },
				{ value: 'GANGDONGGU', displayName: '강동구' },		
			]]
		])

	},

}

export default search
