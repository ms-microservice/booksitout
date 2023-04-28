const uiSettings = {
	initalFetchTime: 500,
	toastLimit: 1,

	color: {
		memo: `rgb(242, 227, 142)`,
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
				activeUrl: '/book/not-done',
				title: '읽고 있는 책',
			},
			{
				id: 2,
				url: '/book/done',
				activeUrl: '/book/done',
				title: '다 읽은 책',
			},
			{
				id: 3,
				url: '/book/give-up',
				activeUrl: '/book/give-up',
				title: '포기한 책',
			},
			{
				id: 4,
				url: '/statistics',
				activeUrl: '/statistics',
				title: '독서통계',
			},
		],
	},
}
export default uiSettings
