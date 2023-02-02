import axios from 'axios'
import urls from '../settings/urls'
import utils from './utils'

const search = {
	myBook: (query: string) => {
		return axios
			.get(urls.api.search.myBook(query), { headers: { Authorization: utils.getToken() } })
			.then((res) => res.data)
			.catch(() => {
				return []
			})
	},

	used: (query: string, include: string) => {
		return axios
			.get(urls.api.search.used(query, include))
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

	splitArray: (originalArray: any[], count: number) => {
		if (originalArray == null) return [[]]

		const splitList: any[][] = []

		for (let i = 0; i < originalArray.length; i += 2) {
			splitList.push([originalArray[i], originalArray.length - 1 === i ? null : originalArray[i + 1]])
		}

		return splitList
	},

	settings: {
		library: {
			isConfigured: (): boolean => {
				return search.settings.library.api.region() !== '' && search.settings.library.api.regionDetail() !== ''
			},

			display: {
				region: () => {
					return localStorage.getItem('search-library-region-display') ?? ''
				},
				regionDetail: () => {
					return localStorage.getItem('search-library-region-detail-display') ?? ''
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
		},

		onlineLibrary: {
			isConfigured: (): boolean => {
				return search.settings.onlineLibrary.display() !== '' && search.settings.onlineLibrary.api() !== ''
			},
			display: () => {
				return localStorage.getItem('search-online-library-display') ?? ''
			},
			api: () => {
				return localStorage.getItem('search-online-library-api') ?? ''
			},
		},

		subscription: {
			isConfigured: (): boolean => {
				return search.settings.subscription.display() !== '' && search.settings.subscription.api() !== ''
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
				return search.settings.usedOnline.display() !== '' && search.settings.usedOnline.api() !== ''
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
				return search.settings.usedOffline.display() !== '' && search.settings.usedOffline.api() !== ''
			},
			display: () => {
				return localStorage.getItem('search-used-offline-display') ?? ''
			},
			api: () => {
				return localStorage.getItem('search-used-offline-api') ?? ''
			},
		},
	},
}

export default search
