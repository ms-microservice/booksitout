import { useEffect } from 'react'
import search from '../../../functions/search'

const OnlineLibraryLabel = () => {
	const onlineLibraryList = search.local.settings.onlineLibrary.api() !== '' ? 
		search.local.settings.onlineLibrary.api().split(",").map((l) => search.data.onlineLibrary.find((library) => library.key === l)) :
		[]

		useEffect(() => {
			console.log(onlineLibraryList)
		}, [])

	if (onlineLibraryList.length === 0 || typeof onlineLibraryList === 'undefined') return <></>
	return (
		<div className='row justify-content-end text-center'>
			{onlineLibraryList.map((onlineLibrary) => {
				return (
					<a href={search.getLink(onlineLibrary?.key ?? '')} 
						target='_blank' rel="noreferrer"
						className='col-6 col-lg-2 text-decoration-none text-black border'>
						<span className='text-center text-secondary'>{onlineLibrary?.name}</span>
					</a>
				)
			})}
		</div>
	)
}

export default OnlineLibraryLabel
