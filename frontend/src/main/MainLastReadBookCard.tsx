import { Card } from 'react-bootstrap';
import NoContent from '../common/NoContent';
import MainHorizontalBookView from '../book/book-view/MainHorizontalBookView';
import messages from '../settings/messages';
import Error from '../common/Error';
import CardTitle from '../common/CardTitle';
import { BsBookHalf as BookIcon } from 'react-icons/bs'
import styled from 'styled-components';

const MainLastReadBookCard = ({ lastBook }) => {
	return (
		<CardContainer>
			<Card.Body>
				<CardTitle icon={<BookIcon />} title={'마지막으로 읽은 책'} mb={0} />

				{lastBook === undefined ? (
					<Error />
				) : lastBook == null ? (
					<NoContent message={messages.book.lastBook.noContent} move={40} />
				) : (
					<MainHorizontalBookView
						book={lastBook}
						link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook.id}`}
					/>
				)}
			</Card.Body>
		</CardContainer>
	)
}

const CardContainer = styled(Card)`
	height: 100%;
	min-height: 0px;
	
	@media screen and (min-width: 768) {
		min-height: 380px;
	}
`


export default MainLastReadBookCard