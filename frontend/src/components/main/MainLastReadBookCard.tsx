import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

import { giveUpBook } from '../../functions/book'
import { Button, Card } from 'react-bootstrap';
import NoContent from '../common/NoContent';
import MainBookView from '../book/book-view/MainHorizontalBookView';
import messages from '../../settings/messages';

const MainLastReadBookCard = ({ lastBook }) => {
	const navigate = useNavigate()

	const handleGiveupBook = (bookId) => {
		const confirm = window.confirm('책을 포기할까요?')

		if (confirm) {
			giveUpBook(bookId).then((success) => {
				if (success) {
					toast.success('책을 포기했어요. 마음이 바뀌시면 언제든지 다시 시작하실 수 있어요!')
					navigate(`book/detail/${bookId}`)
				} else {
					toast.error('오류가 났어요 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Card className='h-100' style={{ minHeight: '420px' }}>
			<a href={lastBook == null ? '/book/not-done' : `/reading/${lastBook.bookId}`} className='h-100 text-decoration-none text-black'>
				<Card.Body className='h-100'>
					<h3>마지막으로 읽은 책</h3>

					{lastBook == null ? (
						<div className='mt-5 mb-2 mb-md-3'>
							<NoContent message={messages.book.lastBook.noContent} useImage={false} mt='50px' mb='50px' />
						</div>
					) : (
						<MainBookView
							book={lastBook}
							firstButton={
								<a href={`/reading/${lastBook.bookId}`} className='btn btn-book w-100'>
									이어서 읽기
								</a>
							}
							secondButton={
								<Button variant='book-danger' className='w-100' onClick={() => handleGiveupBook(lastBook.bookId)}>
									포기하기
								</Button>
							}
							link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook != null && lastBook.bookId}`}
						/>
					)}
				</Card.Body>
			</a>
		</Card>
	)
}


export default MainLastReadBookCard