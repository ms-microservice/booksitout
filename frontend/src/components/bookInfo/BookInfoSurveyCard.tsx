import BookInfoCard from "./BookInfoCard"
import Preparing from "../common/Preparing"

const BookInfoSurveyCard = () => {
    return <BookInfoCard title='관련 설문' content={<Preparing message='관련 설문 기능은 아직 개발중이에요' mt='mt-2' />} />
}

export default BookInfoSurveyCard