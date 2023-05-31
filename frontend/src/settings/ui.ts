const uiSettings = {
	initalFetchTime: 500,
	toastLimit: 1,

	color: {
		memo: `rgb(255, 255, 255)`,
		theme: `rgb(123, 185, 114)`,
	},

	responsive: {
		topnav: {
			collapse: 'md',
		},
	},

	topnav: {
		collapse: 'md',
		link: [
			{
				id: 1,
				url: '/book/not-done',
				activeUrl: '/book',
				title: '내 책',
			},
			{
				id: 2,
				url: '/statistics',
				activeUrl: '/statistics',
				title: '독서통계',
			},
			{
				id: 3,
				url: '/community',
				activeUrl: '/community',
				title: '커뮤니티',
			},
			{
				id: 4,
				url: '/library',
				activeUrl: '/library',
				title: '도서관',
			},
		],
	},
}
export default uiSettings
