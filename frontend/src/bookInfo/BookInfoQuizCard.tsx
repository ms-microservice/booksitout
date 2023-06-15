import BookInfoCard from './BookInfoCard'
import Preparing from '../common/Preparing'
import booksitoutIcon from '../common/icons/booksitoutIcon';

const BookInfoQuizCard = () => {
return (
	<BookInfoCard title='관련 퀴즈' content={<Preparing message='관련 퀴즈 기능은 아직 개발중이에요' mt='150px' />} icon={<booksitoutIcon.quiz />} />
)
}

export default BookInfoQuizCard