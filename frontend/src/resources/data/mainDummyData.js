import koreaIcon from '../images/language/korea.png'
import novelIcon from '../images/category/novel.png'
import ebookIcon from '../images/medium/ebook.png'

const dummy = {
	lastBook: {
		title: '위대한 게츠비',
		author: {
			name: 'F. 스콧 피츠제럴드',
		},
		cover: 'http://minumsa.minumsa.com/wp-content/uploads/bookcover/075_위대한개츠비-300x511.jpg',
		startDate: '',
		currentPage: 100,
		endPage: 400,
		language: {
			name: '한국어',
			image: koreaIcon,
		},
		category: {
			name: '소설',
			image: novelIcon,
		},
		medium: {
			name: '이북',
			image: ebookIcon,
		},
	},
	statistics: {
		year: 2022,
		yearly: {
			totalReadTime: 201,
			totalReadBookCount: 66,
			averageStar: 3.4,
			totalReadPage: 5043,
		},
		daily: {
			averageReadTime: 72,
			mostReadTime: 450,
		},
		goal: 50,
	},
	goal: {
		current: 12,
		goal: 50,
	},
}

export { dummy }
