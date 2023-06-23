import React from 'react'
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
}

	interface BeforeInstallPromptEvent extends Event {
		readonly platforms: Array<string>
		readonly userChoice: Promise<{
			outcome: 'accepted' | 'dismissed'
			platform: string
		}>
		prompt(): Promise<void>
	}

const PwaAddButton = () => {
    const [installPromptEvent, setInstallPromptEvent] = React.useState<BeforeInstallPromptEvent | null>(null)

    React.useEffect(() => {
		const beforeInstallPromptListener = (e: BeforeInstallPromptEvent) => {
			e.preventDefault()
			setInstallPromptEvent(e)
		}

		window.addEventListener('beforeinstallprompt', beforeInstallPromptListener)

		return () => {
			window.removeEventListener('beforeinstallprompt', beforeInstallPromptListener)
		}
	}, [])

    const handleAddClick = async () => {
		if (!installPromptEvent) {
			toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			return
		}

		installPromptEvent.prompt()
		await installPromptEvent.userChoice
		setInstallPromptEvent(null)
	}

    return (
		<Button variant='book' type='button' onClick={handleAddClick} className='w-100'>
			책잇아웃 앱으로 추가하기
		</Button>
	)
}

export default PwaAddButton
