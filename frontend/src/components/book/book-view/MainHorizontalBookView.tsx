import BookInfoIcon from '../book-info/BookInfoIcon'
import defaultBookCover from '../../../resources/images/common/default-book-cover.png'
import PageProgressBar from '../../common/PageProgressBar'
import { CATEGORY_INFO, FORM_INFO, LANGUAGE_INFO } from '../book-info/bookInfoEnum'
import { Button } from 'react-bootstrap'
import { giveUpBook } from '../../../functions/book'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const MainHorizontalBookView = ({ book, link = '' }) => {
	const navigate = useNavigate()

	const bookInfoStyle = 'col-4 mb-2'

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
		<>
			<a href={link} className='text-black'>
				<div className='row row-eq-height justify-content-center'>
					<div className='col-8 col-lg-4 align-self-center text-center'>
						<img
							className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
							src={book.cover === '' ? defaultBookCover : book.cover}
							style={{ maxHeight: '250px' }}
							alt=''
						/>
					</div>

					<div className='col-12 col-lg-8 pb-5 pt-3 pt-md-0'>
						<h4>{book.title}</h4>
						<h6 className='text-muted'>{book.author == null || book.author === '' ? '-' : book.author}</h6>
						<PageProgressBar book={book} />

						<div className='d-block d-md-none d-lg-block'>
							<div className='row text-center mt-4 justify-content-center'>
								<div className={bookInfoStyle}>
									<BookInfoIcon infoType={LANGUAGE_INFO} infoData={book.language} />
								</div>

								<div className={bookInfoStyle}>
									<BookInfoIcon infoType={CATEGORY_INFO} infoData={book.category} />
								</div>

								<div className={bookInfoStyle}>
									<BookInfoIcon infoType={FORM_INFO} infoData={book.form} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>

			<div className='row w-100' style={{ position: 'absolute', bottom: '20px' }}>
				<div className='col-6 mt-md-2'>
					<Button variant='book-danger' className='w-100' onClick={() => handleGiveupBook(book.bookId)}>
						포기하기
					</Button>
				</div>

				<div className='col-6 mt-md-2'>
					<a href={`/reading/${book.bookId}`} className='w-100'>
						<Button variant='book' className='w-100'>
							이어서 읽기
						</Button>
					</a>
				</div>
			</div>
		</>
	)
}

export default MainHorizontalBookView
