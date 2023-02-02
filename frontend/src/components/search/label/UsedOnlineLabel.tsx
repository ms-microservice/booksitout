import '../../../resources/css/image.css'

import aladin from '../../../resources/images/search/aladin.png'
import yes24 from '../../../resources/images/search/yes24.png'
import interpark from '../../../resources/images/search/interpark.png'

import search from '../../../functions/search'

const UsedOnlineLabel = () => {
	const iconStyle = { width: '40px', height: '40px' }
	const baseClassName = `img-fluid rounded border ms-3 mb-2`

	const usedOnlineList = search.settings.usedOnline.api()
	const getImage = (label: string) => {
		if (label === 'ALADIN') return aladin
		if (label === 'YES24') return yes24
		if (label === 'INTERPARK') return interpark
	}

	if (usedOnlineList === '') return <></>
	return (
		<>
			{usedOnlineList.split(',').map((used) => {
				return <img src={getImage(used)} alt='' className={`${baseClassName}`} style={iconStyle} />
			})}
		</>
	)
}

export default UsedOnlineLabel
