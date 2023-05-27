import React from 'react'
import { booksitoutServer } from '../functions/axios'
import { LibraryType } from './LibraryType'
import { Card } from 'react-bootstrap'
import { TbLocationFilled as LocationIcon } from 'react-icons/tb'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error';
import {  BsBookHalf as BookIcon } from 'react-icons/bs'
import LibraryTextWithIcon from './LibraryTextWithIcon'
import utils from '../functions/utils'
import NoContent from '../components/common/NoContent';

const LibraryNearRoute = () => {
	const [latitude, setLatitude] = React.useState<number | null>(null)
	const [longitude, setLongitude] = React.useState<number | null>(null)
	const [locationName, setLocationName] = React.useState<string | null>('서울특별시 영등포구')
	const [locationError, setLocationError] = React.useState<boolean>(false)
	React.useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude)
					setLongitude(position.coords.longitude)
				},
				(error) => setLocationError(true)
			)
		} else {
			setLocationError(true)
		}
	}, [])

    const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[] | undefined>(null)
	React.useEffect(() => {
		if (latitude !== null && longitude !== null) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=3000&size=20`)
				.then((res) => setNearLibraryList(res.data.content))
				.catch(() => setNearLibraryList(undefined))
		}
	}, [latitude, longitude])

	return (
		<div className='container-xl'>
			<div className='d-flex mb-3'>
				<h1>
					<LocationIcon className='me-2 text-book' />
				</h1>
				<h1 className='pt-1'>내 주변 도서관</h1>

				<h6 className='text-secondary ms-2 mt-4'>{locationName ?? '?'}</h6>
			</div>

			{locationError ? (
				<Error message='위치 정보를 가져올 수 없었어요' />
			) : nearLibraryList == null ? (
				<Loading mt='100px' />
			) : nearLibraryList === undefined ? (
				<Error message='서버에 오류가 났어요' />
			) : nearLibraryList.length === 0 ? (
				<NoContent message='3km 내에 도서관이 없어요' mt='100px' textSize='h2' iconSize='7em' />
			) : (
				nearLibraryList.map((library) => {
					return (
						<a href={`/library/detail/${library.id}`}>
							<Card className='mb-3' style={{ minHeight: '125px' }}>
								<Card.Body>
									<div className='row'>
										<div className='col-8'>
											<h4>{library.name}</h4>

											<div className='ms-4'>
												<LibraryTextWithIcon icon={<LocationIcon />} text={library.location.address} />
												<LibraryTextWithIcon
													icon={<BookIcon />}
													text={`${utils.insertCommas(library.bookCount)} 권` ?? '?'}
												/>
											</div>
										</div>

										<div className='col-4'>
											<h5 className='text-end text-secondary'>{library.location.distance?.toFixed(2) ?? '-'} km</h5>
										</div>
									</div>
								</Card.Body>
							</Card>
						</a>
					)
				})
			)}
		</div>
	)
}

export default LibraryNearRoute