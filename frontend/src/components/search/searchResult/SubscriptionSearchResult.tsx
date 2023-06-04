import React from 'react'
import search from '../../../functions/search'
import { SubscriptionBook } from '../../../types/BookType'
import BookSearchResult from '../BookSearchResult'
import SubscriptionLabel from '../label/SubscriptionLabel'
import SubscriptionComponent from '../cardComponent/SubscriptionCardComponent'
import SubscriptionSearchLoading from '../placeholder/SubscriptionSearchLoading'
import SearchResultInitialFetch from '../placeholder/SearchResultInitialFetch'

const SubscriptionSearchResult = ({query}) => {
	const [loading, setLoading] = React.useState<boolean>(true)
	const [initialFetch, setInitialFetch] = React.useState<boolean>(true)

	const [subscriptionList, setSubscriptionBookList] = React.useState<SubscriptionBook[]>([])
    React.useEffect(() => {
		// setInitialFetch(true)
		setLoading(true)

		setTimeout(() => {
			setInitialFetch(false)
		}, 300)

        search.local.settings.subscription.isConfigured() &&
			search.api.search.subscription(query || '', search.local.settings.subscription.api()).then((result) => setSubscriptionBookList(result))
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})
    }, [query])

	if (initialFetch) {
		return (
			<BookSearchResult
				label='구독'
				labelComponent={<SubscriptionLabel />}
				bookList={[1, 2]}
				CardComponent={SearchResultInitialFetch}
				isConfigured={true}
			/>
		)
	}

	if (loading) {
		return (
			<BookSearchResult
				label='구독'
				labelComponent={<SubscriptionLabel />}
				bookList={[1, 2]}
				CardComponent={SubscriptionSearchLoading}
				isConfigured={true}
			/>
		)
	}

    return (
		<BookSearchResult
			label='구독'
			labelComponent={<SubscriptionLabel />}
			bookList={subscriptionList}
			CardComponent={SubscriptionComponent}
			isConfigured={search.local.settings.subscription.isConfigured()}
		/>
	)
}

export default SubscriptionSearchResult