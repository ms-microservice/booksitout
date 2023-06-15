import { Card } from 'react-bootstrap';

import NoContent from '../common/NoContent';
import MainHorizontalBookView from '../book/book-view/MainHorizontalBookView';
import messages from '../settings/messages';
import Error from '../common/Error';
import CardTitle from '../common/CardTitle';
import {BsBookHalf as BookIcon} from 'react-icons/bs'

const MainLastReadBookCard = ({ lastBook }) => {
	return (
		<Card className='h-100' style={{ minHeight: '420px' }}>
			<Card.Body>
				<CardTitle icon={<BookIcon />} title={'마지막으로 읽은 책'} mb={0} />

				{lastBook === undefined ? (
					<Error />
				) : lastBook == null ? (
					<NoContent message={messages.book.lastBook.noContent} move={40} />
				) : (
					<MainHorizontalBookView book={lastBook} link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook.bookId}`} />
				)}
			</Card.Body>
		</Card>
	)
}


export default MainLastReadBookCard