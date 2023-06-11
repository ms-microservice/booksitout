import React from 'react'
import BookSearchResult from '../BookSearchResult'
import UsedOfflineLabel from '../label/UsedOfflineLabel'
import search from '../../functions/search'
import UsedBookComponent from '../cardComponent/UsedBookCardComponent'
import UsedSearchPlaceholder from '../placeholder/UsedSearchPlaceholder'

const OfflineUsedSearchResult = ({ offlineUsedList }) => {

	if (offlineUsedList === undefined) {
		return (
			<BookSearchResult
				label='중고 매장'
				labelComponent={<UsedOfflineLabel />}
				bookList={[1, 2]}
				CardComponent={UsedSearchPlaceholder}
				isConfigured={search.local.settings.usedOffline.isConfigured()}
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