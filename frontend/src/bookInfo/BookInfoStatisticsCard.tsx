import Preparing from "../common/Preparing"
import BookInfoCard from "./BookInfoCard"

const BookInfoStatisticsCard = () => {
    return <BookInfoCard title='책 관련 통계' content={<Preparing message='통계 기능은 아직 개발중이에요' mt='150px' />} />
}

export default BookInfoStatisticsCard