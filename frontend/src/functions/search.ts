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

	splitArray: (originalArray: any[], count: number) => {
		if (originalArray == null) return [[]]

		const splitList: any[][] = []

		for (let i = 0; i < originalArray.length; i += 2) {
			splitList.push([originalArray[i], originalArray.length - 1 === i ? null : originalArray[i + 1]])
		}

		return splitList
	},
}

export default search
