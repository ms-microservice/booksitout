import { ButtonGroup, ToggleButton } from "react-bootstrap"
import { useParams } from "react-router-dom"
import AddPostForm from "./post/AddPostForm"

const AddCommunityRoute = () => {
    const {type} = useParams()

    return (
		<div className='container-xl mb-5'>
			<ButtonGroup className='w-100'>
				<a href='/community/post/add' className='w-100'>
					<ToggleButton className='w-100' value={'SEARCH'} type='radio' checked={false} variant={type === 'post' ? 'book' : 'light'}>
						게시글 추가
					</ToggleButton>
				</a>

				<a href='/community/gathering/add' className='w-100'>
					<ToggleButton className='w-100' value={'MANUAL'} type='radio' checked={false} variant={type === 'gathering' ? 'book' : 'light'}>
						독서모임 추가
					</ToggleButton>
				</a>
			</ButtonGroup>

			<ButtonGroup className='w-100 mt-2'>
				<a href='/community/survey/add' className='w-100'>
					<ToggleButton className='w-100' value={'MANUAL'} type='radio' checked={false} variant={type === 'survey' ? 'book' : 'light'}>
						설문 추가
					</ToggleButton>
				</a>

				<a href='/community/quiz/add' className='w-100'>
					<ToggleButton className='w-100' value={'MANUAL'} type='radio' checked={false} variant={type === 'quiz' ? 'book' : 'light'}>
						퀴즈 추가
					</ToggleButton>
				</a>
			</ButtonGroup>

			<div className='mt-4'>{type === 'post' ? <AddPostForm /> : <></>}</div>
		</div>
	)
}

export default AddCommunityRoute