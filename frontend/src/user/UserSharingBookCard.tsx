import UserRouteCard from './UserRouteCard'
import SharingBookCard from './SharingBookCard'
import AllButton from '../common/AllButton'
import NoContent from '../common/NoContent'
import { BsBookHalf as BookIcon } from 'react-icons/bs'

const UserSharingBook = ({ bookList, nickName }) => {
	return (
		<UserRouteCard
			title={
				<h3>
					<BookIcon className='me-2 text-book' />
					공개한 책
				</h3>
			}
			content={
				<div className='row row-eq-height'>
					{bookList.length === 0 ? (
						<NoContent message='공개된 책이 없어요' />
					) : (
						bookList.slice(0, 6).map((book) => {
							return (
								<div className='col-12 col-md-6 col-xl-4 mb-3'>
									<SharingBookCard book={book} />
								</div>
							)
						})
					)}

					{bookList.length > 6 && <AllButton url={`/user/${nickName}/books`} col='col-12 col-md-6 col-xl-5' />}
				</div>
			}
		/>
	)
}

export default UserSharingBook