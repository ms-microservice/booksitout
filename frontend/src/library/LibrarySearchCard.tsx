import React from 'react'
import { Card } from 'react-bootstrap'
import { FaSearch as SearchIcon } from 'react-icons/fa'

const LibrarySearchCard = () => {
	return (
		<Card style={{ minHeight: '450px' }}>
			<Card.Body>
				<div className='d-flex'>
					<h3>
						<SearchIcon className='me-2 text-book' />
					</h3>
					<h3 className='pt-1'>도서관 검색하기</h3>
				</div>
			</Card.Body>
		</Card>
	)
}

export default LibrarySearchCard