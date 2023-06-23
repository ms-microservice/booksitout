export const MyBookSearchRange = {
    getApiKey: () => {
        return localStorage.getItem('search-my-book-range') ?? 'ALL'
    },

    getDisplayName: () => {
        const apiKey = MyBookSearchRange.getApiKey()

			if (apiKey === 'ONLY_READING') {
                return '읽고 있는 책만'
            }

			if (apiKey === 'ONLY_DONE') {
				return '다 읽은 책만'
			}

			if (apiKey === 'EXCLUDE_GIVE_UP') {
                return '포기한 책만 빼고'
            }

            return '전체'
    }
    
}