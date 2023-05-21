import defaultBookCover from '../../resources/images/common/default-book-cover.png'

const placeholderData = {
	lastBook: {
		isbn: 12345678910,
		title: '책잇아웃의 역사',
		author: '책잇아웃',
		cover: defaultBookCover,
		currentPage: 77,
		endPage: 777,
		source: 'LIBRARY',
		form: 'PHYSICAL',
		language: 'KOREAN',
		category: 'NOT_PROVIDED',
	},
	readTime: [31, 41, 59, 1, 65, 35, 89],
	statistics: {
		year: 2023,
		yearStatistics: { totalReadTime: 5839, totalReadBookCount: 9, averageStar: 4.23, totalReadPage: 3590 },
		dayStatistics: { averageReadTime: 0, mostReadTime: 76 },
	},
	goal: { year: 2023, goal: 50, current: 9 },
}

export default placeholderData
