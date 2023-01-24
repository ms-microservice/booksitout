const date = {
	getDateDifferenceInDays: (date1: Date, date2: Date): number => {
		const differenceInTime = Math.abs(date1.getTime() - date2.getTime())
		const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24)
		return differenceInDays
	},
	getDayCountOfMonth: (year: number, month: number): number => {
		return new Date(year, month, 0).getDate()
	},
}

export default date
