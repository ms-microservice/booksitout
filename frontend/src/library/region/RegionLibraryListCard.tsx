import React from 'react'
import LibraryCard from '../LibraryCard'
import NoContent from '../../common/NoContent'
import InfiniteScrollLoading from '../../common/InfiniteScrollLoading'
import InfiniteScroll from 'react-infinite-scroll-component'

const RegionLibraryListCard = ({ pagedLibrary, libraryList, getNext }) => {
	return (
		<div className="row">
			{pagedLibrary.totalElements === 0 ? (
				<NoContent move={0} mt={50} message="이 지역에는 도서관이 없어요" />
			) : (
				<InfiniteScroll
					dataLength={libraryList.length}
					hasMore={!pagedLibrary.last}
					next={getNext}
					loader={<InfiniteScrollLoading />}
					className="overflow-hidden"
				>
					<div className="row">
						{libraryList.map(library => {
							return (
								<div className="col-12 col-md-6">
									<LibraryCard library={library} />
								</div>
							)
						})}
					</div>
				</InfiniteScroll>
			)}
		</div>
	)
}

export default RegionLibraryListCard