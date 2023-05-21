import axios from "axios"
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import toast from "react-hot-toast"
import urls from "../../../settings/urls"
import utils from "../../../functions/utils"

const EditCommentModal = ({show, setShow, comment, commentList, setCommentList}) => {

    const [content, setContent] = useState('')
    const handleEditComment = (e) => {
		e.preventDefault()

		if (content === '') {
            toast.error('내용을 입력해 주세요')
            document.getElementById('content-input')!!.focus()
			return
		}

		if (content === comment.content) {
            toast.error('수정할 내용이 없어요')
            return
		}

		const commentEditRequest = {
			content: content,
		}

		axios
			.put(`${urls.api.base}/v4/forum/comment/${comment.commentId}`, commentEditRequest, { headers: { Authorization: utils.getToken() } })
			.then((res) => {
				if (res.status.toString().startsWith('2')) {
					setCommentList(commentList.map((c) => (c.commentId === comment.commentId ? { ...c, content: content } : c)))
					toast.success('댓글을 수정했어요')
                    setShow(false)
				}
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

    return (
		<Modal show={show} onHide={() => setShow(false)} centered size='lg' fullscreen='md-down' backdrop>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>댓글 수정</h4>
			</Modal.Header>

			{comment != null && (
				<Modal.Body>
					<Form onSubmit={(e) => handleEditComment(e)}>
						<Form.Control
							id='content-input'
							as='textarea'
							rows={5}
							defaultValue={comment.content}
							autoFocus
							onChange={(e) => setContent(e.target.value)}
						/>

						<div className='row justify-content-center mt-3'>
							<div className='col-12 col-md-6 mt-2'>
								<Button variant='book-danger' className='w-100' onClick={() => setShow(false)}>
									취소
								</Button>
							</div>

							<div className='col-12 col-md-6 mt-2'>
								<Button variant='book' type='submit' className='w-100'>
									수정하기
								</Button>
							</div>
						</div>
					</Form>
				</Modal.Body>
			)}
		</Modal>
	)
}

export default EditCommentModal