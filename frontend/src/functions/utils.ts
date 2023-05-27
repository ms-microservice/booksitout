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
		var result = reversed.replace(/(\d{3})/g, '$1,').split('').reverse().join('')

		return result.startsWith(',') ? result.substring(1) : result
	},
}

export default utils
