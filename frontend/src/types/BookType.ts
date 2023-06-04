export interface Book {
    isbn: number;

    title: string;
    author: string;
    cover: string;
}

export interface BookUserType extends Book {
	summary?: string;
	review?: string;
	currentPage: number;
	endPage: number;
}

export interface BookDetailType extends Book {
    category: BookCategory;
}

export interface BookCategory {

}

export interface SharingBook extends Book {
    currentPage: number;
    endPage: number;
}

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

	locationList: string[]
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

interface SubscriptionBook {
	title: string
	author: string
	cover: string
	link: string
	provider: string
}

interface NewBookSearchResult {
	title: string
	author: string
	cover: string
	isbn: string
	link: string
}

export type { MyBook, UsedBook, LibraryBook, SubscriptionBook, NewBookSearchResult }
