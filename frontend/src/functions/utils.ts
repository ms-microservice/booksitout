const moneyFormatter = new Intl.NumberFormat('kr-KO', {
	style: 'currency',
	currency: 'KRW',
})

const utils = {
	getToken: () => localStorage.getItem('login-token'),
	isEmailValid: (email) => {
		return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	},

	formatMoney: (money: number | null) => {
		if (money == null) return ''

		return moneyFormatter.format(money)
	},

	splitArray: (originalArray: any[], count: number) => {
		if (originalArray == null) return [[]]

		const splitList: any[][] = []

		for (let i = 0; i < originalArray.length; i += 2) {
			splitList.push([originalArray[i], originalArray.length - 1 === i ? null : originalArray[i + 1]])
		}

		return splitList
	},

	closeKeyboard: (e) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			document.querySelector('input')?.blur()
		}
	}
}

export default utils
