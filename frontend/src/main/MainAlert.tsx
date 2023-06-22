import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getAlertMessage } from '../functions/alert'
import parse from 'html-react-parser'

const MainAlert = () => {
    	const isLogin = useSelector((state: RootState) => state.user.isLogin)

  return (
		<div className="container">
			<Alert variant="success" className="mb-0 mt-2">
				{isLogin
					? getAlertMessage()
					: parse(
							'책잇아웃 : 책을 <b>기록</b>하고, 원하는 책을 <b>도서관</b> / <b>중고책</b> / <b>구독</b> 등 한 번에 <b>검색</b> / <b>알림</b>. 책 관련 <b>커뮤니티</b>까지.',
					  )}
			</Alert>
		</div>
  )
}

export default MainAlert