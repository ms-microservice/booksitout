import React from "react"
import { Card, ListGroup } from "react-bootstrap"
import { PopularBookType } from "../post/PostType"
import Error from '../../common/Error'
import booksitoutIcon from '../../common/icons/booksitoutIcon';
import { booksitoutServer } from "../../functions/axios"

const CommunityRoutePopularBookCard = () => {
    const [popularBook, setPopularBook] = React.useState<PopularBookType[]>([])
	React.useEffect(() => {
		booksitoutServer
			.get(`/v4/forum/ranking`)
			.then((res) => setPopularBook(res.data))
			.catch(() => setError(true))
	}, [])

	const [error, setError] = React.useState(false)

    return (
		<Card style={{ minHeight: '750px', maxHeight: '750px' }} className='h-100'>
			<Card.Body>
				<h3>
					<booksitoutIcon.book className='me-2 text-book' /> 인기 책
				</h3>

				<div className='mb-4' />

				<ListGroup className='h-100'>
					{error || popularBook === undefined ? (
						<Error />
					) : (
						popularBook.map((book) => {
							return (
								<ListGroup.Item>
									<a href={`/book/info/${book.isbn}`}>
										<div className='row'>
											<div className='col-1'>
												<b className='me-4 force-1-line text-book'>{book.id}</b>
											</div>

											<div className='col-11 m-0 ps-3'>
												<p className='m-0 clamp-1-line'>{book.title}</p>

												<p className='text-secondary m-0 force-1-line'>
													{book.author.substring(0, 20)} {book.author.length > 20 ? '...' : ''}
												</p>
											</div>
										</div>
									</a>
								</ListGroup.Item>
							)
						})
					)}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

export default CommunityRoutePopularBookCard