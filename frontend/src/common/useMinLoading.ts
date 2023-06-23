import React from "react"

export const useMinLoading = <T>(fetch, wait = 500) => {
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)
	const [data, setData] = React.useState<T | null>(null)

	React.useEffect(() => {
		let isSecondPassed = false
		let isLoadingDone = false

		const timeoutId = setTimeout(() => {
			isSecondPassed = true
			if (isLoadingDone) {
				setLoading(false)
			}
		}, wait)

		if (data == null) {
			fetch()
				.then(response => setData(response))
				.catch(() => setError(true))
				.finally(() => (isSecondPassed ? setLoading(false) : (isLoadingDone = true)))
		} else {
			setLoading(false)
		}

		return () => clearTimeout(timeoutId)
	}, [])

	return [data, loading, error]
}