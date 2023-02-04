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
}

export default utils
