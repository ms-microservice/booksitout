import React from 'react'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import './topnav.scss'

const TopnavSearchBar = ({ isLogin, autoFocus = false }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const [keyword, setKeyword] = React.useState('')

	React.useEffect(() => {
		if (location.pathname.startsWith('/search')) {
			setKeyword(decodeURI(location.pathname.substring(8)))
		}
	}, [location])

	const handleSearch = (e) => {
		e.preventDefault()

		if (!isLogin) {
			toast.error('검색을 이용하시려면 로그인 해 주세요!')
			e.target[0].blur()
			return
		}

		if (typeof e.target[0] !== 'undefined') e.target[0].blur()

		if (keyword.length >= 2) {
			navigate(`/search/${keyword}`)
		} else {
			document.getElementById('search-input')!!.focus()
			toast.error('2글자 이상의 검색어를 입력해 주세요')
		}
	}

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			e.currentTarget.blur()
		}
	}

	React.useEffect(() => {
		const input = document.getElementById('search-input')

		if (autoFocus) {
			input!!.focus()
		} else {
			input!!.blur()
		}
	}, [autoFocus])

	return (
		<Form className='pe-3' onSubmit={handleSearch} onKeyDown={handleKeydown} id='search-bar-form'>
			<div className='row'>
				<div className='col-9 p-lg-0 pe-0'>
					<Form.Control
						id='search-input'
						type='search'
						autoComplete='off'
						placeholder='한 번에 책 검색하기'
						className='me-2 w-100'
						aria-label='Search'
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</div>

				<div className='col-3 pe-0'>
					<Button type='submit' variant='outline-book' className='w-100'>
						검색
					</Button>
				</div>
			</div>
		</Form>
	)
}

export default TopnavSearchBar