export interface BookType {
    isbn: string;

    title: string;
    author: string;
    cover?: string;

	description?: string;
	
	publicationYear?: number;
	page?: number;
	language: string;

	link: BookLinkType;

	category: string;
}

export interface BookLinkType {
	naver?: string;
	aladin?: string;
	yes24?: string;
	kyobo?: string;
}

export interface BookAddSearchResult extends BookType {
	from: string;
}

export interface BookUserType extends BookType {
	summary?: string;
	review?: string;
	currentPage: number;
	endPage: number;
}

export interface BookCategory {

}

export interface SharingBook extends BookType {
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
