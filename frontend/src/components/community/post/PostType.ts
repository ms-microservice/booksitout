export interface Post {
    postId: number;
    title: string;
    content: string;
    postLikeCount: number;
    commentCount: number;
    createdDate: string;
    lastModifiedDate: string;
    
    user: User;
    book?: Book;
}

export interface Comment {
    commentId: number;
    content: string;

    likeCount: number;
    dislikeCount: number;
    userLikeScore: number;

    createdDate?: string;
    lastModifiedDate?: string;

    User: User;
}

export interface User {
    appUserId: number;
    email: string;
    name: string;
    profileImage?: string;
}

export interface Book {
    title: string;
    author: string;
    cover?: string;
    isbn: number;
}

export interface RecentBook {
    title: string;
    author: string;
    cover: string;
    isbn?: number;
}

export interface PopularBook {
	id: number;
	title: string;
    author: string;
    isbn: number;
}

export {}