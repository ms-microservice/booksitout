import React from 'react'
import HorizontalBookViewDoneLoading from './HorizontalBookViewDoneLoading'
import HorizontalBookViewLoading from './HorizontalBookViewLoading'

const BookListLoading = ({range}) => {
    return (
		<div className="row">
			{Array.from({ length: 12 }).map(() => {
				return (
					<div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
						{range === 'done' ? <HorizontalBookViewDoneLoading /> : <HorizontalBookViewLoading />}
					</div>
				)
			})}
		</div>
	)
}

export default BookListLoading