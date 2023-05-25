const goalMessage = {
	noContent: '목표가 설정되지 않았어요',

	add: {
		placeholder: '이번년도에 몇 권 읽고 싶은지 알려주세요',
		
		success: {
			past: (year) => `${year}년 목표를 추가했어요`
		},

		fail: {
			null: '목표를 입력해 주세요',
			notNumber: '목표는 숫자만 입력할 수 있어요',
			tooSmall: '2권 이상의 목표를 입력해 주세요',
			alreadyPresent: '해당 년도의 목표를 이미 설정했어요'
		},
	},

	delete: {
		confirm: '목표를 삭제할까요?',
	},

	error: '오류가 났어요. 잠시 후 다시 시도해 주세요',
}

export default goalMessage