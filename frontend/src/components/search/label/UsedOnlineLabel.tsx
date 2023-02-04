import '../../../resources/css/image.css'

import aladin from '../../../resources/images/search/aladin.png'
import yes24 from '../../../resources/images/search/yes24.png'
import interpark from '../../../resources/images/search/interpark.png'
import kyobo from '../../../resources/images/search/kyobo.jpg'

import search from '../../../functions/search'

const UsedOnlineLabel = () => {
	const iconStyle = { width: '40px', height: '40px' }
	const baseClassName = `img-fluid rounded border ms-3 mb-2`

	const usedOnlineList = search.local.settings.usedOnline.api()
	const getImage = (label: string) => {
		if (label === 'ALADIN') return aladin
		if (label === 'YES24') return yes24
		if (label === 'INTERPARK') return interpark
		if (label === 'KYOBO') return kyobo
	}

	if (usedOnlineList === '') return <></>
	return (
		<>
			{usedOnlineList.split(',').map((used) => {
				return <a href={search.getLink(used)} target='_blank' rel="noreferrer" >
					<img src={getImage(used)} alt='' className={`${baseClassName}`} style={iconStyle} />
				</a>
			})}
		</>
	)
}

export default UsedOnlineLabel
