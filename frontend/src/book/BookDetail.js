import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'

const BookDetail = (props) => {
	const { token } = props
	const { id } = useParams()
	const navigate = useNavigate()

	const [notFound, setNotFound] = useState(false)
	const [loading, setLoading] = useState(true)
	const [book, setBook] = useState(null)

	const handleDelete = (e) => {
		const confirmation = window.confirm('정말 책을 삭제할까요?')

		if (confirmation) {
			fetch(`http://localhost/v1/book/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			}).then((res) => {
				if (res.status.toString().startsWith(2)) {
					alert('책을 삭제 했어요')
					navigate('/book/done')
				} else {
					alert('알 수 없는 이유로 실패했어요 다시 시도해 주세요')
				}
			})
		}
	}

	useEffect(() => {
		fetch(`http://localhost/v1/book/${id}`, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				if (res.status.toString().startsWith(4)) {
					setNotFound(true)
					return
				}
				return res.json()
			})
			.then((data) => {
				setBook(data)
			})
			.catch((e) => {
				console.log(e)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<div className='container'>
			{notFound ? (
				<Error />
			) : loading ? (
				<Loading message='' />
			) : (
				<div className='row'>
					<div className='col-4'>
						<img src={book.cover} alt='' className='img-fluid rounded' />

						<div className='row mt-3'>
							<div className='col-6'>
								<Button variant='warning' className='w-100'>
									수정하기
								</Button>
							</div>

							<div className='col-6'>
								<Button variant='danger' className='w-100' onClick={handleDelete}>
									삭제하기
								</Button>
							</div>
						</div>
					</div>

					<div className='col-8'>
						<h2>{book.title}</h2>
						<h4 className='text-muted'>{book.author == null ? '-' : book.author.name}</h4>

						<LanguageIcon language={book.language} />
					</div>
				</div>
			)}
		</div>
	)
}

const LanguageIcon = ({ language }) => {
	const languageMap = new Map([
		['ENGLISH', '🇺🇸 영어'],
		['KOREAN', '🇰🇷 한국어'],
		['JAPANESE', '🇯🇵 일본어'],
		['CHINESE', '🇨🇳 중국어'],
		['FRENCH', '🇫🇷 프랑스어'],
		['SPANISH', '🇪🇸 스페인어'],
	])

	return <h3>{languageMap.get(language)}</h3>
}

export default BookDetail
