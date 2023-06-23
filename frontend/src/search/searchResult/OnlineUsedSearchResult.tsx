import React from 'react'
import BookSearchResult from '../BookSearchResult'
import UsedOnlineLabel from '../label/UsedOnlineLabel'
import UsedBookComponent from '../cardComponent/UsedBookCardComponent'
import search from '../../functions/search'
import UsedSearchPlaceholder from '../placeholder/UsedSearchPlaceholder'
import BookSearchResultLoading from '../BookSearchResultLoading'

const OnlineUsedSearchResult = ({ onlineUsedList }) => {
	if (onlineUsedList === undefined) {
		return (
			<BookSearchResultLoading
				label="중고온라인"
				labelComponent={<UsedOnlineLabel />}
				CardComponent={UsedSearchPlaceholder}
			/>
		)
	}

	return (
		<BookSearchResult
			label="중고온라인"
			labelComponent={<UsedOnlineLabel />}
			bookList={onlineUsedList}
			CardComponent={UsedBookComponent}
			isConfigured={search.local.settings.usedOnline.isConfigured()}
		/>
	)
}

export default OnlineUsedSearchResult