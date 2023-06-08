import React from 'react'
import { Card } from 'react-bootstrap'
import { ImLibrary as LibraryIcon } from 'react-icons/im'
import CardTitle from '../../common/CardTitle'
import AllButton from '../../components/common/AllButton'
import NoContent from '../../components/common/NoContent'
import MembershipDetailLibraryCard from './MembershipDetailLibraryCard'
import MembershipDetailLibraryModal from './MembershipDetailLibraryModal'

const MembershipDetailLibrary = ({ libraryList }) => {
	const [modalOpen, setModalOpen] = React.useState<boolean>(false)
	const openModal = () => {
		setModalOpen(true)
	}

	return (
		<Card style={{ minHeight: '450px' }}>
			<MembershipDetailLibraryModal modalOpen={modalOpen} setModalOpen={setModalOpen} libraryList={libraryList} />

			<Card.Body>
				<CardTitle icon={<LibraryIcon />} title={`사용할 수 있는 도서관 (${libraryList.length}곳)`} subTitle={undefined} textSize={2} />

				{libraryList.length === 0 ? (
					<NoContent move={-75} message='아직 추가중이에요' />
				) : (
					<div className='row'>
						{libraryList.slice(0, 6).map((library) => {
							return (
								<div className='col-12 col-sm-6 col-md-4 col-xl-3'>
									<MembershipDetailLibraryCard library={library} />
								</div>
							)
						})}
					</div>
				)}

				{libraryList.length > 6 && <AllButton url='' onClick={openModal} />}
			</Card.Body>
		</Card>
	)
}

export default MembershipDetailLibrary