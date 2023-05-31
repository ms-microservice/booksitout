import { Card } from "react-bootstrap"

import { AiFillMinusCircle as RemoveIcon } from 'react-icons/ai'

import NoContent from "../../common/NoContent"

const AddedLibraryCard = ({addedLibrary, removeLibrary}) => {
    return (
		<Card className='mb-3'>
			<Card.Body>
				<h4 className='mt mb-3'>추가된 도서관</h4>

				<div style={{ height: '280px', overflowX: 'hidden', overflowY: 'scroll' }}>
					{addedLibrary.length === 0 ? (
						<div className='mt-4'>
							<NoContent message='추가된 도서관이 없어요' />
						</div>
					) : (
						<div className='row row-eq-height'>
							{addedLibrary.map((library) => {
								return (
									<div className='col-3 mb-3 button-hover' onClick={() => removeLibrary(library)}>
										<Card className='h-100 text-center'>
											<Card.Body className='h-100'>
												<div className='position-absolute' style={{ right: '-10px', top: '-10px' }}>
													<h1 className='text-danger'>
														<RemoveIcon />
													</h1>
												</div>

												<img src={library.icon} alt='' className='img-fluid' style={{ width: '100px' }} />
												<h6 className='mt-2 mb-0'>{library.name}</h6>
											</Card.Body>
										</Card>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	)
}

export default AddedLibraryCard