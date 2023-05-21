interface TipsType {
    id: number;
    title: string;
    summary?: string;
    type: string;

    content?: string;
    estimatedReadTime: number;

    createdDate?: string;
    lastModifiedDate?: string;
}

export default TipsType;