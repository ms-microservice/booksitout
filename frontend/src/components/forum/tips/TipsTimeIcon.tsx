import { BiTime as TimeIcon } from 'react-icons/bi'

const TipsTimeIcon = ({time, size='h5'}) => {
    return (
		<div className='d-flex text-book align-items-center justify-content-end'>
			<TimeIcon className={`me-1 ${size}`} />
			<div className={`${size}`}>약 {time}분</div>
		</div>
	)
}

export default TipsTimeIcon