import { useState } from 'react'
import {Card, ListGroup} from 'react-bootstrap'
import '../../resources/css/searchHistory.css'

const SearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState([
        {id: 1, content: '이것이 자바다', time: '2022-04-19T02:33:54'},
        {id: 2, content: '유난한 도전', time: '2022-04-19T02:33:54'},
        {id: 3, content: '사회적 원자', time: '2022-04-19T02:33:54'},
        {id: 4, content: '10개의 특강으로 끝나는 수학의 원리', time: '2022-04-19T02:33:54'},
        {id: 5, content: '알고리즘 트레이딩', time: '2022-04-19T02:33:54'},
        {id: 6, content: '가상 면접으로 배우는', time: '2022-04-19T02:33:54'},
    ])

	return (
		<Card id='search-history'>
			<Card.Body>
				<ListGroup>
					{searchHistory.slice(0, 5).map((history) => {
						return (
							<a href={`/search/${history.content}`} className='text-secondary text-decoration-none'>
								<ListGroup.Item> {history.content}</ListGroup.Item>
							</a>
						)
					})}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

export default SearchHistory
