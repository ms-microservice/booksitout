interface TipPost {
    id: number;
    title: string;
    type: string;
    content: string;
    estimatedReadTime: number;

    createdDate?: string;
    lastModifiedDate?: string;
}

export default TipPost;