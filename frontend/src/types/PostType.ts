export interface PostType {
    postId: number;
    title: string;
    content: string;

    likeCount: number;
    dislikeCount: number;
    userLikeScore: number;

    commentCount: number;
    createdDate: string;
    lastModifiedDate: string;
    
    user: UserType;
    book?: BookType;
}

export interface CommentType {
    commentId: number;
    content: string;

    likeCount: number;
    dislikeCount: number;
    userLikeScore: number;

    createdDate?: string;
    lastModifiedDate?: string;

    User: UserType;
}

export interface UserType {
    appUserId: number;
    email: string;
    name: string;
    profileImage?: string;
}

export interface BookType {
    title: string;
    author: string;
    cover?: string;
    isbn: number;
}

export interface RecentBookType {
    title: string;
    author: string;
    cover: string;
    isbn?: number;
}

export interface PopularBookType {
	id: number;
	title: string;
    author: string;
    isbn: number;
    cover: string;
}

export {}