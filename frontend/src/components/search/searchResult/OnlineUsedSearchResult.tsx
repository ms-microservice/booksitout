import React from 'react'
import BookSearchResult from '../BookSearchResult'
import UsedOnlineLabel from '../label/UsedOnlineLabel'
import UsedBookComponent from '../cardComponent/UsedBookCardComponent'
import search from '../../../functions/search'
import UsedSearchPlaceholder from '../placeholder/UsedSearchPlaceholder'

const OnlineUsedSearchResult = ({onlineUsedList}) => {
	if (onlineUsedList === undefined) {
		return (
			<BookSearchResult
				label='중고온라인'
				labelComponent={<UsedOnlineLabel />}
				bookList={[1, 2]}
				CardComponent={UsedSearchPlaceholder}
				isConfigured={search.local.settings.usedOnline.isConfigured()}
			/>
		)
	}

    return (
		<BookSearchResult
			label='중고온라인'
			labelComponent={<UsedOnlineLabel />}
			bookList={onlineUsedList}
			CardComponent={UsedBookComponent}
			isConfigured={search.local.settings.usedOnline.isConfigured()}
		/>
	)
}

export default OnlineUsedSearchResult