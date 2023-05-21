export interface PageType<T> {
    first: boolean;
    last: boolean;

    totalElements: number;
    totalPages: number;

    content: T;
}