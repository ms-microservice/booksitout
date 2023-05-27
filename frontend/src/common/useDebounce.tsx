import { useEffect, useRef, useState } from "react";

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value)
	const timeoutRef = useRef<NodeJS.Timeout>()

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		timeoutRef.current = handler

		return () => {
			clearTimeout(timeoutRef.current)
		}
	}, [value, delay])

	const cancelDebounce = () => clearTimeout(timeoutRef.current)

	return [debouncedValue, cancelDebounce]
}