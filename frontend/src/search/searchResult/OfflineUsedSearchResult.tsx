import React from 'react'
import BookSearchResult from '../BookSearchResult'
import UsedOfflineLabel from '../label/UsedOfflineLabel'
import search from '../../functions/search'
import UsedBookComponent from '../cardComponent/UsedBookCardComponent'
import UsedSearchPlaceholder from '../placeholder/UsedSearchPlaceholder'
import BookSearchResultLoading from '../BookSearchResultLoading'

const OfflineUsedSearchResult = ({ offlineUsedList }) => {

	if (offlineUsedList === undefined) {
		return (
			<BookSearchResultLoading
				label="중고 매장"
				labelComponent={<UsedOfflineLabel />}
				CardComponent={UsedSearchPlaceholder}
			/>
		)
	}

	return (
		<BookSearchResult
			label='중고 매장'
			labelComponent={<UsedOfflineLabel />}
			bookList={offlineUsedList}
			CardComponent={UsedBookComponent}
			isConfigured={search.local.settings.usedOffline.isConfigured()}
		/>
	)
}

export default OfflineUsedSearchResult