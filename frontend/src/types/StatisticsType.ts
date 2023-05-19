export interface StatisticsType {
    year: number;
    yearStatistics: YearStatisticsType;
    dayStatistics: DayStatisticsType;
}

export interface YearStatisticsType {
	totalReadTime: number
	totalReadBookCount: number
	averageStar: number
	totalReadPage: number
}

export interface DayStatisticsType {
    averageReadTime: number;
    mostReadTime: number;
}