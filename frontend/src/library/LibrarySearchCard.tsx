import React from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { FaSearch as SearchIcon } from 'react-icons/fa'
import { booksitoutServer } from '../functions/axios'
import { LibraryAutoCompleteType } from './LibraryType'
import { useDebounce } from '../common/useDebounce'

const LibrarySearchCard = () => {
	const [query, setQuery] = React.useState<string>('')
	const [debouncedQuery, cancelDebounce] = useDebounce(query, 500)

	const [libraryList, setLibraryList] = React.useState<LibraryAutoCompleteType[]>([])
	React.useEffect(() => {
		if (debouncedQuery === '') {
			setLibraryList([])
			cancelDebounce()
		} else {
			booksitoutServer.get(`v5/library/available-library/auto-complete?query=${debouncedQuery}&size=5`).then((res) => setLibraryList(res.data))
		}
	}, [debouncedQuery])

	return (
		<Card style={{ minHeight: '500px' }}>
			<Card.Body>
				<div className='d-flex'>
					<h3>
						<SearchIcon className='me-2 text-book' />
					</h3>
					<h3 className='pt-1'>도서관 검색하기</h3>
				</div>

				<Form className='mt-3'>
					<div className='row justify-content-center'>
						<div className='col-9 col-md-6'>
							<Form.Control placeholder='도서관 이름 / 주소' onChange={(e) => setQuery(e.target.value)} />
						</div>

						<div className='col-3 col-md-2'>
							<Button variant='outline-book w-100'>검색</Button>
						</div>
					</div>
				</Form>

				<div className='mt-3' />

				<ListGroup>
					{libraryList.map((library) => {
						return (
							<a href={`/library/detail/${library.id}`}>
								<ListGroup.Item className='text-center'>
									{library.name}
									<div className='text-secondary clamp-1-line'>{library.address}</div>
								</ListGroup.Item>
							</a>
						)
					})}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

export default LibrarySearchCard