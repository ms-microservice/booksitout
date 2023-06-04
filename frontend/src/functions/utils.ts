const moneyFormatter = new Intl.NumberFormat('kr-KO', {
	style: 'currency',
	currency: 'KRW',
})

const utils = {
	getToken: () => localStorage.getItem('login-token'),

	getUserId: () => Number(localStorage.getItem('user-id')),

	isEmailValid: (email) => {
		return email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	},

	formatMoney: (money: number | null) => {
		if (money == null) return ''

		return moneyFormatter.format(money)
	},

	splitArray: (originalArray: any[], count: number) => {
		if (originalArray == null) return [[]]

		const splitList: any[][] = []

		for (let i = 0; i < originalArray.length; i += count) {
			splitList.push(originalArray.slice(i, i + count))
		}

		return splitList
	},

	insertCommas: (str) => {
		var reversed = str.toString().split('').reverse().join('')
		var result = reversed
			.replace(/(\d{3})/g, '$1,')
			.split('')
			.reverse()
			.join('')

		return result.startsWith(',') ? result.substring(1) : result
	},

	insertSpace: (str, atEvery = 4) => {
		return str.replace(new RegExp(`(\\d{${atEvery}})`, 'g'), '$1 ')
	},

	isHoursPassed: (key: string, hours: number): boolean => {
		const storedTimestamp = localStorage.getItem(key)

		if (storedTimestamp) {
			const storedTime = new Date(storedTimestamp)
			const currentTime = new Date()
			const timeDiff = currentTime.getTime() - storedTime.getTime()
			const hoursPassed = timeDiff / (1000 * 60 * 60)
			return hoursPassed >= hours
		}

		return false
	},

	getNumbersFromLocalStorage: (key: string): [number | null, number | null] => {
		const storedValue = localStorage.getItem(key)
		if (storedValue) {
			const [firstValue, secondValue] = storedValue.split(',')
			return [parseFloat(firstValue), parseFloat(secondValue)]
		}
		return [null, null]
	},
}

export default utils
