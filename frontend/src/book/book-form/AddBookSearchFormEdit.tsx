import React from 'react'
import { Form } from 'react-bootstrap'

const AddBookSearchFormEdit = () => {
    return (
		<Form>
			<div className='row'>
				<div className='col-12'>
					<Form.Group className='mb-3'>
						<Form.Label>책은 어디서 얻었나요?</Form.Label>
						{/* onChange={(e) => setSource(e.target.value)} */}
						<Form.Select>
							<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

							<option value='BUY_NEW_OFFLINE'>새 책 - 온라인 서점</option>
							<option value='BUY_NEW_ONLINE'>새 책 - 오프라인 서점</option>

							<option value='BUY_USED_OFFLINE'>중고책 - 오프라인 서점</option>
							<option value='BUY_USED_ONLINE'>중고책 - 온라인 서점</option>

							<option value='LIBRARY'>도서관</option>
							<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
							<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

							<option value='SUBSCRIPTION'>구독</option>

							<option value='OTHERS'>기타</option>
						</Form.Select>
					</Form.Group>
				</div>
			</div>
		</Form>
	)
}

export default AddBookSearchFormEdit