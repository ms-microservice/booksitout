import Preparing from '../common/Preparing'
import BookInfoCard from './BookInfoCard'

const BookInfoCoverCard = () => {
	return <BookInfoCard title={'책 표지 모아 보기'} content={<Preparing message='책 표지 모아 보기 기능은 아직 개발중이에요' mt='150px' />} />
}

export default BookInfoCoverCard
