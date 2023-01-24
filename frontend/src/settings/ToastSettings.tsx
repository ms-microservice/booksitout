import { useEffect } from 'react'
import uiSettings from './ui'
import { useToasterStore, toast } from 'react-hot-toast'

const ToastSettings = () => {
	const { toasts } = useToasterStore()
	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= uiSettings.toastLimit)
			.forEach((t) => toast.dismiss(t.id))
	}, [toasts])

	return <></>
}

export default ToastSettings
