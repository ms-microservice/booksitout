const userMessage = {
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
			introduction: `책-it-out이 뭐 하는 곳인지 궁금하신가요? 🧐`,
			faq: {
				title: `FAQ`,
				content: `자주 하시는 질문을 모아 봤어요`,
			},
			qna: {
				title: `QNA`,
				content: `직접 질문하실 수 있어요`,
			},
			faqQna: `책-it-out에 관한 질문 한 스푼 🥄`,
		},
	},
}

export default userMessage
