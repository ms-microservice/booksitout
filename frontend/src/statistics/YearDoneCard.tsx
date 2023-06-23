import React from 'react'
import { Card } from 'react-bootstrap'
import { booksitoutServer } from '../functions/axios'
import { BookType } from '../types/BookType'

const YearDoneCard = () => {
    const [doneBookList, setDoneBookList] = React.useState<BookType[]>([])

    React.useEffect(() => {
        booksitoutServer.get(`v5/book/done/${new Date().getFullYear()}?size=100`).then(res => setDoneBookList(res.data))

    }, [])

    return (
		<Card style={{ minHeight: '200px', overflow: 'hidden', backgroundColor: 'rgb(223, 210, 192)' }}>
			<Card.Body>
				<div className="text-center">
					{doneBookList === undefined ? (
						<></>
					) : (
						doneBookList
							.filter(book => book.cover != null && book.cover !== undefined && book.cover !== '')
							.map(book => {
								return (
									<a href={`/book/detail/${book.id}`}>
										<img
											src={book.cover}
											alt=""
											style={{ width: '60px', height: '80px' }}
											className="rounded mb-2"
										/>
									</a>
								)
							})
					)}
				</div>
			</Card.Body>
		</Card>
	)
}

export default YearDoneCard