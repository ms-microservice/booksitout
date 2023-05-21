import { Button, Modal } from "react-bootstrap"

const LibrarySearchSettingsDetailModal = ({ show, setShow, library, handleAddLibrary }) => {
	const onHide = () => {
		setShow(false)
	}

	if (library == null) return <></>

	return (
		<Modal show={show} onHide={onHide} fullscreen='md-down' size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>도서관 자세히 보기</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<h2 className='text-center'> {library.name}</h2>
				<h5 className='text-secondary text-center'>{library.address}</h5>

				<div className='row justify-content-center mt-4 mb-4'>
					<div className='col-6'>
						{library.link === '' || library.link === null ? (
							<Button variant='dark' className='w-100' disabled>
								홈페이지
							</Button>
						) : (
							<a href={library.link} target='_blank' rel='noreferrer' className='text-white text-decoration-none'>
								<Button variant='book' className='w-100'>
									홈페이지
								</Button>
							</a>
						)}
					</div>
				</div>

				<hr />

				<div className='row'>
					<div className='col-6'>
						<Button variant='book-danger' className='w-100' onClick={onHide}>
							취소
						</Button>
					</div>

					<div className='col-6'>
						<Button variant='book' className='w-100' onClick={() => handleAddLibrary()}>
							이 도서관 추가하기
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default LibrarySearchSettingsDetailModal