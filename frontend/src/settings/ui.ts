const uiSettings = {
	initalFetchTime: 500,
	toastLimit: 1,

	color: {
		// memo: `rgb(242, 227, 142)`,
		memo: `rgb(0, 0, 0)`,
		theme: `rgb(123, 185, 114)`,
	},

	responsive: {
		topnav: {
			collapse: 'md',
		},
	},

	topnav: {
		collapse: 'lg',
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
				url: '/forum',
				activeUrl: '/forum',
				title: '책이야기',
			},
		],
	},
}
export default uiSettings
