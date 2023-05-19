import { useEffect, useState } from "react"
import { Card, ListGroup } from "react-bootstrap"
import { PopularBook } from "../../../types/PostType"
import axios from "axios"
import urls from "../../../settings/urls"
import Error from '../../common/Error';

const CommunityRoutePopularBookCard = () => {
    const [popularBook, setPopularBook] = useState<PopularBook[]>([])
	useEffect(() => {
		axios
			.get(`${urls.api.base}/v4/forum/ranking?size=7`)
			.then((res) => setPopularBook(res.data))
			.catch((e) => setError(true))
	}, [])

	const [error, setError] = useState(false)

    return (
		<Card style={{ height: '550px' }} className='mb-4'>
			<Card.Body>
				<h3>인기 책</h3>

				<div className='mb-4' />

				<ListGroup>
					{error ? (
						<Error mt='150px' />
					) : (
						popularBook.map((book) => {
							return (
								<ListGroup.Item>
									<div className='row'>
										<div className='col-1'>
											<p className='me-4'>{book.id}</p>
										</div>

										<div className='col-11 m-0'>
											<p className='m-0'>{book.title}</p>

											<p className='text-secondary m-0'>{book.author}</p>
										</div>
									</div>
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