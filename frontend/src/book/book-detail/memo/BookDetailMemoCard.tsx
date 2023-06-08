import React from 'react'
import AddButton from '../../../components/common/AddButton'
import { Card } from 'react-bootstrap'
import NoContent from '../../../components/common/NoContent'
import AllButton from '../../../components/common/AllButton'
import uiSettings from '../../../settings/ui'
import MemoAllModal from './MemoAllModal'

const BookDetailMemoCard = ({ memo, setMemoDetailModalOpen, setAddMemoModalOpen, setSelectedMemo, bookId }) => {
    const [show, setShow] = React.useState<boolean>(false)

	return (
		<Card className='mt-3 pb-3'>
			<AddButton size='30' color='book' onClick={() => setAddMemoModalOpen(true)} />
			<MemoAllModal show={show} setShow={setShow} bookId={bookId} />

			<Card.Body>
				<h4>📋 메모</h4>

				<div className='row justify-content-center mt-4'>
					<div className='col-12'>
						{memo == null || memo.length === 0 ? (
							<div className='mb-4'>
								<NoContent message='메모가 없어요' move={0} />
							</div>
						) : (
							<div className='row row-eq-height'>
								{memo.slice(0, 4).map((memo) => {
									return (
										<div className='col-12 col-md-6 mb-2 clickable'>
											<Card
												style={{ backgroundColor: uiSettings.color.memo }}
												onClick={() => {
													setMemoDetailModalOpen(true)
													setSelectedMemo(memo)
												}}>
												<Card.Header>
													<h6 className='mt-1'>{memo.page}P</h6>
												</Card.Header>

												<Card.Body>
													<div className='row'>
														<div className='text-center clamp-2-line'>{memo.content}</div>
													</div>
												</Card.Body>
											</Card>
										</div>
									)
								})}
							</div>
						)}
					</div>
				</div>

				{memo.length > 4 && <AllButton url='' onClick={() => setShow(true)} />}
			</Card.Body>
		</Card>
	)
}

export default BookDetailMemoCard