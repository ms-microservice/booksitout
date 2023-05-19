import { useEffect, useState } from "react"
import axios from "axios"

import { RecentBook } from "../../../types/PostType"
import utils from "../../../functions/utils"
import urls from "../../../settings/urls"
import { Button, Card, Carousel } from "react-bootstrap"

import {AiFillCheckCircle as CheckIcon} from 'react-icons/ai'

const AddIsbnCard = ({isbn, setIsbn, setShow, recentBookList, setRecentBookList}) => {
	const [splitRecentBookList, setSplitRecentBookList] = useState<RecentBook[][]>([[]])
	useEffect(() => {
		axios
			.get(`${urls.api.base}/v4/book/recent?size=12`, { headers: { Authorization: utils.getToken() } })
			.then((res) => setRecentBookList(res.data))
			.catch((e) => {})
	}, [])

	useEffect(() => {
		setSplitRecentBookList(utils.splitArray(recentBookList, 6))
	}, [recentBookList])

	return (
		<Card style={{ minHeight: '325px' }} className='pb-5 pb-md-0'>
			<Card.Body>
				<Carousel controls={recentBookList.length > 1} interval={null} indicators={false} variant='dark' className={'custom-carousel'}>
					{splitRecentBookList.map((bookArray) => {
						return (
							<Carousel.Item>
								<div className='row row-eq-height'>
									{bookArray.map((book) => {
										return (
											<div className='col-6 col-md-2 text-center'>
												<Card
													onClick={() => {
														if (book.isbn === isbn) setIsbn('')
														else setIsbn(book.isbn)
													}}
													style={{ height: '225px', overflow: 'hidden' }}
													className='clickable mb-3'>
													<Card.Body className='pb-0'>
														{book.isbn === isbn && (
															<CheckIcon
																className='img-fluid text-book'
																style={{
																	width: '50px',
																	height: '50px',
																	position: 'absolute',
																	top: '0px',
																	right: '0px',
																	zIndex: 100,
																	overflow: 'visible',
																}}
															/>
														)}

														<div style={{ opacity: book.isbn === isbn ? 0.6 : 1.0, pointerEvents: 'none' }}>
															<img
																src={book.cover}
																alt=''
																className='img-fluid rounded border'
																style={{ maxHeight: '100px' }}
															/>

															<div style={{ position: 'absolute', bottom: '10px', left: '0px' }} className='w-100'>
																<h6 className='text-center mt-1' style={{ height: '40px', overflow: 'hidden' }}>
																	{book.title}
																</h6>
																<h6 className='text-center text-secondary'>{book.author}</h6>
															</div>
														</div>
													</Card.Body>
												</Card>
											</div>
										)
									})}
								</div>
							</Carousel.Item>
						)
					})}
				</Carousel>

				<div className='row justify-content-center'>
					<div className='col-12 col-md-6' style={{ position: 'absolute', bottom: '20px' }} onClick={() => setShow(true)}>
						<Button variant='book' className='w-100'>
							직접 검색해서 추가하기
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default AddIsbnCard