import React from 'react'
import { Modal } from 'react-bootstrap'
import { ImLibrary as LibraryIcon} from 'react-icons/im'
import LibraryCard from '../LibraryCard'

const MembershipDetailLibraryModal = ({ modalOpen, setModalOpen, libraryList }) => {
	return (
		<Modal show={modalOpen} onHide={() => setModalOpen(false)} fullscreen='md-down' size='xl' centered>
			<Modal.Header closeButton>
				<div className='d-flex flex-wrap align-items-center'>
					<h1 className='me-2 text-book h2'>
						<LibraryIcon />
					</h1>

					<div className='h3 m-0'>사용할 수 있는 도서관</div>
				</div>
			</Modal.Header>

			<Modal.Body style={{ minHeight: '500px' }}>
				<div className='row'>
					{libraryList.map((library) => {
						return (
							<div className='col-12 col-sm-6 col-xl-4'>
								<LibraryCard library={library} />
							</div>
						)
					})}
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default MembershipDetailLibraryModal