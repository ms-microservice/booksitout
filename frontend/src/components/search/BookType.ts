interface MyBook {
	bookId: number
	title: string
	author: string
	cover: string
	currentPage: number
	endPage: number
	isGiveUp: boolean
}
interface UsedBook {
	provider: string

	title: string
	author: string
	cover: string
	link: string

	stockCount: number
	minPrice: number
}
interface LibraryBook {
	book: {
		title: string
		author: string
		cover: string
	}
	libraryList: [
		{
			code: string
			name: string
			address: string
			libraryLink: string
			bookLink: string
		}
	]
}

export type { MyBook, UsedBook, LibraryBook }
