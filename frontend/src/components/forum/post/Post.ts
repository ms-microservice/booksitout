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

export interface User {
    appUserId: number;
    email: string;
    name: string;
    profileImage?: string;
}

export interface Book {
    title: string;
    author: string;
    isbn: number;
}

export {}