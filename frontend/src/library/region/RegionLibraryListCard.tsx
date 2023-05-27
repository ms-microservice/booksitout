import React from 'react'
import LibraryCard from '../LibraryCard'

const RegionLibraryListCard = ({ pagedLibrary }) => {
	return (
		<div className='row'>
			{pagedLibrary.content.map((library) => {
				return (
					<div className='col-12 col-md-6'>
						<LibraryCard library={library} />
					</div>
				)
			})}
		</div>
	)
}

export default RegionLibraryListCard