const messages = {
	error: `오류가 났어요. 잠시 후 다시 시도해 주세요`,

	user: {
		join: {
			placeHolder: {
			email: `ID로 사용하실 이메일을 입력해 주세요`,
			emailVerification: `이메일로 온 인증번호를 입력해 주세요`,
			password: `비밀번호를 입력해 주세요`,
			name: `이름을 알려주세요`,
		},
			error: {
				id: {
					null: `아이디로 사용하실 이메일을 입력해 주세요`,
				},
				email: {
					null: '이메일을 입력해 주세요',
					invalid: `올바른 이메일 형식이 아니에요`,
					notVerified: `이메일 인증을 진행해 주세요`,
					codeNotMatch: `이메일 인증번호가 일치하지 않아요. 다시 확인해 주세요`,
				},
				name: {
					null: `이름을 입력해 주세요`,
				},
					pw: {
					null: `비밀번호를 입력해 주세요`,
					short: `6자리 이상의 비밀번호를 입력해 주세요`,
				},
			},
			loading: `가입하고 있어요`,
			verfiyEmail: {
				fail: {
					alreadyRegistered: `이미 가입된 이메일이에요`,
				},
				success: {
					sent: `인증번호를 보냈어요. 메일을 확인해 주세요`,
					alreadySent: `가입중인 이메일이에요. 메일함에 있는 인증번호를 입력해 주세요`,
				},
			},
		},

		login: {
			placeHolder: {
				email: `이메일을 입력해 주세요`,
				password: `비밀번호를 입력해 주세요`,
			},
			label: {
				introduction: `책잇아웃이 뭐 하는 곳인가요? 🧐`,
				faq: {
					title: `FAQ`,
					content: `자주 하시는 질문`,
				},
				qna: {
					title: `QNA`,
					content: `직접 질문`,
				},
				faqQna: `책잇아웃에 관한 질문 한 스푼 🥄`,
			},
			oauth: {
				loading: new Map([
					['KAKAO', '카카오로 로그인하고 있어요'],
					['NAVER', '네이버로 로그인하고 있어요'],
					['GOOGLE', '구글로 로그인하고 있어요'],
					['FACEBOOK', '페이스북으로 로그인하고 있어요'],
				]),
			},
		},

		logout: {
			success: '로그아웃했어요',
			fail: {
				readingInProgress: `독서활동이 진행중이에요. 지금 로그아웃하면 독서활동이 사라져요. 독서활동을 먼저 끝내 주세요`,
			},
		},
	},

	goal: {
		noContent: '목표가 설정되지 않았어요',

		add: {
			placeholder: '이번년도에 몇 권 읽고 싶은지 알려주세요',
			fail: {
				null: '목표를 입력해 주세요',
				notNumber: '목표는 숫자만 입력할 수 있어요',
				tooSmall: '2권 이상의 목표를 입력해 주세요',
			},
		},

		delete: {
			confirm: '목표를 삭제할까요?',
		},
	},

	book: {
		placeholder: {
			add: {
				title: '책 제목을 알려 주세요',
				author: '책의 저자를 알려 주세요',
				page: '마지막 페이지',
			},
		},

		lastBook: {
			noContent: '마지막으로 읽은 책이 없어요',
		},
	},

	quotation: {
		noContent: '인용이 없어요',
		placeholder: {
			content: '인용을 입력해 주세요',
			fromWho: '누가 말했나요?',
		},

		add: {
			fail: {
				contentNull: '내용을 입력해 주세요',
			},
		},
	},

	memo: {
		noContent: '메모가 없어요',
		placeholder: {
			content: '메모를 입력해 주세요',
		},
	},

	reading: {
		add: {
			success: '독서활동을 기록했어요',
		},
		delete: {
			success: {
				notSaving: '독서활동을 저장하지 않고 끝냈어요',
			},
		},
	},
}

export default messages
