import React from 'react'
import { Button, Card, Form, FormGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Error from '../../components/common/Error';
import { booksitoutServer } from '../../functions/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddGatheringForm = () => {
    const navigate = useNavigate()
    const isLogin = useSelector((state: RootState) => state.user.isLogin)

    const [title, setTitle] = React.useState<string>('')
    const [content, setContent] = React.useState<string>('')
    const [gatheringType, setGatheringType] = React.useState<string>('FREE')
    const [capacity, setCapacity] = React.useState<number | null>(null)
    const [locationType, setLocationType] = React.useState<string>('SUBWAY')
    const [locationDetail, setLocationDetail] = React.useState<string>('')

    const handleAddGathering = (e) => {
        e.preventDefault()

        if (title === '') {
			toast.error('제목을 입력해주세요')
			document.getElementById('title-input')!!.focus()
			return
		}

		if (content === '') {
			toast.error('내용을 입력해주세요')
			document.getElementById('content-input')!!.focus()
			return
		}

        if (content.length < 10) {
            toast.error('10글자 이상의 내용을 입력해 주세요')
            document.getElementById('content-input')!!.focus()
            return
        }

        if (capacity === null) {
			toast.error('모임 인원을 입력해주세요')
			document.getElementById('capacity-input')!!.focus()
			return
		}

        if (locationDetail === '') {
            toast.error('위치를 입력해주세요')
            document.getElementById('location-detail-input')!!.focus()
            return
        }

        const gathering = {
			title: title,
			content: content.replaceAll('\n', '<br>'),
			type: gatheringType,
			locationType: locationType,
			location: locationDetail,
			capacity: capacity,
		}

        booksitoutServer
			.post('/v4/forum/gathering', gathering)
			.then((res) => {
				toast.success('독서모임을 추가했어요')
				navigate(`/community/gathering/detail/${res.data.id}`)
			})
			.catch(() => toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요'))
    }

    if (!isLogin) return <Error message='독서모임을 추가하기 위해서 로그인 해 주세요' />

    return (
		<Card style={{ minHeight: '500px' }}>
			<Card.Body>
				<Form onSubmit={handleAddGathering}>
					<FormGroup className='mt-3'>
						<Form.Label>제목</Form.Label>
						<Form.Control id='title-input' onChange={(e) => setTitle(e.target.value)} />
					</FormGroup>

					<FormGroup className='mt-3'>
						<Form.Label>내용</Form.Label>
						<Form.Control as='textarea' id='content-input' onChange={(e) => setContent(e.target.value)} rows={12} />
					</FormGroup>

					<FormGroup>
						<div className='row'>
							<div className='col-12 col-md-6 mt-3'>
								<Form.Label>독서모임 종류</Form.Label>
								<Form.Select onChange={(e) => setGatheringType(e.target.value)}>
									<option value='FREE'>자유롭게</option>
									<option value='CHECKING'>서로 확인만</option>
									<option value='TALKING'>가볍게 얘기만</option>
									<option value='DISCUSSION'>진지하게 토론</option>
									<option value='BOOK_REPORT'>독후감 포함</option>
								</Form.Select>
							</div>

							<div className='col-12 col-md-6 mt-3'>
								<Form.Label>인원제한 (본인 포함)</Form.Label>
								<Form.Control
									type='number'
									inputMode='numeric'
									pattern='[0-9]*'
									id='capacity-input'
									onChange={(e) => setCapacity(Number(e.target.value))}
									placeholder='2명 ~ 10명'
								/>
							</div>
						</div>
					</FormGroup>

					<FormGroup>
						<div className='row'>
							<div className='col-12 col-md-6 mt-3'>
								<Form.Label>위치 종류</Form.Label>
								<Form.Select onChange={(e) => setLocationType(e.target.value)}>
									<option value='SUBWAY'>지하철역</option>
									<option value='ONLINE'>온라인</option>
									<option value='OTHERS'>기타</option>
								</Form.Select>
							</div>

							<div className='col-12 col-md-6 mt-3'>
								<Form.Label>위치 상세</Form.Label>
								<Form.Control id='location-detail-input' onChange={(e) => setLocationDetail(e.target.value)} />
							</div>
						</div>
					</FormGroup>

					<div className='row justify-content-center mt-5'>
						<div className='col-12 col-md-7'>
							<Button type='submit' variant='book' className='w-100'>
								독서모임 모집 추가하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default AddGatheringForm