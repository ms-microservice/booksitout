export interface ReadingSessionType {
    readingSessionId; number;
    startPage: number;
    endPage?: number;
    startTime: string;
    endTime?: string;
}