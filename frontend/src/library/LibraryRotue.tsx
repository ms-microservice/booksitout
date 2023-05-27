import React from 'react'
import { ImLibrary as LibraryIcon} from 'react-icons/im'
import LibraryNearCard from './LibraryNearCard'
import LibrarySearchCard from './LibrarySearchCard'

const LibraryRotue = () => {
    return (
		<div className='container-xl' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<div className='d-flex mb-3'>
				<h1>
					<LibraryIcon className='text-book ms-3 me-3' />
				</h1>
				<h1 className='pt-1'>도서관</h1>
			</div>

			<div className='row row-eq-height'>
				<div className='col-12 col-xl-6 mb-3'>
					<LibraryNearCard />
				</div>

				{/* <div className='col-12 col-xl-6 mb-3'>
					<LibrarySearchCard />
				</div> */}
			</div>
		</div>
	)
}

export default LibraryRotue