import '../../../resources/css/image.css'

import millie from '../../../resources/images/search/millie.png'
import yes24 from '../../../resources/images/search/yes24.png'
import ridi from '../../../resources/images/search/ridi.png'
import kyobo from '../../../resources/images/search/kyobo.jpg'

import search from '../../../functions/search'

const SubscriptionLabel = () => {
	const iconStyle = { width: '40px', height: '40px' }
	const baseClassName = `img-fluid border rounded mb-2 ms-3`

	const subscriptionList = search.local.settings.subscription.api()
	const getImage = (label: string) => {
		if (label === 'MILLIE') return millie
		if (label === 'YES24') return yes24
		if (label === 'RIDI') return ridi
		if (label === 'KYOBO') return kyobo
		return ''
	}

	if (subscriptionList === '') return <></>
	return (
		<>
			{subscriptionList.split(',').map((subscription) => {
				return <a href={search.getLink(subscription)} target='_blank' rel="noreferrer">
					<img src={getImage(subscription)} alt='' className={`${baseClassName}`} style={iconStyle} />
				</a>
			})}
		</>
	)
}

export default SubscriptionLabel
