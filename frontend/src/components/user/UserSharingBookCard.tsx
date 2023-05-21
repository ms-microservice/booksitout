import UserRouteCard from './UserRouteCard'
import SharingBookCard from './SharingBookCard'
import AllButton from '../common/AllButton'
import NoContent from '../common/NoContent'

const UserSharingBook = ({ bookList, nickName }) => {
	return (
		<UserRouteCard
			title={'공개한 책'}
			content={
				<div className='row'>
					{bookList.length === 0 ?
                        <NoContent mt='125px' message='공개된 책이 없어요' />
                    :
                    bookList.map((book) => {
						return (
							<div className='col-12 col-md-6 mb-3'>
								<SharingBookCard book={book} />
							</div>
						)
					})}

					{bookList.length > 6 && <AllButton url={`/user/${nickName}/books`} />}
				</div>
			}
		/>
	)
}

export default UserSharingBook