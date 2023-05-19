export interface Book {
    isbn: number;

    title: string;
    author: string;
    cover: string;
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