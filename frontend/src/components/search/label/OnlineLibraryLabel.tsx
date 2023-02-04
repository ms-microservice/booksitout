import { Card } from 'react-bootstrap'
import search from '../../../functions/search'

const OnlineLibraryLabel = () => {
	const onlineLibraryList = search.local.settings.onlineLibrary.display()

	if (onlineLibraryList === '') return <></>
	return (
		<div className='row justify-content-end'>
			{onlineLibraryList.split(',').map((onlineLibrary) => {
				return (
					<div className='col-6 col-lg-2 mb-1'>
						<Card className='text-center text-secondary'>{onlineLibrary}</Card>
					</div>
				)
			})}
		</div>
	)
}

export default OnlineLibraryLabel
