const getDateDifferenceInDays = (date1, date2) => {
	const differenceInTime = Math.abs(date2 - date1)
	const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24)
	return differenceInDays
}

export { getDateDifferenceInDays }
