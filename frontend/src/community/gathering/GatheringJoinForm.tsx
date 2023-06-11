import React from 'react'
import { booksitoutServer } from '../../functions/axios'
import { Button, Card, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { GatheringDetailType } from './GatheringType'
import GatheringSimpleCard from '../../community/summaryCard/GatheringSimpleCard'

export async function loader({ params }) {
	const id = params.id

	return booksitoutServer
		.get(`/v4/forum/gathering/${id}`)
		.then((res) => res.data)
		.catch((e) => {
			throw e
		})
}

const GatheringJoinForm = () => {
	const naviage = useNavigate()
	const gathering = useLoaderData() as GatheringDetailType

	const {id} = useParams()
	const [content, setContent] = React.useState('')
	
	const handleSubmit = (e) => {
		e.preventDefault()

		if (content === '') {
			toast.error('가입신청 이유를 적어 주세요')
			document.getElementById('content-input')!!.focus()
			return
		}

		const gatheringJoinRequest = { content: content }

		booksitoutServer
			.post(`/v4/forum/gathering/${id}/join-request`, gatheringJoinRequest)
			.then(() => {
				toast.success('독서모임 가입을 신청했어요')
				naviage(`/community/gathering/detail/${id}`)
			})
			.catch(() => toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요'))
	}

    return (
		<div className='container-xl'>
			<Card style={{ minHeight: '200px' }} className='mb-4'>
				<Card.Body>
					<h3 className='mb-4'>가입하려는 독서모임</h3>

					<GatheringSimpleCard gathering={gathering} />
				</Card.Body>
			</Card>

			<Card className='mb-4'>
				<Card.Body>
					<h3 className='mb-3'>독서모임 가입하기</h3>

					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Control
								id='content-input'
								as='textarea'
								placeholder='이곳에 가입신청 이유를 적어 주세요'
								rows={6}
								onChange={(e) => setContent(e.target.value)}
							/>
						</Form.Group>

						<div className='row justify-content-center mt-5'>
							<div className='col-12 col-md-7'>
								<Button type='submit' variant='book' className='w-100'>
									신청하기
								</Button>
							</div>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

export default GatheringJoinForm