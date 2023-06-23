import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { Button } from 'react-bootstrap'
import defaultBookCover from '../../images/placeholder/default-book-cover.png'
import PageProgressBar from '../../common/PageProgressBar'
import { giveUpBook } from '../../functions/book'
import styled from 'styled-components';

const MainHorizontalBookView = ({ book, link = '' }) => {
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
		<div className="h-100 pb-5 pb-lg-0">
			<a href={link} className="text-black">
				<MainContainer id="book-container">
					<div className="col-4 text-center">
						<img
							className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
							src={book.cover === '' ? defaultBookCover : book.cover}
							style={{ maxHeight: '250px' }}
							alt=""
						/>
					</div>

					<div className="col-8 pt-2 pt-md-0 text-center">
						<h4 className="clamp-1-line">{book.title}</h4>
						<h6 className="text-muted clamp-1-line">
							{book.author == null || book.author === '' ? '-' : book.author}
						</h6>
						<PageProgressBar book={book} />
					</div>
				</MainContainer>
			</a>

			<div className="row w-100" style={{ position: 'absolute', bottom: '20px' }}>
				<div className="col-6 mt-md-2">
					<Button variant="book-danger" className="w-100" onClick={() => handleGiveupBook(book.bookId)}>
						포기하기
					</Button>
				</div>

				<div className="col-6 mt-md-2">
					<a href={`/reading/${book.id}`} className="w-100">
						<Button variant="book" className="w-100 clamp-1-line">
							이어서 읽기
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

const MainContainer = styled.div.attrs({
	className: 'row row-eq-height justify-content-center align-items-center mt-3 mt-md-5',
})`
	margin-bottom: 20px;

	@media screen and (min-width: 1000px) {
		margin-bottom: 100px;
	}
`

export default MainHorizontalBookView
