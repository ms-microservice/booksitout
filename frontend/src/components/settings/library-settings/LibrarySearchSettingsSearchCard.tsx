import React from "react"
import { Card, Form } from "react-bootstrap"
import { LibraryType } from "../../../types/LibraryType"
import axios from "axios"
import LibraryLoadingPlaceholder from "../../library/LibraryLoadingPlaceholder"
import NoContent from "../../common/NoContent"
import toast from "react-hot-toast"

import { AiFillCheckCircle as CheckIcon } from 'react-icons/ai'
import urls from "../../../settings/urls"

const LibrarySearchSettingsSearchCard = ({ setShow, setSelectedLibrary, searchResult, setSearchResult }) => {
	const [error, setError] = React.useState(false)
	const [loading, setLoading] = React.useState(false)
	const [query, setQuery] = React.useState<String>('')

	const handleSearch = (e) => {
		setQuery(e.target.value)
	}

	React.useEffect(() => {
		setLoading(query !== '')

		if (query === '') {
			setSearchResult([])
		}

		const typingTimer = setTimeout(() => {
			if (query !== '') {
				axios
					.get(`${urls.api.base}/v3/search/library/available-library/${query}`)
					.then((res) => setSearchResult(res.data))
					.catch(() => setError(true))
					.finally(() => {
						setLoading(false)
					})
			}
		}, 500)

		return () => clearTimeout(typingTimer)
	}, [query])

	const handleLibraryClicked = (library: LibraryType) => {
		setShow(true)
		setSelectedLibrary(library)
	}

	return (
		<Card>
			<Card.Body>
				<Form>
					<div id='library-list'>
						{loading ? (
							<div className='row'>
								{Array(4)
									.fill(0)
									.map(() => {
										return (
											<div className='col-6 col-md-3 mb-3 h-100'>
												<LibraryLoadingPlaceholder />
											</div>
										)
									})}
							</div>
						) : searchResult.length === 0 ? (
							<>
								<div className='mt-5'>
									<NoContent message='검색 결과가 없어요' move={-90}/>
								</div>
							</>
						) : (
							<div className='row row-eq-height'>
								{searchResult.map((library) => {
									return (
										<div
											className='col-6 col-md-3 mb-3 h-100 pb-0 mb-0'
											onClick={() => {
												if (library.added) {
													toast.error('이미 추가된 도서관이에요')
												} else {
													handleLibraryClicked(library)
												}
											}}>
											<Card className='h-100 text-center clickable'>
												{library.added && (
													<div className='position-absolute' style={{ right: '-10px', top: '-10px' }}>
														<h1 className='text-book'>
															<CheckIcon />
														</h1>
													</div>
												)}

												<Card.Body className='h-100'>
													<img src={library.icon} alt='' className='mb-0 rounded library-image' />
													<h6 className={library.name.length <= 12 ? 'pt-2' : 'mt-1'} style={{ height: '30px' }}>
														{library.name}
													</h6>
												</Card.Body>
											</Card>
										</div>
									)
								})}
							</div>
						)}
					</div>

					<Form.Control type='text' placeholder='추가할 도서관을 검색해 주세요' onChange={handleSearch} />
				</Form>
			</Card.Body>
		</Card>
	)
}

export default LibrarySearchSettingsSearchCard