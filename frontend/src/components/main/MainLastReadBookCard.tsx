import { Card } from 'react-bootstrap';

import NoContent from '../common/NoContent';
import MainHorizontalBookView from '../book/book-view/MainHorizontalBookView';
import messages from '../../settings/messages';
import Error from '../common/Error';
import CardTitle from '../../common/CardTitle';
import {BsBookHalf as BookIcon} from 'react-icons/bs'

const MainLastReadBookCard = ({ lastBook }) => {
	return (
		<Card className='h-100' style={{ minHeight: '420px' }}>
			<a href={lastBook == null ? '/book/not-done' : `/book/detail/${lastBook.bookId}`} className='h-100 text-decoration-none text-black'>
				<Card.Body className='h-100'>
					<CardTitle icon={<BookIcon />} title={'마지막으로 읽은 책'} subTitle={undefined} iconSize='h2'/>

					{lastBook === undefined ? (
						<Error message='오류가 났어요' mb='75px' />
					) : lastBook == null ? (
						<div className='mt-5 mb-2 mb-md-3'>
							<NoContent message={messages.book.lastBook.noContent} useImage={false} mt='50px' mb='50px' />
						</div>
					) : (
						<MainHorizontalBookView book={lastBook} link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook.bookId}`} />
					)}
				</Card.Body>
			</a>
		</Card>
	)
}


export default MainLastReadBookCard